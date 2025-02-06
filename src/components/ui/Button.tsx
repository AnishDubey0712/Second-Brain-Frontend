import React from "react";

export interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "success";
  size: "sm" | "md" | "lg";
  text: string;
  start?: React.ReactNode;
  end?: React.ReactNode;
  onClick: () => void;
}

const variantClasses: Record<ButtonProps["variant"], string> = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
};

const sizeClasses: Record<ButtonProps["size"], string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button: React.FC<ButtonProps> = ({ variant, size, text, start, end, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded transition duration-200 ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {start}
      {text}
      {end}
    </button>
  );
};

export default Button;
