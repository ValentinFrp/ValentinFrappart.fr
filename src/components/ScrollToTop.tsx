import { motion, useScroll, useAnimationControls } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect } from 'react';

const ScrollToTop = () => {
    const { scrollYProgress } = useScroll();
    const controls = useAnimationControls();

    useEffect(() => {
        return scrollYProgress.on('change', (latest) => {
            if (latest > 0.2) {
                controls.start({ opacity: 1, y: 0 });
            } else {
                controls.start({ opacity: 0, y: 20 });
            }
        });
    }, [scrollYProgress, controls]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <ArrowUp size={24} />
        </motion.button>
    );
};

export default ScrollToTop;