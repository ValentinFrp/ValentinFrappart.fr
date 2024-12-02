import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import React, { useState } from 'react';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formState);
    };

    const inputVariants = {
        focus: { scale: 1.02, transition: { duration: 0.2 } }
    };

    return (
        <section id="contact" className="py-20 bg-slate-800/50">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-3xl font-bold text-white text-center mb-12"
                >
                    Contact
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-semibold text-white">Parlons de votre projet</h3>
                        <p className="text-gray-300">
                            N'hésitez pas à me contacter pour discuter de vos besoins en développement web.
                            Je suis toujours ouvert aux nouvelles opportunités.
                        </p>

                        <div className="space-y-6">
                            <motion.div
                                className="flex items-center text-gray-300 group"
                                whileHover={{ x: 5 }}
                            >
                                <Mail className="mr-4 text-blue-500 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-white transition-colors">valentinn.frappart@gmail.com</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center text-gray-300 group"
                                whileHover={{ x: 5 }}
                            >
                                <Phone className="mr-4 text-blue-500 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-white transition-colors">+33 6 06 66 89 55</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center text-gray-300 group"
                                whileHover={{ x: 5 }}
                            >
                                <MapPin className="mr-4 text-blue-500 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-white transition-colors">Lille, France</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <motion.div whileHover="focus">
                            <label htmlFor="name" className="block text-white mb-2">Nom</label>
                            <motion.input
                                variants={inputVariants}
                                type="text"
                                id="name"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                required
                            />
                        </motion.div>

                        <motion.div whileHover="focus">
                            <label htmlFor="email" className="block text-white mb-2">Email</label>
                            <motion.input
                                variants={inputVariants}
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                required
                            />
                        </motion.div>

                        <motion.div whileHover="focus">
                            <label htmlFor="message" className="block text-white mb-2">Message</label>
                            <motion.textarea
                                variants={inputVariants}
                                id="message"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                required
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Send className="mr-2" size={20} />
                            Envoyer
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;