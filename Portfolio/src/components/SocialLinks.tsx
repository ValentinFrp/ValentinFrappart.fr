import React from "react";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  hoverColor: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
  layout?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  className?: string;
}

const defaultLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/ValentinFrp",
    icon: <Github size={20} />,
    color: "text-gray-300",
    bgColor: "bg-gray-800",
    hoverColor: "hover:bg-gray-700 hover:text-white",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/valentin-frappart-a73b252b4/",
    icon: <Linkedin size={20} />,
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
    hoverColor: "hover:bg-blue-600 hover:text-white",
  },
  {
    name: "Email",
    url: "mailto:valentinn.frappart@gmail.com",
    icon: <Mail size={20} />,
    color: "text-purple-400",
    bgColor: "bg-purple-900/20",
    hoverColor: "hover:bg-purple-600 hover:text-white",
  },
];

const SocialLinks: React.FC<SocialLinksProps> = ({
  links = defaultLinks,
  layout = "horizontal",
  size = "md",
  showLabels = false,
  className = "",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-10 h-10 text-sm";
      case "lg":
        return "w-14 h-14 text-lg";
      case "md":
      default:
        return "w-12 h-12 text-base";
    }
  };

  const getLayoutClasses = () => {
    return layout === "vertical" ? "flex-col" : "flex-row";
  };

  return (
    <div className={`flex ${getLayoutClasses()} gap-4 ${className}`}>
      {links.map((link, index) => (
        <div
          key={link.name}
          className="group relative animate-slideInUp opacity-0"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: "forwards",
          }}
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${getSizeClasses()}
              ${link.color}
              ${link.bgColor}
              ${link.hoverColor}
              flex items-center justify-center
              rounded-full
              border border-gray-700
              transition-all duration-300
              hover:border-transparent
              hover:transform hover:scale-110
              hover:shadow-lg hover:shadow-purple-500/25
              relative overflow-hidden
              backdrop-blur-sm
            `}
            aria-label={`Visit ${link.name} profile`}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Icon */}
            <div className="relative z-10 transform group-hover:rotate-12 transition-transform duration-300">
              {link.icon}
            </div>

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white/10 transform scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>

            {/* External link indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
              <ExternalLink size={10} className="text-white" />
            </div>
          </a>

          {/* Label */}
          {showLabels && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="text-sm text-gray-300 bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap border border-gray-700">
                {link.name}
              </span>
            </div>
          )}

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce"
                style={{
                  top: `${20 + i * 20}%`,
                  left: `${20 + i * 30}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${1 + i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const FloatingSocialLinks: React.FC<{
  position?: "left" | "right";
  className?: string;
}> = ({ position = "left", className = "" }) => {
  const positionClasses = position === "left" ? "left-6" : "right-6";

  return (
    <div
      className={`fixed top-1/2 transform -translate-y-1/2 z-40 ${positionClasses} ${className}`}
    >
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-full p-3 border border-gray-700">
        <SocialLinks layout="vertical" size="sm" />
      </div>
    </div>
  );
};

export const HeroSocialLinks: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`flex justify-center gap-6 ${className}`}>
      <SocialLinks size="lg" />
    </div>
  );
};

export const CompactSocialLinks: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      <SocialLinks size="sm" />
    </div>
  );
};

export default SocialLinks;
