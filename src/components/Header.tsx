import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTo } from '../hooks/useScrollTo';
import NavLinks from './navigation/NavLinks.tsx';
import SocialLinks from './navigation/SocialLinks.tsx';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollTo = useScrollTo();

    return (
        <header className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-sm">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-white font-bold text-xl"
                    >
                        Portfolio
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <NavLinks scrollTo={scrollTo} />
                    </div>

                    {/* Social Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <SocialLinks />
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden bg-slate-800/95 mt-4 rounded-lg"
                        >
                            <div className="flex flex-col space-y-4 p-6">
                                <NavLinks mobile scrollTo={scrollTo} setIsMenuOpen={setIsMenuOpen} />
                                <div className="flex justify-center space-x-4 pt-4 border-t border-slate-700">
                                    <SocialLinks />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Header;