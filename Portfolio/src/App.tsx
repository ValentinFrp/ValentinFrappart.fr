import { useState, useEffect, useCallback, Suspense } from "react";
import {
  Monitor,
  Workflow,
  Code,
  ArrowUp,
  MapPin,
  Link2,
  ChevronDown,
} from "lucide-react";
import ProjectCard from "./components/ProjectCard";
import ExpertiseCard from "./components/ExpertiseCard";
import Navigation from "./components/Navigation";

import SocialLinks, { CompactSocialLinks } from "./components/SocialLinks";
import VisualEffects, { effectPresets } from "./components/VisualEffects";
import Loading from "./components/Loading";
import { useActiveSection } from "./hooks/useIntersectionObserver";

import { useAdaptiveQuality } from "./hooks/usePerformance";
import {
  updateSEO,
  injectStructuredData,
  throttle,
  prefersReducedMotion,
} from "./utils/seo";

import mlopsImage from "../assets/ImageMlOps.png";
import lotaImage from "../assets/LogoLotaCloud.png";

const personalInfo = {
  name: "Valentin Frappart",
  title: "SOFTWARE ENGINEER | MLOPS",
  location: "Lille, France",
  email: "valentinn.frappart@gmail.com",
  social: {
    messenger: "#",
    linkedin: "https://www.linkedin.com/in/valentin-frappart-a73b252b4/",
    instagram: "#",
    github: "https://github.com/ValentinFrp",
  },
};

const expertise = [
  {
    icon: <Monitor className="w-12 h-12 text-white" />,
    title: "Software Development",
    subtitle: "C++, Python, Rust, Go",
    description:
      "Experienced in both functional and OOP: C++, Python, Rust, Go",
  },
  {
    icon: <Workflow className="w-12 h-12 text-white" />,
    title: "MLOPS",
    subtitle: "FastAPI, Scikit-learn, CI/CD, Docker, Pandas/Numpy",
    description:
      "Learning MLOPS using FastAPI, Scikit-learn, Pandas/Numpy, CI/CD, and Docker.",
  },
  {
    icon: <Code className="w-12 h-12 text-white" />,
    title: "Backend Dev",
    subtitle: "Laravel, PHP, NestJS, Rust, Go",
    description:
      "Skilled in backend development using Laravel, PHP, NestJS, Rust, and Go.Using hexagonal architecture and clean code principles.",
  },
];

const experiences = [
  {
    title: "Lota.Cloud",
    period: "2024 - 2024",
    location: "Lille, France",
    website: "https://lota.cloud",
    description:
      "During my 4-month internship, I worked mainly on the backend on the integration of a chat for users on the application.",
    technologies: ["Backend", "Frontend", "Laravel", "PHP", "Vue.js"],
    logo: lotaImage,
  },
];

const projects = [
  {
    title: "MLOPS Pipeline",
    description:
      "A machine learning-based real estate price prediction API, deployable on the cloud with automated CI/CD..",
    technologies: [
      "Docker",
      "uvicorn",
      "FastAPI",
      "Pydantic",
      "Scikit-learn",
      "Pandas/Numpy",
    ],
    image: mlopsImage,
    link: "#",
    github: "https://github.com/ValentinFrp/APIMLCloud",
    category: "MLOPS",
  },
  {
    title: "",
    description: "",
    technologies: [],
    image: "",
    link: "",
    github: "#",
    category: "",
  },
  {
    title: "",
    description: "",
    technologies: [],
    image: "",
    link: "#",
    github: "#",
    category: "",
  },
  {
    title: "",
    description: "",
    technologies: [],
    image: "",
    link: "#",
    github: "#",
    category: "",
  },
];

function App() {
  const sectionIds = ["home", "expertise", "work", "experience", "contact"];
  const activeSection = useActiveSection(sectionIds);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openExperience, setOpenExperience] = useState<number | null>(0);

  const { settings } = useAdaptiveQuality();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsLoading(false),
      settings.enableAnimations ? 1500 : 500,
    );
    return () => clearTimeout(timer);
  }, [settings.enableAnimations]);

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (prefersReducedMotion()) return;

      requestAnimationFrame(() => {
        const elements = document.getElementsByClassName("ambient-light");
        for (let i = 0; i < elements.length; i++) {
          const rect = elements[i].getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          (elements[i] as HTMLElement).style.setProperty("--mouse-x", `${x}%`);
          (elements[i] as HTMLElement).style.setProperty("--mouse-y", `${y}%`);
        }
      });
    }, 16),
    [],
  );

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  useEffect(() => {
    updateSEO({
      title: "Valentin Frappart - Software Engineer Portfolio",
      description:
        "Software Engineer specializing in React, MlOps, and Full-Stack Development. Explore my projects and expertise in JavaScript, TypeScript, Python, and modern web technologies.",
      keywords: [
        "Valentin Frappart",
        "Software Engineer",
        "React Developer",
        "MlOps Engineer",
        "Full-Stack Developer",
      ],
      url: window.location.href,
    });

    injectStructuredData({
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      description:
        "Software Engineer specializing in React, MlOps, and Full-Stack Development",
      url: window.location.href,
      sameAs: [personalInfo.social.linkedin, personalInfo.social.github].filter(
        (link) => link !== "#",
      ),
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.3 },
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleExperience = (index: number) => {
    setOpenExperience(openExperience === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <Loading type="hero" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white relative overflow-x-hidden">
      <div className="bg-gradient"></div>
      <div className="bg-grid"></div>

      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>

      {settings.enableAnimations && (
        <Suspense fallback={<div></div>}>
          <VisualEffects {...effectPresets.minimal} />
        </Suspense>
      )}

      <Navigation activeSection={activeSection} />

      <section
        id="home"
        className={`min-h-screen relative ${
          activeSection === "home" ? "active" : ""
        }`}
      >
        <div className="ambient-light"></div>

        {settings.enableBlur && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>
        )}

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-6">
            <h1
              className={`text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 glow flex items-center justify-center ${settings.enableAnimations ? "animate-slideInUp opacity-0" : ""}`}
              role="banner"
              style={
                settings.enableAnimations
                  ? { animationDelay: "0.5s", animationFillMode: "forwards" }
                  : {}
              }
            >
              {personalInfo.name}
            </h1>
          </div>

          <div className="mb-8">
            <h2
              className={`text-xl md:text-2xl text-gray-300 mx-auto max-w-2xl flex items-center justify-center ${settings.enableAnimations ? "animate-slideInUp opacity-0" : ""}`}
              style={
                settings.enableAnimations
                  ? { animationDelay: "1s", animationFillMode: "forwards" }
                  : {}
              }
            >
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {personalInfo.title}
              </span>
            </h2>
          </div>

          <div
            className={`mb-12 ${settings.enableAnimations ? "animate-slideInUp opacity-0" : ""}`}
            style={
              settings.enableAnimations
                ? { animationDelay: "1.5s", animationFillMode: "forwards" }
                : {}
            }
          >
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              As a Software Engineer, I design high-performance, scalable
              systems utilizing
              <span className="text-purple-400 font-semibold">
                {" "}
                modern software architectures
              </span>{" "}
              and best-in-class
              <span className="text-blue-400 font-semibold">
                {" "}
                DevOps/MLOps practices
              </span>
              .
              <br />I ensure quality and robustness, from source code to
              production deployment.
            </p>
          </div>

          <div
            className={`mb-16 ${settings.enableAnimations ? "animate-slideInUp opacity-0" : ""}`}
            style={
              settings.enableAnimations
                ? { animationDelay: "2s", animationFillMode: "forwards" }
                : {}
            }
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 btn-glow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="View my work section"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />
                </span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 text-purple-300 hover:text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-purple-500/10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Go to contact section"
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div
            className={`mb-20 ${settings.enableAnimations ? "animate-slideInUp opacity-0" : ""}`}
            style={
              settings.enableAnimations
                ? { animationDelay: "2.5s", animationFillMode: "forwards" }
                : {}
            }
          >
            <h3 className="text-gray-400 mb-8 text-lg">Connect With Me</h3>
            <div className="flex justify-center">
              <SocialLinks size="lg" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="expertise"
        className={`relative ${activeSection === "expertise" ? "active" : ""}`}
      >
        <div className="ambient-light"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-7xl font-bold mb-24 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            My Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <ExpertiseCard key={index} expertise={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="work"
        className={`relative ${activeSection === "work" ? "active" : ""}`}
      >
        <div className="ambient-light"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-7xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Featured Work
          </h2>

          <div className="flex justify-center mb-12">
            <div className="flex gap-4 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="experience"
        className={`relative ${activeSection === "experience" ? "active" : ""}`}
      >
        <div className="ambient-light"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-7xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Professional Experience
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Click on any experience to expand and learn more about my
            contributions and achievements
          </p>
          <div className="space-y-4 max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={index}
                onClick={() => toggleExperience(index)}
                className={`group bg-gradient-to-r from-purple-900/30 to-blue-900/20 rounded-lg transition-all duration-300 overflow-hidden backdrop-blur-sm cursor-pointer hover:from-purple-800/40 hover:to-blue-800/30 border border-purple-500/20 hover:border-purple-500/40 hover:transform hover:scale-[1.02] ${
                  openExperience === index ? "p-8 border-purple-500/60" : "p-6"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-purple-300 transition-colors">
                      {exp.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">{exp.period}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        openExperience === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {openExperience === index && (
                  <div className="mt-6 space-y-4 animate-slideInUp">
                    <div className="flex flex-wrap items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                      {exp.website && (
                        <div className="flex items-center gap-2">
                          <Link2 size={16} />
                          <a
                            href={`https://${exp.website}`}
                            className="hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {exp.website}
                          </a>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex gap-3 flex-wrap">
                      {exp.technologies?.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full text-sm hover:bg-purple-600/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={`relative ${activeSection === "contact" ? "active" : ""}`}
      >
        <div className="ambient-light"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Have an exciting project you need help with?
              <br />
              <span className="text-purple-400">
                Let's bring your ideas to life together!
              </span>
            </p>

            <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-purple-500/20">
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                Ready to start?
              </h3>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label={`Send email to ${personalInfo.email}`}
              >
                <span role="img" aria-label="Email">
                  ✉️
                </span>
                {personalInfo.email}
              </a>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl text-gray-300 mb-6">Or find me on</h3>
              <CompactSocialLinks />
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-400 text-sm">
                <span role="img" aria-label="Location">
                  📍
                </span>{" "}
                Based in {personalInfo.location} • Available for remote work
                worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      <button
        onClick={scrollToTop}
        className="lightning-button bg-purple-600 p-3 rounded-lg hover:bg-purple-700"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;
