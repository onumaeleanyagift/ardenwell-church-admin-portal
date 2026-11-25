import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800",
  secondary: "bg-brand-50 text-brand-900 hover:bg-brand-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-slate-200 bg-white text-slate-700 hover:bg-brand-50",
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
