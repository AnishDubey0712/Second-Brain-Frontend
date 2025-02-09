import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

export interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg"; // Optional size, defaults to "md"
  text: string;
  icon?: string; // Icon class from Bootstrap Icons
  onClick: () => void;
}

// Define Bootstrap size classes (for padding)
const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "p-1",
  md: "p-2",
  lg: "p-3",
};

const Button: React.FC<ButtonProps> = ({
  variant,
  size = "md",
  text,
  icon,
  onClick,
}) => {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";

  return (
    <button className={`btn btn-${variant} ${sizeClass} ${sizeStyles[size]}`} onClick={onClick}>
      {icon && <i className={`bi ${icon} me-2`}></i>} {/* Bootstrap Icon */}
      {text}
    </button>
  );
};

export default Button;
