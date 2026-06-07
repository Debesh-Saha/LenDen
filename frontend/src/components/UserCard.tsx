import { Button } from "./Button";

type UserType = {
    _id: number;
    firstName: string;
    lastName: string;
};

type UserCardProps = {
    user: UserType;
    onSend: (user: UserType) => void;
};

export const UserCard = ({
    user,
    onSend,
}: UserCardProps) => {
    return (
        <div className="px-2 py-3 mx-2 flex items-center justify-between rounded-lg bg-primary transition select-none">

            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-alt/20 text-lg font-semibold text-white">
                    {user.firstName[0]}
                </div>

                <div>
                    <p className="font-semibold text-white">
                        {user.firstName} {user.lastName}
                    </p>

                    <p className="text-sm font-medium text-white/80">
                        Send money instantly
                    </p>
                </div>
            </div>

            <Button label="Send" variant="surface" size="md" fullWidth={false} onClick={() => onSend(user)}/>
        </div>
    );
};