import { useId } from "react";
import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  wrapperClassName?: string;
}

function Select({
  label,
  error,
  options,
  placeholder = "Select an option",
  id,
  required,
  className = "",
  wrapperClassName = "",
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <select
        id={selectId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : ariaDescribedBy}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-100"
            : "border-slate-200"
        } ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;
