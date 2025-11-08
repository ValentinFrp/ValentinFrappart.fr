import React from "react";

interface ExpertiseItem {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
}

interface ExpertiseCardProps {
  expertise: ExpertiseItem;
  index: number;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ expertise, index }) => {
  return (
    <div
      className="expertise-card p-8 rounded-lg"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="mb-6 relative z-10">{expertise.icon}</div>
      <h3 className="text-2xl font-bold mb-2 relative z-10">{expertise.title}</h3>
      {expertise.subtitle && (
        <h4 className="text-xl text-gray-400 mb-4 relative z-10">
          {expertise.subtitle}
        </h4>
      )}
      <p className="text-gray-300 leading-relaxed relative z-10">
        {expertise.description}
      </p>
    </div>
  );
};

export default ExpertiseCard;
