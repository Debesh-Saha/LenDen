import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-accent/75 flex items-center justify-center px-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-surface-alt border border-border shadow-xl px-6 py-8">

                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10" />
                <div className="relative">
                    <div className="mb-8 text-center">
                        <div className="text-2xl font-semibold text-text">
                            Welcome Back
                        </div>

                        <div className="mt-1 text-sm text-text-secondary">
                            Sign in to access your wallet
                        </div>
                    </div>

                    <div className="space-y-4">
                        <InputBox label="Username" placeholder="john@example.com" value={username} onChange={(e) => setUsername(e.target.value)}/>

                        <InputBox type="password" label="Password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="mt-6">
                        <Button label="Sign In" variant="primary" size="lg" fullWidth onClick={async () => {
                                try {
                                    const response = await axios.post(
                                        "http://localhost:3000/api/v1/user/signin",
                                        {
                                            username,
                                            password,
                                        }
                                    );

                                    localStorage.setItem(
                                        "token",
                                        response.data.token
                                    );

                                    navigate("/dashboard");
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                        />
                    </div>

                    <div className="mt-6">
                        <BottomWarning label="Don't have an account?" buttonText="Create Account" to="/signup"/>
                    </div>

                </div>
            </div>
        </div>
    );
};