import { HomeView } from "./Home.view"
import { useUserStore } from "@/api/store/userStore"
import { shallow } from "zustand/shallow"
import { useNavigate } from "react-router-dom"

export const Home = () => {

    const navigate = useNavigate()
    const { name, KKEUJEOK, isSignedIn } = useUserStore(state => ({
        name: state.name,
        KKEUJEOK: state.KKEUJEOK,
        isSignedIn: state.isSignedIn
    }), shallow)

    const newPage = () => {
        navigate('/makepage')
    }

    const browsePage = () => {
        navigate('/browsepage')
    }

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
