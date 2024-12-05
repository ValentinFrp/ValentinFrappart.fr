import emailjs from "emailjs-com";

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
    console.warn("EmailJS configuration is missing");
    console.log("Available env vars:", {
      serviceId,
      templateId,
      publicKey,
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
  return getEmailConfig() !== null;
};

export const initEmailJS = () => {
  const config = getEmailConfig();
  if (config) {
    try {
      emailjs.init(config.publicKey);
      console.log("EmailJS initialized successfully");
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
    }
  }
};

export const sendEmail = async (data: EmailData): Promise<void> => {
  const config = getEmailConfig();

  if (!config) {
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

    console.log("Sending email with config:", {
      serviceId: config.serviceId,
      templateId: config.templateId,
      hasPublicKey: !!config.publicKey,
    });

    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
    );

    if (response.status !== 200) {
      throw new Error(`Email send failed with status: ${response.status}`);
    }

    console.log("Email sent successfully:", response);
  } catch (error: any) {
    console.error("Failed to send email:", error);
    if (error.text) {
      throw new Error(`EmailJS Error: ${error.text}`);
    }
    throw error;
  }
};
