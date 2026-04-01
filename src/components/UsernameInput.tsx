import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsernameInputProps {
  onSubmit: (username: string) => void;
  isLoading: boolean;
}

export function UsernameInput({ onSubmit, isLoading }: UsernameInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim().replace(/^@/, "");
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 gradient-primary rounded-2xl opacity-30 group-focus-within:opacity-60 blur transition-opacity duration-300" />
        <div className="relative flex items-center gap-2 rounded-2xl bg-card border border-border p-2">
          <span className="pl-3 text-muted-foreground font-mono text-sm">@</span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="github-username"
            disabled={isLoading}
            className="flex-1 bg-transparent text-foreground font-mono text-sm placeholder:text-muted-foreground/50 outline-none"
          />
          <Button
            type="submit"
            variant="hero"
            size="sm"
            disabled={isLoading || !value.trim()}
            className="rounded-xl px-4"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              <>
                <Search className="w-4 h-4" />
                Analyze
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
