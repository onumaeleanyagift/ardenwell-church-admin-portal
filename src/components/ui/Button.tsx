import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-700 text-white hover:bg-blue-800",
  secondary: "bg-blue-50 text-blue-800 hover:bg-blue-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50",
};

function Button({
  variant = "primary",
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
