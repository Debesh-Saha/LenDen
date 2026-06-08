import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-accent/75 flex items-center justify-center px-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-surface-alt border border-border shadow-xl px-6 py-8">

                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10" />
                
                <div className="relative">
                    <div className="mb-8 text-center">
                        <div className="text-2xl font-semibold">
                            Create Account
                        </div>

                        <div className="mt-1 text-sm text-text-secondary">
                            Join your digital wallet in seconds
                        </div>
                    </div>

                    <div className="space-y-4">
                        <InputBox label="First Name" placeholder="John" onChange={(e) => setFirstName(e.target.value)}/>

                        <InputBox label="Last Name" placeholder="Doe" onChange={(e) => setLastName(e.target.value)}/>

                        <InputBox label="Username" placeholder="john@example.com" onChange={(e) => setUsername(e.target.value)}/>

                        <InputBox type="password" label="Password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="mt-6">
                        <Button label="Create Account" variant="primary" size="lg" fullWidth
                            onClick={async () => {
                                const response = await axios.post(
                                    "http://localhost:3000/api/v1/user/signup",
                                    {
                                        username,
                                        firstName,
                                        lastName,
                                        password,
                                    }
                                );

                                localStorage.setItem(
                                    "token",
                                    response.data.token
                                );

                                navigate("/dashboard");
                            }}
                        />
                    </div>

                    <div className="mt-6">
                        <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin"/>
                    </div>
                </div>
            </div>
        </div>
    );
};