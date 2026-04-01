import { motion, AnimatePresence } from "framer-motion";
import { UsernameInput } from "@/components/UsernameInput";
import { TerminalLoader } from "@/components/TerminalLoader";
import { Dashboard } from "@/components/Dashboard";
import { useGitHubAnalysis } from "@/hooks/useGitHubAnalysis";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { analysis, isLoading, loadingLogs, error, analyze } = useGitHubAnalysis();

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-16">
      <AnimatePresence mode="wait">
        {!analysis ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[70vh] gap-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground text-balance">
                Your code has a career path.{" "}
                <span className="text-gradient">Let's find it.</span>
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                Enter a GitHub username to analyze repositories, skills, and get AI-powered career insights.
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
    </div>
  );
};

export default Index;
