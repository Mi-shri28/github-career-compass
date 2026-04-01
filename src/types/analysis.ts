export interface GitHubAnalysis {
  profile_level: "Beginner" | "Intermediate" | "Advanced";
  strong_skills: string[];
  weak_skills: string[];
  tech_stack: string[];
  best_fit_roles: string[];
  skill_gaps: string[];
  improvement_suggestions: string[];
  project_quality_feedback: string;
  consistency_analysis: string;
  career_roadmap: string[];
  total_repos: number;
  total_stars: number;
  total_forks: number;
  languages: Record<string, number>;
  avatar_url: string;
  name: string;
  bio: string;
  username: string;
}
