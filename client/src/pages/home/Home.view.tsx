import { Button, Content, Br } from "@/components/ui"
import { HomeProps } from "./Home"
import { ThemeStore } from "@/api/store/themeStore"
import { useNavigate } from "react-router-dom"

export const HomeView = ({ name, KKEUJEOK, isSignedIn, newPage, browsePage }: HomeProps) => {
  const theme = ThemeStore(state => state.theme)
  const navigate = useNavigate()

  const buttonClass = ``
  const contentClass = `${theme === 'light' ? 'bg-white-600/70' : 'bg-dark-800/50 shadow-white-100/15'} p-10  shadow-lg rounded-lg`
  return (
    <div className="w-full h-full flex items-center justify-center">
      {
        isSignedIn ? (
          <Content className={contentClass}>
            <h1 className="text-3xl font-extrabold mb-8">Welcome to {KKEUJEOK}, {name}!</h1>
            <div className="flex text-center space-x-16 w-0.75 justify-center">
              <div className="flex-col items-center justify-center space-y-3">
                <p className="text-lg">Make New Page</p>
                <Button className={buttonClass} onClick={newPage}>New</Button>
              </div>
              <div className="flex-col items-center justify-evenly space-y-3">
                <p className="text-lg">Browse Pages</p>
                <Button className={buttonClass} onClick={browsePage}>Browse</Button>
              </div>
            </div>
          </Content>
        ) : (
          <Content className={contentClass}>
            <h1 className="text-2xl font-semibold">Welcome!</h1>
            <Br className="h-2" />
            <p className="text-lg">Please sign in to continue.</p>
            <Br />
            <Button onClick={() => navigate('/login')}>Sign In</Button>
          </Content>
        )
      }
    </div>
  )
}