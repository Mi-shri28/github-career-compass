import { FileCode, Clock } from "lucide-react";

interface ProjectQualityCardProps {
  feedback: string;
  consistency: string;
}

export function ProjectQualityCard({ feedback, consistency }: ProjectQualityCardProps) {
  return (
    <div className="glass-card-hover h-full">
      <p className="label-l3 mb-3">Project Quality</p>
      <div className="flex items-start gap-2 mb-4">
        <FileCode className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">{feedback}</p>
      </div>
      <p className="label-l3 mb-2">Consistency</p>
      <div className="flex items-start gap-2">
        <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">{consistency}</p>
      </div>
    </div>
  );
}
