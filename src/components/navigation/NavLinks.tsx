import { motion } from 'framer-motion';
import { NavigationLink } from '../../types/navigation';
import React from "react";

interface NavLinksProps {
    mobile?: boolean;
    setIsMenuOpen?: (isOpen: boolean) => void;
    scrollTo: (id: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ mobile = false, setIsMenuOpen, scrollTo }) => {
    const links: NavigationLink[] = [
        { name: 'Accueil', id: 'hero' },
        { name: 'Projets', id: 'projets' },
        { name: 'À propos', id: 'a-propos' },
        { name: 'Contact', id: 'contact' }
    ];

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        scrollTo(id);
        if (mobile && setIsMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            {links.map((item, index) => (
                    <motion.a
                        key={item.name}
                href={`#${item.id}`}
    className={`text-gray-300 hover:text-white transition-colors ${mobile ? 'block' : 'inline-block'}`}
    initial={mobile ? { x: -20, opacity: 0 } : undefined}
    animate={mobile ? { x: 0, opacity: 1 } : undefined}
    transition={{ delay: index * 0.1 }}
    onClick={(e) => handleClick(e, item.id)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
>
    {item.name}
    </motion.a>
))}
    </>
);
};

export default NavLinks;
