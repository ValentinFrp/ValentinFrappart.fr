import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { Toast, toast } from "react-hot-toast";

interface ToastProps {
  t: Toast;
  message: string;
  type: "success" | "error" | "info";
}

const ToastComponent = ({ t, message, type }: ToastProps) => {
  const icons = {
    success: <CheckCircle className="w-6 h-6 text-green-500" />,
    error: <XCircle className="w-6 h-6 text-red-500" />,
    info: <AlertCircle className="w-6 h-6 text-blue-500" />,
  };

  const bgColors = {
    success: "bg-green-50 dark:bg-green-900/20",
    error: "bg-red-50 dark:bg-red-900/20",
    info: "bg-blue-50 dark:bg-blue-900/20",
  };

  const borderColors = {
    success: "border-l-4 border-green-500",
    error: "border-l-4 border-red-500",
    info: "border-l-4 border-blue-500",
  };

  const textColors = {
    success: "text-green-800 dark:text-green-200",
    error: "text-red-800 dark:text-red-200",
    info: "text-blue-800 dark:text-blue-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`
        ${bgColors[type]}
        ${borderColors[type]}
        p-4 rounded-lg shadow-lg
        flex items-center gap-4
        min-w-[320px] max-w-md
        backdrop-blur-sm
      `}
    >
      <span className="flex-shrink-0">{icons[type]}</span>
      <p className={`${textColors[type]} text-sm flex-1 font-medium`}>
        {message}
      </p>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-500 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export const showToast = {
  success: (message: string) =>
    toast.custom(
      (t) => <ToastComponent t={t} message={message} type="success" />,
      {
        duration: 5000,
        position: "bottom-right",
      },
    ),
  error: (message: string) =>
    toast.custom(
      (t) => <ToastComponent t={t} message={message} type="error" />,
      {
        duration: 7000,
        position: "bottom-right",
      },
    ),
  info: (message: string) =>
    toast.custom(
      (t) => <ToastComponent t={t} message={message} type="info" />,
      {
        duration: 5000,
        position: "bottom-right",
      },
    ),
};
