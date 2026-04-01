import { motion } from "framer-motion";
import type { GitHubAnalysis } from "@/types/analysis";
import { BestFitRoleCard } from "./dashboard/BestFitRoleCard";
import { SkillBreakdownCard } from "./dashboard/SkillBreakdownCard";
import { ProfileSummaryCard } from "./dashboard/ProfileSummaryCard";
import { StrongSkillsCard } from "./dashboard/StrongSkillsCard";
import { WeakSkillsCard } from "./dashboard/WeakSkillsCard";
import { ProjectQualityCard } from "./dashboard/ProjectQualityCard";
import { CareerRoadmapCard } from "./dashboard/CareerRoadmapCard";
import { SuggestionsCard } from "./dashboard/SuggestionsCard";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface DashboardProps {
  data: GitHubAnalysis;
}

export function Dashboard({ data }: DashboardProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto grid grid-cols-12 gap-4"
    >
      <motion.div variants={fadeUp} className="col-span-12 lg:col-span-8">
        <BestFitRoleCard roles={data.best_fit_roles} name={data.name} username={data.username} avatarUrl={data.avatar_url} />
      </motion.div>
      <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4">
        <ProfileSummaryCard data={data} />
      </motion.div>
      <motion.div variants={fadeUp} className="col-span-12 md:col-span-6">
        <SkillBreakdownCard languages={data.languages} />
      </motion.div>
      <motion.div variants={fadeUp} className="col-span-12 md:col-span-6">
        <StrongSkillsCard skills={data.strong_skills} techStack={data.tech_stack} />
      </motion.div>
      <motion.div variants={fadeUp} className="col-span-12 md:col-span-4">
        <WeakSkillsCard skills={data.weak_skills} gaps={data.skill_gaps} />
      </motion.div>
      <motion.div variants={fadeUp} className="col-span-12 md:col-span-4">
        <ProjectQualityCard feedback={data.project_quality_feedback} consistency={data.consistency_analysis} />
      </motion.div>
      <motion.div variants={fadeUp} className="col-span-12 md:col-span-4">
        <SuggestionsCard suggestions={data.improvement_suggestions} />
      </motion.div>
      <motion.div variants={fadeUp} className="col-span-12">
        <CareerRoadmapCard roadmap={data.career_roadmap} />
      </motion.div>
    </motion.div>
  );
}
