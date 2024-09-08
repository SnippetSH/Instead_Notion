import { HomeView } from "./Home.view"
import { useUserStore } from "@/api/store/userStore"
import { shallow } from "zustand/shallow"
import { useNavigate } from "react-router-dom"
import { useLayoutEffect } from "react"
import axios from "axios"

export const Home = () => {

    const navigate = useNavigate()
    const { name, KKEUJEOK, isSignedIn, setUser } = useUserStore(state => ({
        name: state.name,
        KKEUJEOK: state.KKEUJEOK,
        isSignedIn: state.isSignedIn,
        setUser: state.setUser
    }), shallow)

    const newPage = () => {
        navigate('/makepage')
    }

    const browsePage = () => {
        navigate('/browsepage')
    }

    const setNullUser = () => {
        setUser({
            name: "",
            KKEUJEOK: "",
            session: "",
            isSignedIn: false
        })
    }

    const checkSessionID = async () => {
        const user = localStorage.getItem("user")
        let session_id = ""
        if (user !== null) {
            const parse = JSON.parse(user)
            session_id = parse.session_id
        }
        await axios.get("http://localhost:7575/api/valid-session-id", {
            headers: {
                "session_id": session_id
            }
        }).then((res) => {
            if (res.data.success === "true") {
                setUser({
                    name: res.data.user,
                    KKEUJEOK: 'TODO',
                    session: res.data.session_id,
                    isSignedIn: true
                })
            }
        }).catch(() => {
            setNullUser()
        })   
    }

    useLayoutEffect(() => {
        const user = localStorage.getItem("user")
        console.log(user)
        if (user === null) {
            setNullUser();
            return;
        } 

        const { session_id } = JSON.parse(user)
        if (session_id === "" || session_id === null) {
            setNullUser();
            return;
        }

        checkSessionID();
    }, [])

    return (
        <HomeView name={name} KKEUJEOK={KKEUJEOK} isSignedIn={isSignedIn} newPage={newPage} browsePage={browsePage}/>
    )
}

export interface HomeProps {
    name: string;
    KKEUJEOK: string;
    isSignedIn: boolean;
    newPage: () => void;
    browsePage: () => void;
}
