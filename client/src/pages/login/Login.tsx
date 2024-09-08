import { LoginView } from "./Login.view";
import { useLayoutEffect, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/api/store/userStore";
import axios from "axios";

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
        setIsSendCode(false);
        setCode("");
        setIsVerify(false);
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignIn]);

    useLayoutEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, []);

    const [isSendCode, setIsSendCode] = useState(false);
    const [Code, setCode] = useState("");

    const handleSendCode = () => {
        if (ID === "") {
            return;
        }
        
        axios.post("http://localhost:7575/api/send-verification-code", {
            email: ID
        }).then((res) => {
            console.log(res);
            if (res.data.success === true || res.data.success === "true") {
                setIsSendCode(true);
                alert("Verification code sent");
            }
        }).catch((err) => {
            console.log(err);
            if (err.response.data === "Invalid email" || err.response.data === "Invalid request payload") {
                alert("Your email is invalid");
            } else if (err.response.data === "User already exists") {
                alert("User already exists");
            } else if (err.code === "ERR_BAD_RESPONSE") {
                alert("Server error. Please try again later.");
            }
        })
    }

    const handleSignIn = async (e?: React.KeyboardEvent<HTMLInputElement>) => {
        if (ID === "" || Password === "") {
          return;
        }
    
        if(e && e.key !== "Enter") {
          return;
        }
        
        await axios.post("http://localhost:7575/api/login", {
            email: ID,
            password: Password
        }).then((res) => {
            console.log(res);
            if (res.data.success === true || res.data.success === "true") {
                localStorage.setItem("user", JSON.stringify({
                    name: res.data.user,
                    session_id: res.data.session_id
                }));
                navigate("/");
            }
        }).catch((err) => {
            console.log(err);
            if (err.response.data === "Invalid request method\n" || err.response.data === "Invalid request payload\n") {
                alert("Your request is invalid");
            } else if (err.response.data === "User not found\n") {
                alert("User not found");
            } else if (err.response.data === "Invalid password\n") {
                alert("Your password is invalid");
            } else if (err.code === "ERR_BAD_RESPONSE") {
                alert("Server error. Please try again later.");
            }
        })
    };

    const [isVerify, setIsVerify] = useState(false);
    const handleVerify = async () => {
        if (ID === "" || Code === "") {
            return;
        }
        
        await axios.post("http://localhost:7575/api/verify-code", {
            code: Code,
            email: ID
        }).then((res) => {
            console.log(res);
            if (res.data.success === true || res.data.success === "true") {
                setIsVerify(true);
            }
        }).catch((err) => {
            console.log(err);
            if (err.response.data === "Invalid verification code\n" || err.response.data === "Invalid request payload\n") {
                alert("Your verification code is invalid");
            } else if (err.code === "ERR_BAD_RESPONSE") {
                alert("Server error. Please try again later.");
            }
        })
    }

    const handleSignUp = () => {
        if (ID === "" || Password === "" || Name === "" || isVerify === false) {
            return;
        }
        
        axios.post("http://localhost:7575/api/signup", {
            email: ID,
            password: Password,
            name: Name
        }).then((res) => {
            console.log(res);
            if (res.data.success === true || res.data.success === "true") {
                alert("User created");
                localStorage.setItem("user", JSON.stringify({
                    name: res.data.user,
                    session_id: res.data.session_id
                }));
                navigate("/");
            }
        }).catch((err) => {
            console.log(err);
            if (err.response.data === "User already exists\n") {
                alert("User already exists");
            } else if (err.response.data === "User not verified\n") {
                alert("Your email is not verified");
            } else if (err.response.data === "Invalid request payload\n") {
                alert("Your request is invalid");
            } else if (err.code === "ERR_BAD_RESPONSE") {
                alert("Server error. Please try again later.");
            }
        })
    }

    return (
        <LoginView isSignIn={isSignIn} setIsSignIn={setIsSignIn} ID={ID} setID={setID} Password={Password} setPassword={setPassword} Name={Name} setName={setName} handleSignIn={handleSignIn} isSendCode={isSendCode} handleSendCode={handleSendCode} Code={Code} setCode={setCode} isVerify={isVerify} handleVerify={handleVerify} handleSignUp={handleSignUp} />
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
    isSendCode: boolean;
    handleSendCode: () => void;
    Code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    isVerify: boolean;
    handleVerify: () => void;
    handleSignUp: () => void;
}