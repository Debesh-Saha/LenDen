type ButtonProps = {
    label: string;
    onClick?: () => void;
    variant?: "primary" | "accent" | "surface" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    disabled?: boolean;
};

export function Button({label, onClick, variant = "primary", size = "md", fullWidth, disabled = false,}: ButtonProps) {

    const baseClasses = "rounded-lg font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-b-3 border-text-secondary/30 cursor-pointer";

    const variantClasses = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
        accent: "bg-accent text-white hover:bg-accent-hover shadow-sm",
        surface: "bg-surface text-text border border-border hover:bg-surface-alt",
        ghost: "bg-transparent text-text hover:bg-surface-alt",
    };

    const sizeClasses = {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-6 text-base",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`
                ${baseClasses}
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${fullWidth ? "w-full" : ""}
            `}
        >
            {label}
        </button>
    );
}