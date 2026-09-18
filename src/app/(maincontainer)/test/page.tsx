"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiGit,
  SiGithub,
} from "react-icons/si";

const skills = [
  // radius = distance from center
  { name: "React", icon: <SiReact />, radius: 130, angle: 0 },
  { name: "Next.js", icon: <SiNextdotjs />, radius: 130, angle: 90 },
  { name: "TypeScript", icon: <SiTypescript />, radius: 130, angle: 180 },
  { name: "Node.js", icon: <SiNodedotjs />, radius: 130, angle: 270 },

  { name: "JavaScript", icon: <SiJavascript />, radius: 200, angle: 20 },
  { name: "Express", icon: <SiExpress />, radius: 200, angle: 100 },
  { name: "PostgreSQL", icon: <SiPostgresql />, radius: 200, angle: 170 },
  { name: "MongoDB", icon: <SiMongodb />, radius: 200, angle: 250 },
  { name: "Prisma", icon: <SiPrisma />, radius: 200, angle: 320 },

  { name: "Tailwind", icon: <SiTailwindcss />, radius: 270, angle: 45 },
  { name: "Git", icon: <SiGit />, radius: 270, angle: 150 },
  { name: "GitHub", icon: <SiGithub />, radius: 270, angle: 280 },
];

export default function SkillsOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[650px]">

      {/* Orbit 1 */}
      <div className="
        absolute left-1/2 top-1/2
        h-[260px] w-[260px]
        -translate-x-1/2 -translate-y-1/2
        rounded-full border border-white/10
      " />

      {/* Orbit 2 */}
      <div className="
        absolute left-1/2 top-1/2
        h-[400px] w-[400px]
        -translate-x-1/2 -translate-y-1/2
        rounded-full border border-white/10
      " />

      {/* Orbit 3 */}
      <div className="
        absolute left-1/2 top-1/2
        h-[540px] w-[540px]
        -translate-x-1/2 -translate-y-1/2
        rounded-full border border-white/10
      " />

      {/* Center */}
      <div className="
        absolute left-1/2 top-1/2 z-20
        flex h-28 w-28
        -translate-x-1/2 -translate-y-1/2
        items-center justify-center
        rounded-full
        border border-white/20
        bg-black
        shadow-[0_0_60px_rgba(255,255,255,0.08)]
      ">
        <span className="text-xs tracking-[0.3em] text-white/60">
          CORE
        </span>
      </div>

      {/* Skills */}
      {skills.map((skill) => {
        const radians = (skill.angle * Math.PI) / 180;

        const x = Math.cos(radians) * skill.radius;
        const y = Math.sin(radians) * skill.radius;

        return (
          <div
            key={skill.name}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(
                calc(-50% + ${x}px),
                calc(-50% + ${y}px)
              )`,
            }}
          >
            <div
              className="
                group relative
                flex h-14 w-14
                items-center justify-center
                rounded-full
                border border-white/15
                bg-neutral-900
                text-xl text-white/70
                transition-all duration-300
                hover:scale-125
                hover:border-white/40
                hover:bg-neutral-800
                hover:text-white
              "
            >
              {skill.icon}

              {/* Tooltip */}
              <span className="
                pointer-events-none
                absolute -bottom-9 left-1/2
                -translate-x-1/2
                whitespace-nowrap
                rounded-md
                bg-black px-2 py-1
                text-xs text-white
                opacity-0
                transition-opacity
                group-hover:opacity-100
              ">
                {skill.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}