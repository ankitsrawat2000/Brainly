import { Logo } from "../icons/Logo";
export function Navbar(){

    return <div>
        <div className="fixed w-full top-0 bg-white flex text-2xl py-4 items-center shadow">
                    <div className="pr-2 pl-2 text-purple-600">
                            <Logo/>
                    </div>
                        Brainly
                </div>
    </div>
}