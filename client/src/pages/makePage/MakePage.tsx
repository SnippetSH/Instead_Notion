import { useUserStore } from "@/api/store/userStore"
import { shallow } from "zustand/shallow"
import { MakePageView } from "./MakePage.view"

export const MakePage = () => {
  const { name, KKEUJEOK, isSignedIn } = useUserStore(state => ({
    name: state.name,
    KKEUJEOK: state.KKEUJEOK,
    isSignedIn: state.isSignedIn
  }), shallow)


  return (
    <MakePageView name={name} KKEUJEOK={KKEUJEOK} isSignedIn={isSignedIn} />
  )
}

export interface MakePageProps {
  name: string;
  KKEUJEOK: string;
  isSignedIn: boolean;
}