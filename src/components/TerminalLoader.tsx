import { motion } from "framer-motion";

interface TerminalLoaderProps {
  logs: string[];
}

export function TerminalLoader({ logs }: TerminalLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto glass-card font-mono text-xs"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-destructive/60" />
        <div className="w-3 h-3 rounded-full bg-accent/40" />
        <div className="w-3 h-3 rounded-full bg-primary/40" />
        <span className="ml-2 text-muted-foreground text-[10px]">github-analyzer</span>
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="text-muted-foreground"
          >
            <span className="text-primary">❯</span> {log}
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-primary ml-1"
        />
      </div>
    </motion.div>
  );
}
