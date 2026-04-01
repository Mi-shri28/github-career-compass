import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "hsl(250, 89%, 65%)",
  "hsl(280, 80%, 60%)",
  "hsl(200, 80%, 55%)",
  "hsl(160, 70%, 50%)",
  "hsl(40, 90%, 55%)",
  "hsl(0, 70%, 55%)",
  "hsl(320, 70%, 55%)",
  "hsl(220, 60%, 50%)",
];

interface SkillBreakdownCardProps {
  languages: Record<string, number>;
}

export function SkillBreakdownCard({ languages }: SkillBreakdownCardProps) {
  const data = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card-hover h-full">
      <p className="label-l3 mb-4">Language Distribution</p>
      <div className="flex items-center gap-6">
        <div className="w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={65}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(222, 47%, 7%)",
                  border: "1px solid hsl(217, 33%, 17%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(210, 40%, 92%)",
                  backdropFilter: "blur(12px)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((lang, i) => (
            <div key={lang.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="font-mono text-foreground">{lang.name}</span>
              </div>
              <span className="text-muted-foreground font-mono">
                {total > 0 ? ((lang.value / total) * 100).toFixed(1) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
