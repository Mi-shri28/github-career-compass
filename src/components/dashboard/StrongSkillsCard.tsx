import { Zap } from "lucide-react";

interface StrongSkillsCardProps {
  skills: string[];
  techStack: string[];
}

export function StrongSkillsCard({ skills, techStack }: StrongSkillsCardProps) {
  return (
    <div className="glass-card-hover h-full">
      <p className="label-l3 mb-3">Strong Skills</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1 text-xs font-mono text-primary"
          >
            <Zap className="w-3 h-3" />
            {skill}
          </span>
        ))}
      </div>
      <p className="label-l3 mb-2">Tech Stack</p>
      <div className="flex flex-wrap gap-1.5">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
