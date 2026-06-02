import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type BalanceProps = {
    value: number;
};

export const Balance = ({ value }: BalanceProps) => {
    const [showBalance, setShowBalance] = useState(true);

    return (
        <div className="h-20 px-5 mx-2 mt-1 rounded-lg flex items-center justify-between bg-primary border-b-3 border-text-secondary/30">
            
            <div>
                <div className="text-xs font-medium text-white/80 uppercase tracking-wide">
                    Available Balance
                </div>

                <div className="text-2xl font-bold text-white mt-1">
                    {showBalance
                        ? `₹ ${value.toLocaleString("en-IN")}`
                        : "₹ ••••••"}
                </div>

            </div>

            <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-full hover:bg-white/10 transition"
            >
                {showBalance ? (
                    <EyeOff size={20} className="text-white/80" />
                ) : (
                    <Eye size={20} className="text-white/80" />
                )}
            </button>
        </div>
    );
};