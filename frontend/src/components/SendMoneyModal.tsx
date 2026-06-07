import { Button } from "./Button";
import { X } from "lucide-react";
type UserType = {
    _id: number;
    firstName: string;
    lastName: string;
};

type SendMoneyModalProps = {
    user: UserType;
    onClose: () => void;
};

export const SendMoneyModal = ({
    user,
    onClose,
}: SendMoneyModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[1px] p-4" onClick={onClose}>

            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-surface-alt shadow-xl">
                <div className="bg-primary px-6 py-5 flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold text-white">
                            Send Money
                        </div>

                        <div className="text-sm text-white/80">
                            Transfer money securely
                        </div>
                    </div>

                    <button onClick={onClose} className="text-xl text-white/80 hover:text-white transition">
                        <X />     
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white select-none">
                            {user.firstName[0]}
                        </div>

                        <div>
                            <div className="text-xs uppercase tracking-wider text-text-secondary">
                                Recipient
                            </div>

                            <div className="text-xl font-semibold text-text">
                                {user.firstName} {user.lastName}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <label htmlFor="amount" className="mb-2 block text-base font-medium text-text">
                            Amount
                        </label>

                        <input id="amount" type="number" placeholder="Enter amount" className="w-full rounded-xl border-2 border-primary/90 bg-surface px-4 py-3 text-md text-text outline-none"
                        />
                    </div>

                    <div className="mt-8">
                        <Button label="Send Money" variant="primary" fullWidth/>
                    </div>

                </div>
            </div>
        </div>
    );
};