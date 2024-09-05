import { TLoginProps } from "./Login"
import { Input, Br, Button } from "@/components/ui";
import { ThemeStore } from "@/api/store/themeStore";


export const LoginView = (
  { isSignIn, setIsSignIn, ID, setID, Password, setPassword, Name, setName }: TLoginProps
) => {
  const theme = ThemeStore(state => state.theme);

  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <div className={`container ${isSignIn ? '' : 'right-panel-active'}`}>
        <div className="form-container sign-up-container">
          <form action="#" className="h-full flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">Create Account</h1>
            <Br />
            <Input required label="Name" value={Name} onChange={(e) => setName(e.target.value)} />
            <Input required label="ID" value={ID} onChange={(e) => setID(e.target.value)} />
            <Input required label="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
            <Button>Sign Up</Button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" className="h-full flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">Sign in</h1>
            <Br />
            <Input required label="ID" value={ID} onChange={(e) => setID(e.target.value)} />
            <Input required label="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
            <Button>Sign In</Button>
          </form>
        </div>
        <div className="overlay-container">
          <div 
            className="overlay"
            style={{
              background: theme === 'light' ? 'linear-gradient(to right, #87C0C9, #87C9BA)' : 'linear-gradient(to right, #2D92A1, #2DA186)',
              color: theme === 'light' ? '#222222' : '#FFFAF0'
            }}
          >
            <div className="overlay-panel overlay-left">
              <h1 className="font-bold text-2xl">Welcome Back!</h1>
              <Br style={{ height: '0.9rem'}} />
              <p>To keep connected with us please login with your personal info</p>
              <Br style={{ height: '2rem'}}/>
              <Button className={`bg-white-400 text-dark-800 shadow-none`} onClick={() => setIsSignIn(true)}>Sign In</Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold text-2xl">Hello, Friend!</h1>
              <Br style={{ height: '0.9rem'}} />
              <p>Enter your personal details and start journey with us</p>
              <Br style={{ height: '2rem'}}/>
              <Button className={`bg-white-400 text-dark-800 shadow-none`} onClick={() => setIsSignIn(false)}>Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}