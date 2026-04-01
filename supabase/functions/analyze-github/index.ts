import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { username } = await req.json();
    if (!username || typeof username !== "string") {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Extract username: handle URLs like "github.com/user" or "user/repo" formats
    let cleanUsername = username.trim();
    // Strip GitHub URL prefixes
    cleanUsername = cleanUsername.replace(/^https?:\/\/(www\.)?github\.com\//i, "");
    // Take only the first path segment (username, not repo)
    cleanUsername = cleanUsername.split("/")[0];
    // Remove any remaining invalid characters
    cleanUsername = cleanUsername.replace(/[^a-zA-Z0-9-]/g, "");
    if (!cleanUsername) {
      return new Response(JSON.stringify({ error: "Invalid username" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch GitHub user profile
    const ghToken = Deno.env.get("GITHUB_TOKEN");
    const ghHeaders: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "github-career-analyzer",
    };
    if (ghToken) ghHeaders["Authorization"] = `Bearer ${ghToken}`;

    const userRes = await fetch(`https://api.github.com/users/${cleanUsername}`, {
      headers: ghHeaders,
    });

    if (!userRes.ok) {
      const text = await userRes.text();
      if (userRes.status === 404) {
        return new Response(JSON.stringify({ error: `GitHub user "${cleanUsername}" not found.` }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (userRes.status === 403) {
        return new Response(JSON.stringify({ error: "GitHub API rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: `GitHub API error: ${text}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userData = await userRes.json();

    // Fetch repositories
    const reposRes = await fetch(`https://api.github.com/users/${cleanUsername}/repos?per_page=100&sort=updated`, {
      headers: ghHeaders,
    });
    const repos = reposRes.ok ? await reposRes.json() : [];

    // Aggregate data
    const languages: Record<string, number> = {};
    let totalStars = 0;
    let totalForks = 0;
    const repoSummaries: string[] = [];

    for (const repo of repos) {
      if (repo.fork) continue;
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + (repo.size || 1);
      }
      repoSummaries.push(
        `- ${repo.name}: ${repo.description || "No description"} (${repo.language || "unknown"}, ★${repo.stargazers_count}, forks:${repo.forks_count})`
      );
    }

    const structuredData = `
Username: ${cleanUsername}
Name: ${userData.name || cleanUsername}
Bio: ${userData.bio || "N/A"}
Public Repos: ${userData.public_repos}
Followers: ${userData.followers}
Following: ${userData.following}
Account Created: ${userData.created_at}
Total Stars: ${totalStars}
Total Forks: ${totalForks}
Languages: ${JSON.stringify(languages)}
Top Repositories (up to 100):
${repoSummaries.slice(0, 50).join("\n")}
`;

    // Call AI
    const AI_API_KEY = Deno.env.get("AI_API_KEY");
    if (!AI_API_KEY) throw new Error("AI_API_KEY is not configured");

    const aiPrompt = `Analyze the following GitHub profile data and return structured JSON with insights.

Provide:
- profile_level (Beginner/Intermediate/Advanced)
- strong_skills (array of strings, top skills/languages)
- weak_skills (array of strings, areas needing improvement)
- tech_stack (array of strings, all technologies detected)
- best_fit_roles (array of strings, e.g. "Frontend Developer", "ML Engineer")
- skill_gaps (array of strings, important missing skills)
- improvement_suggestions (array of strings, actionable advice)
- project_quality_feedback (string, overall assessment)
- consistency_analysis (string, coding activity assessment)
- career_roadmap (array of strings, step-by-step plan)

GitHub Data:
${structuredData}

Return ONLY valid JSON matching the schema above. No markdown, no explanation.`;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an expert career advisor and technical recruiter who analyzes GitHub profiles. Always return valid JSON only." },
          { role: "user", content: aiPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "AI rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from AI response
    let analysis;
    try {
      // Strip markdown code fences if present
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      analysis = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI analysis. Please try again.");
    }

    const result = {
      ...analysis,
      total_repos: userData.public_repos,
      total_stars: totalStars,
      total_forks: totalForks,
      languages,
      avatar_url: userData.avatar_url,
      name: userData.name || cleanUsername,
      bio: userData.bio || "",
      username: cleanUsername,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-github error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
