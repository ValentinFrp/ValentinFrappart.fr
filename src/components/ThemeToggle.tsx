import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { Theme } from '../hooks/useTheme';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const icons = {
        light: Sun,
        dark: Moon,
        synthwave: Sparkles
    };

    const Icon = icons[theme];

    const cycleTheme = () => {
        const themeOrder: Theme[] = ['light', 'dark', 'synthwave'];
        const currentIndex = themeOrder.indexOf(theme);
        const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
        setTheme(nextTheme);
    };

    return (
        <motion.button
            onClick={cycleTheme}
            className="fixed bottom-8 left-8 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
        >
            <Icon size={24} />
        </motion.button>
    );
};

export default ThemeToggle;