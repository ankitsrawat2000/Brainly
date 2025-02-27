import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

import { Navbar } from "../components/Navbar";

export function Landing(){

    const navigate = useNavigate();


    return <div>
        <Navbar/>
        <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center pt-8">
                <h1 className="md:text-6xl text-4xl font-extrabold text-purple-600  tracking-tighter">
                Store Your Tweets & Videos in One Place
                </h1>
                <p className="md:text-xl text-lg text-purple-600">
                Simple, Secure, and Ready to Share!
                </p>
            </div>
                
            <div className="bg-white rounded-xl border min-w-80 p-8 mt-6">
                <div className="flex justify-center pt-4">
                    <Button onClick={() => {navigate("/signin")}} variant="primary" text="Sign In" fullWidth={true}/>
                </div>
                <div className="flex justify-center pt-4">
                    <Button onClick={() => navigate("/signup")} variant="primary" text="Sign Up" fullWidth={true}/>
                </div>
            </div>
        </div>
        
    </div>
}