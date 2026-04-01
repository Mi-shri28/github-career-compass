import { Briefcase } from "lucide-react";

interface BestFitRoleCardProps {
  roles: string[];
  name: string;
  username: string;
  avatarUrl: string;
}

export function BestFitRoleCard({ roles, name, username, avatarUrl }: BestFitRoleCardProps) {
  return (
    <div className="glass-card gradient-primary relative overflow-hidden min-h-[180px]">
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 7 }).map((_, r) => (
          <div key={r} className="flex gap-1 mb-1">
            {Array.from({ length: 52 }).map((_, c) => (
              <div
                key={c}
                className="w-2 h-2 rounded-sm"
                style={{
                  backgroundColor: `hsla(0,0%,100%,${Math.random() * 0.4})`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          {avatarUrl && (
            <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full border-2 border-primary-foreground/20" />
          )}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground">{name || username}</h2>
            <p className="text-primary-foreground/60 font-mono text-sm">@{username}</p>
          </div>
        </div>
        <p className="label-l3 text-primary-foreground/50 mb-2">Best Fit Roles</p>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-foreground/10 backdrop-blur px-3 py-1.5 text-sm font-medium text-primary-foreground"
            >
              <Briefcase className="w-3.5 h-3.5" />
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
