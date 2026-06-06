import { useState } from "react";
import { UserCard } from "./UserCard";

export const Users = () => {
    const [users] = useState([
        {
            firstName: "Debesh",
            lastName: "Saha",
            _id: 1,
        }, {
            firstName: "Monkey D",
            lastName: "Luffy",
            _id: 2,
        }
    ]);

    return (
        <div className="mt-1 pb-2 mx-2 bg-accent/70 rounded-lg ">
            <div className="text-xl font-bold px-5 h-12 flex items-center border-b-3 border-text-secondary/40 text-text-secondary select-none">
                Users
            </div>

            <div className="mt-2 px-2">
                <input type="text" placeholder="Search users..." className="w-full rounded-lg bg-surface-alt/65 px-4 py-3 text-text-secondary font-normal placeholder:text-text-secondary outline-none transition"/>
            </div>

            <div className="mt-4 space-y-1">
                {users.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
};