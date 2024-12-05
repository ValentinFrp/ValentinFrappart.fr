import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { sendEmail, isEmailConfigured } from "../utils/email";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailConfigured()) {
      toast.error("Le formulaire de contact est temporairement indisponible.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail(formState);
      toast.success("Message envoyé avec succès!");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
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
            <h3 className="text-2xl font-semibold text-white">
              Parlons de votre projet
            </h3>
            <p className="text-gray-300">
              N'hésitez pas à me contacter pour discuter de vos besoins en
              développement web. Je suis toujours ouvert aux nouvelles
              opportunités.
            </p>

            <div className="space-y-6">
              <motion.a
                href="mailto:valentinn.frappart@gmail.com"
                className="flex items-center text-gray-300 group"
                whileHover={{ x: 5 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="mr-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  valentinn.frappart@gmail.com
                </span>
              </motion.a>
              <motion.a
                href="tel:+33606668955"
                className="flex items-center text-gray-300 group"
                whileHover={{ x: 5 }}
              >
                <Phone className="mr-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  +33 6 06 66 89 55
                </span>
              </motion.a>
              <motion.div
                className="flex items-center text-gray-300 group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="mr-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  Lille, France
                </span>
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
              <label htmlFor="name" className="block text-white mb-2">
                Nom
              </label>
              <motion.input
                variants={inputVariants}
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div whileHover="focus">
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <motion.input
                variants={inputVariants}
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div whileHover="focus">
              <label htmlFor="message" className="block text-white mb-2">
                Message
              </label>
              <motion.textarea
                variants={inputVariants}
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.button
              type="submit"
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors`}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              disabled={isSubmitting}
            >
              <Send className="mr-2" size={20} />
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
