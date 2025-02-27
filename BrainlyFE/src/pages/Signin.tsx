import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Signin(){

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const navigate = useNavigate();

    async function signin(){

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
      
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
           
                username,
                password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        //redirect the user to the dashboard
        navigate("/dashboard");

    }

    return <div>
        <Navbar/>

        <div className="h-screen w-screen bg-gray-200 flex
        justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} placeholder="Username"/>
                <Input reference={passwordRef} placeholder="Password"/>
                <div className="flex justify-center pt-4">
                    <Button onClick={signin} variant="primary" text="Signin" fullWidth={true} loading={false}/>
                </div>
                
            </div>
        </div>
    </div>
}