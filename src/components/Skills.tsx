import { motion } from "framer-motion";
import {
  SiC,
  SiGo,
  SiLaravel,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
}

const skills: Skill[] = [
  { name: "", level: 90, icon: <SiC /> },
  { name: "Laravel", level: 85, icon: <SiLaravel /> },
  { name: "TypeScript", level: 80, icon: <SiTypescript /> },
  { name: "React", level: 80, icon: <SiReact /> },
  { name: "Go", level: 70, icon: <SiGo /> },
  { name: "Vue.js", level: 65, icon: <SiVuedotjs /> },
];

const Skills = () => {
  return (
    <section id="competences" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-white text-center mb-12"
        >
          Compétences
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-700 rounded-lg p-6 transform transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{skill.icon}</span>
                <h3 className="text-xl font-semibold text-white">
                  {skill.name}
                </h3>
              </div>
              <div className="relative h-2 bg-slate-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-300">Maîtrise</span>
                <span className="text-sm font-semibold text-blue-400">
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
