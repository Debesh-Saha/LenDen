import { Link } from "react-router-dom";

type BottomWarningProps = {
    label: string;
    buttonText: string;
    to: string;
};

export function BottomWarning({label, buttonText, to,}: BottomWarningProps) {
    return (
        <div className="flex items-center justify-center gap-1 text-sm text-text-secondary">
            <span>{label}</span>

            <Link to={to} className="font-medium text-primary transition-colors hover:text-primary-hover">
                {buttonText}
            </Link>
        </div>
    );
}