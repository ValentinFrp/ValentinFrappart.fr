import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TextParticles from './TextParticles';
import { useScrollTo } from '../hooks/useScrollTo';

const Hero = () => {
    const scrollTo = useScrollTo();

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center text-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <TextParticles
                        text="Développeur Full Stack"
                        className="h-32 mb-2"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-gray-300 mb-8"
                    >
                        <TextParticles
                            text="Créateur de solutions web modernes et performantes"
                            className="h-32 mb-2"
                        />
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <motion.button
                        onClick={() => scrollTo('projets')}
                        className="bg-white text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Voir mes projets
                    </motion.button>
                    <motion.button
                        onClick={() => scrollTo('contact')}
                        className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-slate-900 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Me contacter
                    </motion.button>
                </motion.div>
            </div>

            <motion.button
                onClick={() => scrollTo('projets')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="absolute bottom-8 cursor-pointer"
            >
                <ChevronDown size={32} className="text-white/50" />
            </motion.button>
        </section>
    );
};

export default Hero;