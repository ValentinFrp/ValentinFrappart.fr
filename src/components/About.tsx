import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const About = () => {
    return (
        <section id="a-propos" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-12">À Propos</h2>

                    <div className="bg-slate-800 rounded-lg p-8 shadow-xl">
                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-300 mb-6">
                                Passionné par le développement web depuis plus de 5 ans, je crée des applications
                                web modernes et performantes. Mon approche combine créativité et rigueur technique
                                pour délivrer des solutions qui dépassent les attentes.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="flex items-center">
                                    <Calendar className="text-blue-500 mr-3" />
                                    <div>
                                        <h3 className="text-white font-semibold">Expérience</h3>
                                        <p className="text-gray-400">2+ années</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <MapPin className="text-blue-500 mr-3" />
                                    <div>
                                        <h3 className="text-white font-semibold">Localisation</h3>
                                        <p className="text-gray-400">Lille, France</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Briefcase className="text-blue-500 mr-3" />
                                    <div>
                                        <h3 className="text-white font-semibold">Disponibilité</h3>
                                        <p className="text-gray-400">Freelance</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-white font-semibold mb-4">Parcours</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li>• Expert en ingénierie logiciel, Epitech Lille - 5 ans</li>
                                <li>• Stage Développement Web, Lota.Cloud - 4 mois</li>
                                <li>• Freelance Developer - Présent</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;