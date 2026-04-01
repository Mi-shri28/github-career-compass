import { Star, GitFork, BookOpen, Activity } from "lucide-react";
import type { GitHubAnalysis } from "@/types/analysis";

interface ProfileSummaryCardProps {
  data: GitHubAnalysis;
}

export function ProfileSummaryCard({ data }: ProfileSummaryCardProps) {
  const levelColor =
    data.profile_level === "Advanced"
      ? "text-primary"
      : data.profile_level === "Intermediate"
        ? "text-accent"
        : "text-muted-foreground";

  const stats = [
    { icon: BookOpen, label: "Repos", value: data.total_repos },
    { icon: Star, label: "Stars", value: data.total_stars },
    { icon: GitFork, label: "Forks", value: data.total_forks },
  ];

  return (
    <div className="glass-card-hover h-full flex flex-col gap-4">
      <p className="label-l3">Profile Summary</p>
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Experience Level:</span>
        <span className={`text-sm font-semibold font-mono ${levelColor}`}>{data.profile_level}</span>
      </div>
      {data.bio && <p className="text-xs text-muted-foreground line-clamp-2">{data.bio}</p>}
      <div className="grid grid-cols-3 gap-3 mt-auto">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="text-center rounded-xl bg-secondary/50 p-3">
            <Icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-lg font-semibold font-mono text-foreground">{value}</p>
            <p className="label-l3">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
