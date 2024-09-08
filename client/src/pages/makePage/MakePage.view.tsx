import { Content, InputBlock, Button, Br } from "@/components/ui"
import { MakePageProps } from "./MakePage"
import { useNavigate } from "react-router-dom"


export const MakePageView = ({ isSignedIn }: MakePageProps) => {
  const navigate = useNavigate()
  if(!isSignedIn) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Content>
          <h1 className="text-2xl font-bold">Please sign in to use this feature.</h1>
          <Br className="my-1" />
          <Button onClick={() => navigate('/login')}>Sign in</Button>
        </Content>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Content className="relative" style={{ width: '75%', height: '90%' }}>
        <InputBlock />
        <Button className="absolute top-5 right-5">Save</Button>
      </Content>
    </div>
  )
}