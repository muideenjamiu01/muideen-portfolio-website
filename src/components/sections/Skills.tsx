"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillBar } from "@/components/ui/SkillBar";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      className="section bg-[var(--bg-secondary)]"
      aria-labelledby="skills-heading"
    >
      <div className="container-wide">
        <SectionHeader
          title="Technical Skills"
          subtitle="Tools and technologies I work with professionally"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, index) => (
            <SkillBar key={skill.category} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
