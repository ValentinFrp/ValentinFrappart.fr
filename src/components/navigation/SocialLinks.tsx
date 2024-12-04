import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import type { SocialLink } from "../../types/navigation";

const SocialLinks = () => {
  const socialLinks: SocialLink[] = [
    { icon: Github, href: "https://github.com/ValentinFrp", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/valentin-frappart-a73b252b4/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:valentinn.frappart@gmail.com", label: "Email" },
  ];

  return (
    <>
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-gray-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon size={20} />
        </motion.a>
      ))}
    </>
  );
};

export default SocialLinks;
