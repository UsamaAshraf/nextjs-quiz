import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose(); // Close toast after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 max-w-sm w-full bg-red-400 text-white rounded-lg shadow-md">
      {message}
    </div>
  );
};

export default Toast;
