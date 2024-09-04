import { HomeView } from "./Home.view"
import { useUserStore } from "@/api/store/userStore"
import { shallow } from "zustand/shallow"

export const Home = () => {
    const { name, KKEUJEOK, isSignedIn } = useUserStore(state => ({
        name: state.name,
        KKEUJEOK: state.KKEUJEOK,
        isSignedIn: state.isSignedIn
    }), shallow)

    return (
        <HomeView name={name} KKEUJEOK={KKEUJEOK} isSignedIn={isSignedIn}/>
    )
}

export interface HomeProps {
    name: string;
    KKEUJEOK: string;
    isSignedIn: boolean;
}
