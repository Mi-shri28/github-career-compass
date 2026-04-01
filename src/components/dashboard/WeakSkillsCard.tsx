import { AlertTriangle } from "lucide-react";

interface WeakSkillsCardProps {
  skills: string[];
  gaps: string[];
}

export function WeakSkillsCard({ skills, gaps }: WeakSkillsCardProps) {
  return (
    <div className="glass-card-hover h-full">
      <p className="label-l3 mb-3">Skill Gaps</p>
      <div className="space-y-2 mb-4">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center gap-2 text-xs">
            <AlertTriangle className="w-3 h-3 text-accent flex-shrink-0" />
            <span className="text-muted-foreground">{skill}</span>
          </div>
        ))}
      </div>
      {gaps.length > 0 && (
        <>
          <p className="label-l3 mb-2">Missing Areas</p>
          <div className="flex flex-wrap gap-1.5">
            {gaps.map((gap) => (
              <span key={gap} className="rounded-md bg-accent/10 border border-accent/20 px-2 py-0.5 text-[11px] font-mono text-accent">
                {gap}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
