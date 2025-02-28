import { Button } from "./Button";


export function Logout(){

    return <div>
        <Button onClick={()=>{localStorage.clear();
        window.location.href = '/'}} variant="primary" text="Logout"  loading={false}/>
    </div>
}