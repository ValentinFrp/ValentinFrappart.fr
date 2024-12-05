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

  console.log("Environment Variables:", {
    VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    NODE_ENV: import.meta.env.MODE,
    BASE_URL: import.meta.env.BASE_URL,
  });

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS configuration is missing:", {
      hasServiceId: !!serviceId,
      hasTemplateId: !!templateId,
      hasPublicKey: !!publicKey,
    });
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
  console.log("EmailJS configuration status:", {
    isConfigured: config !== null,
  });
  return config !== null;
};

export const initEmailJS = () => {
  const config = getEmailConfig();
  if (config) {
    try {
      emailjs.init(config.publicKey);
      console.log(
        "EmailJS initialized successfully with public key:",
        config.publicKey,
      );
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
      toast.error("Erreur d'initialisation du service de contact");
    }
  } else {
    console.warn("EmailJS initialization skipped - missing configuration");
  }
};

export const sendEmail = async (data: EmailData): Promise<void> => {
  const config = getEmailConfig();

  if (!config) {
    console.error("Attempted to send email without configuration");
    throw new Error("EmailJS configuration is missing");
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

    console.log("Attempting to send email with params:", {
      serviceId: config.serviceId,
      templateId: config.templateId,
      templateParams,
    });

    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
    );

    console.log("Email sent successfully:", response);
  } catch (error: any) {
    console.error("Failed to send email:", {
      error,
      errorText: error.text,
      errorStack: error.stack,
    });

    if (error.text) {
      throw new Error(`EmailJS Error: ${error.text}`);
    }
    throw error;
  }
};
