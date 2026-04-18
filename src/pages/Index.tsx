import { motion, AnimatePresence } from "framer-motion";
import { UsernameInput } from "@/components/UsernameInput";
import { TerminalLoader } from "@/components/TerminalLoader";
import { Dashboard } from "@/components/Dashboard";
import { useGitHubAnalysis } from "@/hooks/useGitHubAnalysis";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { analysis, isLoading, loadingLogs, error, analyze } = useGitHubAnalysis();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full border-b border-border/50 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight text-foreground">Job Role Analyzer</span>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 md:py-16">
        <AnimatePresence mode="wait">
          {!analysis ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
            >
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
                  Your code has a career path.{" "}
                  <span className="text-gradient">Let's find it.</span>
                </h1>
                <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                  AI-powered system to analyze resumes and suggest suitable job roles.
                </p>
              </div>

              <UsernameInput onSubmit={analyze} isLoading={isLoading} />

              {isLoading && <TerminalLoader logs={loadingLogs} />}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card max-w-md text-center"
                >
                  <p className="text-destructive text-sm font-mono">{error}</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                New Analysis
              </Button>
              <Dashboard data={analysis} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full border-t border-border/50 px-4 py-6 mt-8">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 Job Role Analyzer. Built for intelligent career insights.
        </p>
      </footer>
    </div>
  );
};

export default Index;
