import { useRef } from "react";
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

    async function signup(){

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
           
                username,
                password
        },{withCredentials: true,
            headers: {
                "Content-Type": "application/json",
              },
        })
        navigate("/signin");

        alert("user sign up")


    }


    return <div>
        <Navbar/>

        <div className="h-screen w-screen bg-gray-200 flex
        justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username" type="text"/>
            <Input ref={passwordRef} placeholder="Password" type="password"/>
                <div className="flex justify-center pt-4">
                    <Button onClick={signup} variant="primary" text="Signup" fullWidth={true} loading={false}/>
                </div>
                
            </div>
        </div>
    </div> 
}