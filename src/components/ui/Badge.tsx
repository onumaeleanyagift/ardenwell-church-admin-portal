import type { HTMLAttributes } from "react";

type BadgeVariant = "success" | "warning" | "danger";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
};

function Badge({ variant, className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
