import { InputForm } from "@/3_widgets/Form";
import { Button } from "@/4_shared/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/4_shared/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/4_shared/components/ui/card";
import { UserStore } from "@/5_api/store/UserStore";
import { useNavigate } from "react-router-dom";

export default function Auth() {

  const setUser = UserStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleGuest = () => {
    setUser({name: 'guest', key: '0', permission: 'guest'});
    navigate('/welcome/@guest');
  }

  return (
    <div className="w-96">
      <Tabs defaultValue="account">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="guest">Guest</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="h-80">
            <CardHeader className="h-1/3">
              <CardTitle className="mt-1">Account</CardTitle>
              <CardDescription>If you already have an account, Login with your name and key.</CardDescription>
            </CardHeader>
            <CardContent className="h-2/3">
              <InputForm></InputForm>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="guest">
          <Card className="h-80">
            <CardHeader className="h-1/3">
              <CardTitle>Guest</CardTitle>
              <CardDescription>If you want to make an account, please contact @SnippetSH.io with email gccs457@naver.com</CardDescription>
            </CardHeader>
            <CardContent className="h-1/2">
              <div className="h-full flex flex-col justify-evenly">
                <p>Login with a Guest</p>
                <Button onClick={handleGuest} variant={"secondary"} className="w-fit text-center h-10">Guest</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}