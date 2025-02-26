import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup(){
    
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup(){

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
           
                username,
                password
        })
        navigate("/signin");

        alert("user sign up")


    }


    return <div className="h-screen w-screen bg-gray-200 flex
    justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username"/>
            <Input reference={passwordRef} placeholder="Password"/>
            <div className="flex justify-center pt-4">
                <Button onClick={signup} variant="primary" text="Signup" fullWidth={true} loading={false}/>
            </div>
            
        </div>
    </div>
}