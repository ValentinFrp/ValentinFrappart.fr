import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types/project';

const ProjectCard = ({
                         title,
                         description,
                         image,
                         technologies,
                         githubUrl,
                         liveUrl,
                     }: Project) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-slate-800 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-2xl"
        >
            <div className="relative group h-48 sm:h-56 overflow-hidden">
                <motion.img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2 sm:line-clamp-none">{description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech) => (
                        <motion.span
                            key={tech}
                            className="px-3 py-1 text-sm bg-slate-700 text-gray-300 rounded-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>

                <div className="flex space-x-4">
                    {githubUrl && (
                        <motion.a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-white transition-colors"
                            whileHover={{ scale: 1.05, x: 3 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github size={20} className="mr-2" />
                            Code
                        </motion.a>
                    )}
                    {liveUrl && (
                        <motion.a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-white transition-colors"
                            whileHover={{ scale: 1.05, x: 3 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ExternalLink size={20} className="mr-2" />
                            Demo
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;