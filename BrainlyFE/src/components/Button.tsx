import { ReactElement } from "react";

interface ButtonProps{//To assign a type to the ButtonProps object, you can use interfaces

    variant: "primary" | "secondary",
    text: string,
    startIcon?: ReactElement,
    onClick?: () => void,
    fullWidth?: boolean,
    loading?: boolean
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-400"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"
//items-center vertically, justify-center horizontally

export function Button({variant, text, startIcon, onClick,
    fullWidth, loading}: ButtonProps){//destructure props var, text, startIcon

    return <button onClick={onClick} className={variantClasses[variant]+" " +
    defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} 
    ${loading ? "opacity-45 " : ""}`} disabled={loading}>
       <div className="pr-2">
            {startIcon}
       </div>
        {text}
    </button>
}