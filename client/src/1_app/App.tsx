import { ThemeProvider } from "@/4_shared/ThemProvider"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/4_shared/components/ui/sheet"
import { Button } from "@/4_shared/components/ui/button"
import Auth from "../2_pages/Auth"
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserStore } from "@/5_api/store/UserStore";
import { ModeToggle } from "@/4_shared/ThemeModeButton";
import Welcome from "@/2_pages/Welcome";
import SideLists from "@/3_widgets/SideLists";
import CreatePage from "@/2_pages/MakeNewPage";

function App() {

  const userName = UserStore((s) => s.name);
  const userPer = UserStore((s) => s.permission);
  const navigate = useNavigate();

  const navToCreate = () => navigate('/newpage');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-screen flex justify-center items-center relative">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/welcome" element={<Welcome permission="unlogin" />} />
          <Route path="/welcome/:id" element={<Welcome permission={userPer} />} />
          <Route path="/newpage" element={<CreatePage />} />
        </Routes>


        <div className="absolute top-3 left-12 my-0.5">
          <ModeToggle></ModeToggle>
        </div>
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button className="absolute top-3 left-3 text-xl" variant={"link"}>
              ☰
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-64">
            <SheetHeader>
              <SheetTitle>List of Page</SheetTitle>
              <div className="h-3"></div>
              <SheetDescription className={`px-2 py-2 pb-3 flex flex-row justify-between rounded-lg border-2`}>
                <div className="w-1/2">
                  <p>name: </p>
                  <p className="text-center">{userPer !== 'unlogin' ? `${userName}` : 'none'}</p>
                </div>
                <div className="w-1/2">
                  <p>permission: </p>
                  <p className="text-center">{userPer !== 'unlogin' ? `${userPer}` : 'none'}</p>
                </div>
              </SheetDescription>
            </SheetHeader>

            <SideLists navToCreate={navToCreate}></SideLists>
          </SheetContent>
        </Sheet>
      </div>
    </ThemeProvider>
  )
}

export default App
