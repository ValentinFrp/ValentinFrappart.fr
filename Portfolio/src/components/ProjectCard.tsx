import React from "react";
import { Link2, Code } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github: string;
  category: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div
      className="group project-card bg-gray-900/50 rounded-lg overflow-hidden backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="tech-tag px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={project.link}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.title}`}
          >
            <Link2 size={16} />
            Live Demo
          </a>
          <a
            href={project.github}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code of ${project.title}`}
          >
            <Code size={16} />
            Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
