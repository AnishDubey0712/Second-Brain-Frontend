import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";

export interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "success";
  size: "sm" | "md" | "lg";
  text: string;
  start?: React.ReactNode;
  end?: React.ReactNode;
  onClick: () => void;
}

const bootstrapVariantMap: Record<ButtonProps["variant"], string> = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  success: "success",
};

const bootstrapSizeMap: Record<ButtonProps["size"], "sm" | "lg"> = {
  sm: "sm",
  md: "lg",
  lg: "lg",
};

export const Button: React.FC<ButtonProps> = ({ variant, size, text, start, end, onClick }) => {
  return (
    <BootstrapButton variant={bootstrapVariantMap[variant]} size={bootstrapSizeMap[size]} onClick={onClick}>
      {start} {text} {end}
    </BootstrapButton>
  );
};

export default Button;
