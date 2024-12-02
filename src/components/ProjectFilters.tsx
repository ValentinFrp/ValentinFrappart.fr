import { motion } from 'framer-motion';

interface ProjectFiltersProps {
    technologies: string[];
    selectedTech: string | null;
    onSelectTech: (tech: string | null) => void;
}

const ProjectFilters = ({ technologies, selectedTech, onSelectTech }: ProjectFiltersProps) => {
    return (
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTech === null
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
                onClick={() => onSelectTech(null)}
            >
                Tous
            </motion.button>
            {technologies.map((tech) => (
                <motion.button
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedTech === tech
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                    onClick={() => onSelectTech(tech)}
                >
                    {tech}
                </motion.button>
            ))}
        </div>
    );
};

export default ProjectFilters;