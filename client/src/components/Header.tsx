import { SideBarContainer, SideBarHeader, SideBarContent, Br, DropDownMenu, DropDownTrigger, DropDownItem, Button } from "@/components/ui"
import { Sun, Moon } from "lucide-react"
import { ThemeStore } from "@/api/store/themeStore"
import { useState } from "react"
import { useUserStore } from "@/api/store/userStore"
import { shallow } from "zustand/shallow"
import { useNavigate } from "react-router-dom"

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { name, KKEUJEOK, isSignedIn } = useUserStore(state => ({
    name: state.name,
    KKEUJEOK: state.KKEUJEOK,
    isSignedIn: state.isSignedIn
  }), shallow)

  const theme = ThemeStore(state => state.theme)
  const setTheme = ThemeStore(state => state.setTheme)

  const navigate = useNavigate()

  return (
    <div className="relative">
      <div className="absolute top-0 left-0">
        <SideBarContainer isOpen={isSidebarOpen}>
          <SideBarHeader>
            <div className="flex items-center justify-between flex-row">
              <button className="text-2xl font-bold" onClick={() => navigate('/')}>G</button>
              <button onClick={toggleSidebar} className={`menu-trigger p-3 ${isSidebarOpen ? 'inline-block' : 'hidden'}`}>
                <span className={`bar ${isSidebarOpen ? 'inline-block' : 'hidden'} ${theme === 'light' ? 'bg-dark-500' : 'bg-white-500'}`}></span>
                <span className={`bar ${isSidebarOpen ? 'inline-block' : 'hidden'} ${theme === 'light' ? 'bg-dark-500' : 'bg-white-500'}`}></span>
                <span className={`bar ${isSidebarOpen ? 'inline-block' : 'hidden'} ${theme === 'light' ? 'bg-dark-500' : 'bg-white-500'}`}></span>
              </button>
            </div>
          </SideBarHeader>
          <SideBarHeader>
            {isSignedIn ? (
              <div>
                <h1>{name}'s {KKEUJEOK}</h1>
              </div>
            ) : (
              <div className="text-center">
                <Br className="h-3" />
                <h1>Please sign in</h1>
              </div>
            )}
          </SideBarHeader>
          <SideBarContent>
            <Br />
          </SideBarContent>
        </SideBarContainer>

        <button onClick={toggleSidebar} className={`menu-trigger-1 p-3 m-3 ${isSidebarOpen ? 'hidden opacity-0' : 'inline-block opacity-100'} transition-all duration-500`}>
          <span className={`bar ${isSidebarOpen ? 'hidden' : 'inline-block'} ${theme === 'light' ? 'bg-dark-500' : 'bg-white-500'}`}></span>
          <span className={`bar ${isSidebarOpen ? 'hidden' : 'inline-block'} ${theme === 'light' ? 'bg-dark-500' : 'bg-white-500'}`}></span>
          <span className={`bar ${isSidebarOpen ? 'hidden' : 'inline-block'} ${theme === 'light' ? 'bg-dark-500' : 'bg-white-500'}`}></span>
        </button>
      </div>

      <DropDownMenu className="absolute top-0 right-0 m-3 transition-all duration-100" isTheme={true} width="4">
        <DropDownTrigger>
          <Button className={`w-12 h-12 flex items-center justify-center pl-5 ${theme === 'light' ? 'bg-more-less-white' : 'bg-bright-dark'}`}>
            {theme === 'light' ? (
              <Sun className="w-[2rem] rotate-0 scale-150 transition-all" />
            ) : (
              <Moon className="absolute w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
          </Button>
        </DropDownTrigger>
        <DropDownItem >
          <Button onClick={() => setTheme('light')} className={`border-0 border-none shadow-none hover:shadow-none ${theme === 'light' ? 'bg-white-100' : 'bg-dark-600'}`}>Light</Button>
        </DropDownItem>
        <DropDownItem className={`border-b-1 ${theme === 'light' ? 'border-dark' : 'border-white'} mx-2 br-ddi`}> </DropDownItem>
        <DropDownItem>
          <Button onClick={() => setTheme('dark')} className={`border-0 border-none shadow-none hover:shadow-none ${theme === 'light' ? 'bg-white-100' : 'bg-dark-600'}`}>Dark</Button>
        </DropDownItem>
      </DropDownMenu>
    </div>
  )
}