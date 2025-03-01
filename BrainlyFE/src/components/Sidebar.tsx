import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { Button } from "./Button"; // Import your Button component

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Check if current page is a Share page
    const isSharePage = location.pathname.startsWith("/share/");

    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-600">
                    <Logo />
                </div>
                Brainly
            </div>

            <div className="pt-8 pl-4">
                <SidebarItem text="Twitter" icon={<TwitterIcon />} />
                <SidebarItem text="YouTube" icon={<YoutubeIcon />} />
            </div>

            <div className="fixed bottom-0">
                {isSharePage ? (
                    <div className="flex gap-2 p-4">
                        <Button text="Sign In" variant="primary" onClick={() => navigate("/signin")} />
                        <Button text="Sign Up" variant="secondary" onClick={() => navigate("/signup")} />
                    </div>
                ) : ( <div className="flex gap-2 p-4">
                        <Button onClick={()=>{localStorage.clear(); window.location.href = '/'}} variant="primary" text="Logout"  loading={false}/>
                    </div>)}
            </div>
        </div>
    );
}
