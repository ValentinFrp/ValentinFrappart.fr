import { useState } from 'react';
import ParticlesBackground from './components/ParticlesBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import type { Project } from './types/project';

function App() {
    const projects: Project[] = [
        {
            title: "E-commerce Platform",
            description: "Une plateforme e-commerce complète avec panier, paiement et gestion des commandes",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            githubUrl: "https://github.com",
            liveUrl: "https://demo.com"
        },
        {
            title: "Application de Gestion",
            description: "Dashboard administratif pour la gestion des ressources d'entreprise",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
            technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
            githubUrl: "https://github.com",
            liveUrl: "https://demo.com"
        },
        {
            title: "Application Mobile",
            description: "Application mobile de suivi fitness et nutrition",
            image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80",
            technologies: ["React Native", "Firebase", "Redux"],
            githubUrl: "https://github.com",
            liveUrl: "https://demo.com"
        }
    ];

    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    const allTechnologies = Array.from(
        new Set(projects.flatMap(project => project.technologies))
    );

    const filteredProjects = selectedTech
        ? projects.filter(project => project.technologies.includes(selectedTech))
        : projects;

    return (
        <>
            <ParticlesBackground />
            <div className="relative min-h-screen">
                <ScrollProgress />
                <Header />
                <main>
                    <Hero />
                    <Skills />
                    <section id="projets" className="py-20">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-white text-center mb-12">
                                Mes Projets
                            </h2>
                            <ProjectFilters
                                technologies={allTechnologies}
                                selectedTech={selectedTech}
                                onSelectTech={setSelectedTech}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard key={index} {...project} />
                                ))}
                            </div>
                        </div>
                    </section>
                    <About />
                    <Contact />
                </main>
                <ScrollToTop />
            </div>
        </>
    );
}

export default App;