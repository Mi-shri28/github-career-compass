import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CareerRoadmapCardProps {
  roadmap: string[];
}

export function CareerRoadmapCard({ roadmap }: CareerRoadmapCardProps) {
  return (
    <div className="glass-card-hover">
      <p className="label-l3 mb-4">Career Roadmap</p>
      <div className="flex flex-wrap items-center gap-2">
        {roadmap.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2 rounded-xl bg-secondary/80 border border-border px-3 py-2">
              <span className="text-[10px] font-bold text-primary font-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xs text-foreground">{step}</span>
            </div>
            {i < roadmap.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
