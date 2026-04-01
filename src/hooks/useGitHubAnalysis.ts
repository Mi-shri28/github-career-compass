import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { GitHubAnalysis } from "@/types/analysis";

export function useGitHubAnalysis() {
  const [analysis, setAnalysis] = useState<GitHubAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = (msg: string) => {
    setLoadingLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const analyze = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setLoadingLogs([]);

    addLog(`Initializing analysis for @${username}...`);
    addLog("Fetching GitHub profile data...");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-github", {
        body: { username },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      addLog("Profile data received.");
      addLog("Running AI analysis engine...");

      // Small delay for UX
      await new Promise((r) => setTimeout(r, 500));
      addLog("Analysis complete.");

      setAnalysis(data as GitHubAnalysis);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      addLog(`ERROR: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { analysis, isLoading, loadingLogs, error, analyze };
}
