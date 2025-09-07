import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { Button } from "./Button";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    
    const isSharePage = location.pathname.startsWith("/share/");

    return (
        <div className={`h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
            <button
                onClick={onClose}
                className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
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
