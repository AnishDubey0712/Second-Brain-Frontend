import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";

export interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "success";
  size: "sm" | "md" | "lg";
  text: string;
  start?: React.ReactNode;
  end?: React.ReactNode;
  onClick: () => void;
  defaultStyle?: string;
}

const bootstrapVariantMap = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  success: "success",
};

const bootstrapSizeMap = {
  sm: "sm",
  md: "lg", // No exact 'md' size in react-bootstrap, using 'lg' here
  lg: "lg",
};

const defaultStyles = "rounded-md p-4"; // default padding and rounded styles

const Button = ({ variant, size, text, start, end, onClick }: ButtonProps) => {
  return (
    <BootstrapButton
      variant={bootstrapVariantMap[variant]}
      size={bootstrapSizeMap[size]}
      onClick={onClick}
      className={defaultStyles}
    >
      {start} {text} {end}
    </BootstrapButton>
  );
};

export default Button;
