import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";

export function Signup(){
    
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function signup() {
        setError("");
        setLoading(true);
        
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
    
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            console.log(response.data);
    
            navigate("/signin");
        } catch (error: any) {
            console.error("Signup error:", error);
            
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.status === 411) {
                setError("User already exists");
            } else {
                setError("Signup failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }


    return <div>
        <Navbar/>

        <div className="h-screen w-screen bg-gray-200 flex
        justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username" type="text"/>
            <Input ref={passwordRef} placeholder="Password" type="password"/>
            
            {error && (
                <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
                <div className="flex justify-center pt-4">
                    <Button onClick={signup} variant="primary" text="Signup" fullWidth={true} loading={loading}/>
                </div>
                
            </div>
        </div>
    </div> 
}