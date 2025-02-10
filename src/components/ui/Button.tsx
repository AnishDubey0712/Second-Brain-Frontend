import React from "react";
import { BsFillShareFill, BsFillPlusCircleFill } from "react-icons/bs"; // Bootstrap Icons

export interface ButtonProps {
  variant: "share" | "add"; // For Share and Add variants
  size?: "sm" | "md" | "lg"; // Optional size, defaults to medium if not specified
  text: string;
  start?: React.ReactNode;
  end?: React.ReactNode;
  onClick: () => void;
  className?: string; // Optional className for additional custom styling
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size = "md", // Default size is "md"
  text,
  start,
  end,
  onClick,
  className = "", // Default to empty if no className
}) => {
  // Define Bootstrap size classes
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md"; // Default to btn-md

  // Define custom button colors based on variant.
  const buttonStyle =
    variant === "share"
      ? "btn" // For Share, use custom color
      : variant === "add"
      ? "btn" // For Add Content, use custom color
      : "";

  const customStyles = {
    share: {
      backgroundColor: "#FF5733", // Light Blue for Share Button
      color: "#fff", // Text color (black)
      fontFamily: "'Poppins', sans-serif", // Poppins font
    },
    add: {
      backgroundColor: "#5D3FD3", // Purple for Add Content Button
      color: "#fff", // Text color (white)
      fontFamily: "'Poppins', sans-serif", // Poppins font
    },
  };

  return (
    <button
      className={`btn ${sizeClass} ${className}`} // Include size and any additional class
      style={variant === "share" ? customStyles.share : customStyles.add} // Apply custom styles based on variant
      onClick={onClick}
    >
      {start}
      {variant === "share" && <BsFillShareFill />} {/* Share icon */}
      {variant === "add" && <BsFillPlusCircleFill />} {/* Add icon */}
      {text}
      {end}
    </button>
  );
};

export default Button;
