import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

function Textarea({
  label,
  error,
  id,
  required,
  className = "",
  wrapperClassName = "",
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;

  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : ariaDescribedBy}
        className={`w-full resize-y rounded-lg border px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-100"
            : "border-slate-200"
        } ${className}`}
        {...props}
      />

      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Textarea;
