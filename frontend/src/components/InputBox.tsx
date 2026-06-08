import type { ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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

export function InputBox({label, placeholder, value, onChange, type = "text", variant = "default", size = "md", error, disabled = false,}: InputBoxProps) {
    const [showPassword, setShowPassword] = useState(false);
    
    const inputType = type === "password" ? showPassword ? "text" : "password" : type;

    const variantClasses = {
        default: "bg-surface border-2 border-border focus:border-primary",
        filled: "bg-surface-alt border-2 border-transparent focus:border-primary",
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

            <div className="relative">
                <input type={inputType} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} className={`w-full rounded-xl outline-none transition-all duration-200 text-text placeholder:text-text-secondary/70 shadow-sm focus:shadow-md focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${type === "password" ? "pr-12" : ""} ${error ? "border-primary" : ""}`}/>

                {type === "password" && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition hover:bg-primary/10 hover:text-primary">
                        {showPassword ? (<EyeOff size={18} />) : (<Eye size={18} />)}
                    </button>
                )}
            </div>

            {error && (
                <p className="mt-2 text-xs font-medium text-primary">
                    {error}
                </p>
            )}
        </div>
    );
}