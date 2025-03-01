import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signin() {
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
            }
        } catch (error) {
            console.error("Signin error:", error);
        }
    }
    

    return (
        <div>
            <Navbar />
            <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
                <div className="bg-white rounded-xl border min-w-48 p-8">
                    <Input ref={usernameRef} placeholder="Username" type="text"/>
                    <Input ref={passwordRef} placeholder="Password" type="password"/>
                    <div className="flex justify-center pt-4">
                        <Button onClick={signin} variant="primary" text="Signin" fullWidth={true} loading={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
