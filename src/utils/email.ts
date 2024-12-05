import emailjs from "emailjs-com";
import toast from "react-hot-toast";

interface EmailData {
  name: string;
  email: string;
  message: string;
}

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

const getEmailConfig = (): EmailConfig | null => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn(
      "EmailJS configuration is missing. Contact form will be disabled.",
    );
    return null;
  }

  return {
    serviceId,
    templateId,
    publicKey,
  };
};

export const isEmailConfigured = (): boolean => {
  return getEmailConfig() !== null;
};

export const initEmailJS = () => {
  const config = getEmailConfig();
  if (config) {
    emailjs.init(config.publicKey);
  }
};

export const sendEmail = async (data: EmailData): Promise<void> => {
  const config = getEmailConfig();

  if (!config) {
    toast.error("Le formulaire de contact est temporairement indisponible.");
    throw new Error("Configuration EmailJS manquante");
  }

  try {
    const date = new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_name: "Valentin Frappart",
      reply_to: data.email,
      date: date,
      subject: `Nouveau message de ${data.name} - Portfolio`,
    };

    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
    );

    if (response.status !== 200) {
      throw new Error("Erreur lors de l'envoi");
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw error;
  }
};
