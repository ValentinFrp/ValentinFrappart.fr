import React from "react";
import { useCounterAnimation } from "../hooks/useAnimations";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  description?: string;
  color?: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
  className?: string;
  layout?: "grid" | "horizontal" | "vertical";
  animationDuration?: number;
  showIcons?: boolean;
  showDescriptions?: boolean;
}

const defaultStats: Stat[] = [
  {
    id: "experience",
    label: "Years Experience",
    value: 7,
    suffix: "+",
    description: "Building innovative solutions",
    color: "text-blue-400",
  },
  {
    id: "projects",
    label: "Projects Completed",
    value: 50,
    suffix: "+",
    description: "Successful deliveries",
    color: "text-green-400",
  },
  {
    id: "clients",
    label: "Happy Clients",
    value: 35,
    suffix: "+",
    description: "Worldwide partnerships",
    color: "text-purple-400",
  },
  {
    id: "technologies",
    label: "Technologies",
    value: 15,
    suffix: "+",
    description: "Mastered tools & frameworks",
    color: "text-orange-400",
  },
];

const StatCard: React.FC<{
  stat: Stat;
  animationDuration: number;
  showIcon: boolean;
  showDescription: boolean;
}> = ({ stat, animationDuration, showIcon, showDescription }) => {
  const { count, ref } = useCounterAnimation(
    stat.value,
    animationDuration,
    0,
    (t: number) => 1 - Math.pow(1 - t, 3),
  );

  return (
    <div
      ref={ref}
      className="group relative p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Icon */}
      {showIcon && stat.icon && (
        <div className="relative z-10 mb-4 text-purple-400 transform group-hover:scale-110 transition-transform duration-300">
          {stat.icon}
        </div>
      )}

      {/* Counter */}
      <div className="relative z-10 text-center">
        <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {stat.prefix || ""}
          <span
            className={`${stat.color || "text-purple-400"} transition-colors duration-300`}
          >
            {count}
          </span>
          {stat.suffix || ""}
        </div>

        <h3 className="text-xl font-semibold text-gray-200 mb-2 group-hover:text-white transition-colors duration-300">
          {stat.label}
        </h3>

        {showDescription && stat.description && (
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
            {stat.description}
          </p>
        )}
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-pulse"></div>
        <div className="absolute inset-[1px] rounded-xl bg-gray-900"></div>
      </div>
    </div>
  );
};

const AnimatedStats: React.FC<AnimatedStatsProps> = ({
  stats = defaultStats,
  className = "",
  layout = "grid",
  animationDuration = 2000,
  showIcons = false,
  showDescriptions = true,
}) => {
  const { observe } = useIntersectionObserver();

  React.useEffect(() => {
    const container = document.getElementById("animated-stats");
    if (container) {
      observe(container);
    }
  }, [observe]);

  const getLayoutClasses = () => {
    switch (layout) {
      case "horizontal":
        return "flex flex-wrap gap-6 justify-center";
      case "vertical":
        return "flex flex-col gap-6 max-w-md mx-auto";
      case "grid":
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";
    }
  };

  return (
    <section
      id="animated-stats"
      className={`py-20 relative overflow-hidden ${className}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Professional Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Numbers that reflect my commitment to excellence and continuous
            growth in software development
          </p>
        </div>

        {/* Stats Grid */}
        <div className={getLayoutClasses()}>
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="animate-slideInUp opacity-0"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <StatCard
                stat={stat}
                animationDuration={animationDuration}
                showIcon={showIcons}
                showDescription={showDescriptions}
              />
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="mt-16 space-y-6">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-200">
            Skill Proficiency
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { skill: "Frontend Development", level: 95 },
              { skill: "Backend Development", level: 88 },
              { skill: "Mobile Development", level: 85 },
              { skill: "DevOps & Cloud", level: 80 },
            ].map((item, index) => (
              <div
                key={item.skill}
                className="animate-slideInLeft opacity-0"
                style={{
                  animationDelay: `${(index + stats.length) * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">
                    {item.skill}
                  </span>
                  <span className="text-purple-400 font-bold">
                    {item.level}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.level}%`,
                      animationDelay: `${(index + stats.length) * 0.1 + 0.5}s`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-200">
            Certifications & Achievements
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              "AWS Certified",
              "React Expert",
              "Flutter Developer",
              "Full-Stack Engineer",
              "DevOps Specialist",
              "Agile Practitioner",
            ].map((badge, index) => (
              <div
                key={badge}
                className="animate-scaleIn opacity-0 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm"
                style={{
                  animationDelay: `${(index + stats.length + 4) * 0.05}s`,
                  animationFillMode: "forwards",
                }}
              >
                <span className="text-gray-300 text-sm font-medium">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
