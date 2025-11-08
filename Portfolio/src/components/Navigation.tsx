import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { id: "home", label: "home", number: "01" },
    { id: "expertise", label: "expertise", number: "02" },
    { id: "work", label: "work", number: "03" },
    { id: "experience", label: "experience", number: "04" },
    { id: "contact", label: "contact", number: "05" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 py-6 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-black/20 border-b border-purple-500/20"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="font-mono text-xl">
              <button
                onClick={() => handleNavClick("home")}
                className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded"
                aria-label="Go to home section"
              >
                <span className="text-white">ValentinFrp</span>
                <span
                  className={`transition-colors duration-300 ${
                    activeSection === "home" ? "text-purple-500" : "text-purple-500"
                  }`}
                >
                  ._
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              {navigationItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-gray-600">{item.number}</span>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`transition-all duration-300 hover:text-purple-500 focus:outline-none focus:text-purple-500 relative group ${
                      activeSection === item.id
                        ? "text-purple-500"
                        : "text-gray-300"
                    }`}
                    aria-label={`Go to ${item.label} section`}
                  >
                    // {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full ${
                        activeSection === item.id ? "w-full" : ""
                      }`}
                    ></span>
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:text-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-sm bg-gray-900/95 backdrop-blur-md border-l border-purple-500/20 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <div className="flex-1 space-y-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-4 w-full text-left p-4 rounded-lg transition-all duration-300 hover:bg-purple-500/10 hover:text-purple-400 focus:outline-none focus:bg-purple-500/10 focus:text-purple-400 ${
                    activeSection === item.id
                      ? "text-purple-500 bg-purple-500/10"
                      : "text-gray-300"
                  }`}
                  aria-label={`Go to ${item.label} section`}
                >
                  <span className="text-gray-600 font-mono text-sm">
                    {item.number}
                  </span>
                  <span className="text-lg">// {item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="pt-6 pb-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-center">
                Valentin Frappart
              </p>
              <p className="text-gray-500 text-xs text-center mt-1">
                Software Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
