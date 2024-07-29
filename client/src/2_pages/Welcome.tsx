import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/4_shared/components/ui/button";


export default function Welcome({permission}: {permission: 'guest' | 'user' | 'admin' | 'unlogin'}) {
    const navigate = useNavigate();
    const {id} = useParams();

    if(permission === "unlogin") {
        return (
            <div className="w-screen h-screen relative flex flex-col justify-center items-center">
                <h1 className="text-3xl tracking-tight font-extrabold py-3 border-b-2">Welcome to Simple S-Page</h1>
                <p>Please Login First</p>
                <Button onClick={() => navigate('/')} variant="default">Login</Button>
                <p className="h-2/5"></p>
            </div>
        )
    }
    
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-1/4 h-full relative flex flex-col justify-center items-center"> 
                <h1 className="text-3xl tracking-tight font-extrabold py-3 border-b-2">Welcome to Simple S-Page</h1>
                <p> Your name: {id}</p>
                <p> Your permission: {permission}</p>
                <p className="h-2/5 leading-7 [&:not(:first-child)]:mt-6">
                    If you want to make a new Page, open the menu, and just make a new page and write down your own.
                </p>
                <button onClick={() => navigate('/')}>바봉</button>
            </div>
        </div>
    )
}