import React from "react";

export interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg"; // Optional size, defaults to medium if not specified
  text: string;
  start?: React.ReactNode;
  end?: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size = "md", // default size is "md"
  text,
  start,
  end,
  onClick,
}) => {
  // Define Bootstrap size classes
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";

  // Define Bootstrap variant classes
  const variantClass = `btn-${variant}`;

  return (
    <button
      className={`btn ${variantClass} ${sizeClass}`}
      onClick={onClick}
    >
      {start} {text} {end}
    </button>
  );
};

export default Button;
