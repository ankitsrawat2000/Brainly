import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    async function signin() {
        setError("");
        setLoading(true);
        
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
    
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            console.log(response.data);
    
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            } else {
                console.error("Token not found in response");
                setError("Signin failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Signin error:", error);
            
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.status === 403) {
                setError("Invalid credentials");
            } else {
                setError("Signin failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <div>
            <Navbar />
            <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
                <div className="bg-white rounded-xl border min-w-48 p-8">
                    <Input ref={usernameRef} placeholder="Username" type="text"/>
                    <Input ref={passwordRef} placeholder="Password" type="password"/>
                    
                    {error && (
                        <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    
                    <div className="flex justify-center pt-4">
                        <Button onClick={signin} variant="primary" text="Signin" fullWidth={true} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
}
