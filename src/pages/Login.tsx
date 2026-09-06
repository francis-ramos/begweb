import { useState } from "react"
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function Authorize() {
        if (username.length < 5 || password.length < 5) {
            alert('Invalid entry');
            setUsername('');
            setPassword('');
            return;
        }
        
        const response = await fetch("/authorize", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, type: 'authorize' })
        });

        setUsername('');
        setPassword('');

        if (!response.ok) {
            const { message } = await response.json();
            alert(message);
        }

        return navigate('/');
    }

    return (
        <div className="m-50 text-center place-items-center">
            <div className="text-9xl">Login</div>
            <p className="my-4 text-xl">Are you a new user? <a className="text-blue-300" href="/create">Create Here</a></p>
            <div className="w-100">
                <p className="text-left">Username:</p>
                <input 
                    className="rounded-md px-2 text-center w-full border-4 border-white" 
                    value={username} 
                    type="text" 
                    placeholder="John Doe" 
                    onChange={(e) => {setUsername(e.target.value)
                }}/>
                
                <p className="text-left">Password:</p>
                <input 
                    className="rounded-md px-2 text-center w-full border-4 border-white" 
                    value={password} 
                    type="password" 
                    placeholder="123" 
                    onChange={(e) => {setPassword(e.target.value)
                }}/>

                <div 
                    className={
                        cn(
                            "my-4 py-2 px-5 w-1/2 border-2 border-white rounded-md mx-auto",
                            "hover:text-green-200",
                            "hover:border-green-200"
                        )
                    }
                    onClick={Authorize}
                >
                    Login
                </div>
            </div>
        </div>
    )
}