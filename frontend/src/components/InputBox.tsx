import type { ChangeEvent } from "react";

type InputBoxProps = {
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "email" | "password" | "number";
    variant?: "default" | "filled";
    size?: "sm" | "md" | "lg";
    error?: string;
    disabled?: boolean;
};

export function InputBox({label, placeholder, value, onChange, type = "text", variant = "default",
size = "md", error, disabled = false,}: InputBoxProps) {
    const variantClasses = {
        default: "bg-surface border-2 border-border focus:border-primary",
        filled:"bg-surface-alt border-2 border-transparent focus:border-primary",
    };

    const sizeClasses = {
        sm: "h-11 px-4 text-sm",
        md: "h-12 px-4 text-sm",
        lg: "h-14 px-5 text-base",
    };

    return (
        <div className="w-full">
            <label className="mb-2 block text-sm font-semibold text-text select-none">
                {label}
            </label>

            <input type={type} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} className={`w-full rounded-xl outline-none transition-all duration-200 text-text placeholder:text-text-secondary/70 shadow-sm focus:shadow-md focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${error ? "border-primary" : ""}`}/>

            {error && (
                <p className="mt-2 text-xs font-medium text-primary">
                    {error}
                </p>
            )}
        </div>
    );
}