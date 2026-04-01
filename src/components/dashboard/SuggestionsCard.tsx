import { Lightbulb } from "lucide-react";

interface SuggestionsCardProps {
  suggestions: string[];
}

export function SuggestionsCard({ suggestions }: SuggestionsCardProps) {
  return (
    <div className="glass-card-hover h-full">
      <p className="label-l3 mb-3">Improvement Suggestions</p>
      <div className="space-y-2.5">
        {suggestions.map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <Lightbulb className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground leading-relaxed">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
