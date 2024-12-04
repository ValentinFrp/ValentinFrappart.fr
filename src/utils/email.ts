import emailjs from "emailjs-com";

interface EmailData {
  name: string;
  email: string;
  message: string;
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const initEmailJS = () => {
  if (!PUBLIC_KEY) {
    console.error("EmailJS Public Key is missing");
    return;
  }
  emailjs.init(PUBLIC_KEY);
};

export const sendEmail = async (data: EmailData): Promise<void> => {
  if (!SERVICE_ID || !TEMPLATE_ID) {
    throw new Error("Configuration EmailJS manquante");
  }

  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_name: "Valentin Frappart",
      reply_to: data.email,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
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
