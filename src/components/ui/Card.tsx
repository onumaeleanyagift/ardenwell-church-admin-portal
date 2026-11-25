import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;