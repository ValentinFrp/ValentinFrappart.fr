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
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  // Debug logs
  console.log("EmailJS Config:", {
    serviceId,
    templateId,
    hasPublicKey: !!publicKey,
  });

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS configuration is missing");
    return null;
  }

  return {
    serviceId,
    templateId,
    publicKey,
  };
};

export const isEmailConfigured = (): boolean => {
  const config = getEmailConfig();
  return config !== null;
};

export const initEmailJS = () => {
  const config = getEmailConfig();
  if (config) {
    try {
      emailjs.init(config.publicKey);
      console.log("EmailJS initialized successfully");
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
      toast.error("Erreur d'initialisation du service de contact");
    }
  }
};

export const sendEmail = async (data: EmailData): Promise<void> => {
  const config = getEmailConfig();

  if (!config) {
    throw new Error("Configuration EmailJS manquante");
  }

  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_name: "Valentin Frappart",
      reply_to: data.email,
      date: new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
    );

    if (response.status !== 200) {
      throw new Error("Échec de l'envoi");
    }
  } catch (error: any) {
    console.error("Erreur lors de l'envoi:", error);
    throw new Error(error.text || "Erreur lors de l'envoi du message");
  }
};
