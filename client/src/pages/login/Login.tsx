import { LoginView } from "./Login.view";
import { useLayoutEffect, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/api/store/userStore";

export const Login = () => {
    const isSignedIn = useUserStore(state => state.isSignedIn);
    const navigate = useNavigate();

    const [isSignIn, setIsSignIn] = useState(true);
    const [ID, setID] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");

    useEffect(() => {
        setID("");
        setPassword("");
        setName("");
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignIn]);

    useLayoutEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, []);

    const handleSignIn = (e?: React.KeyboardEvent<HTMLInputElement>) => {
        if (ID === "" || Password === "") {
          return;
        }
    
        if(e && e.key !== "Enter") {
          return;
        }
        // console.log(SERVER_URL);
        // axios.post(`${SERVER_URL}/api/login`, {
        //   id: ID,
        //   password: Password
        // }).then((res) => {
        //   if (res.data.auth === "admin") {
        //     nav("/game");
        //   } else {
        //     nav("/game");
        //   }
        // }).catch((err) => {
        //   console.log(err);
        // });
      };

    return (
        <LoginView isSignIn={isSignIn} setIsSignIn={setIsSignIn} ID={ID} setID={setID} Password={Password} setPassword={setPassword} Name={Name} setName={setName} handleSignIn={handleSignIn} />
    )
}

export interface TLoginProps {
    isSignIn: boolean;
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
    ID: string;
    setID: React.Dispatch<React.SetStateAction<string>>;
    Password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    Name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    handleSignIn: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
}