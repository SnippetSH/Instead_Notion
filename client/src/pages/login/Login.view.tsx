import { TLoginProps } from "./Login"
import { useState, useEffect } from "react";

export const LoginView = (
  { isSignIn, setIsSignIn, ID, setID, Password, setPassword, Name, setName, handleSignIn }: TLoginProps
) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center transition-all duration-200">
      <div style={{willChange: "transform, border-radius, opacity"}} className="relative w-0.45 h-0.45 rounded-3xl flex overflow-hidden z-5">
        {/* Background div */}
        <div 
          style={{
            transform: isLoaded ? `translateX(${isSignIn ? '50%' : '0'})` : 'translateX(0)',
            transition: 'transform 0.5s ease-in-out, border-radius 0.5s',
          }}
      
          className={`absolute w-full h-full z-10`}
        >
          {
            isSignIn ? (
              <div style={{
                opacity: isLoaded ? (isSignIn ? "1" : "0") : "0",
                transition: "opacity 0.5s ease-in-out",
                transitionDelay: "0.3s",
                WebkitTransition: "opacity 0.5s ease-in-out",
              }} className={` w-1/2 h-full bg-gradient-to-r from-aquablue/95 to-aquamarine/95 rounded-r-3xl rounded-l-4xl`}></div>
            ) : (
              <div style={{
                opacity: isLoaded ? (isSignIn ? "0" : "1") : "0",
                transition: "opacity 0.5s ease-in-out",
                transitionDelay: "0.3s",
                WebkitTransition: "opacity 0.5s ease-in-out",
              }} className={` w-1/2 h-full bg-gradient-to-r from-aquamarine/95 to-aquablue/95 rounded-l-3xl rounded-r-4xl`}></div>
            )
          }
        </div>

        <div style={{
          transition: "opacity 0.5s ease-in-out",
        }} className="relative w-1/2 h-full flex flex-col justify-center items-center z-20">
          {isSignIn ? (
            <div style={{
              opacity: isLoaded ? (isSignIn ? "1" : "0") : "0",
              transition: "opacity 0.5s ease-in-out",
              transitionDelay: "0.3s",
              WebkitTransition: "opacity 0.5s ease-in-out",
            }} className={`w-full h-full flex flex-col justify-center items-center`}>
              <h1 className="text-2xl font-bold cn-font">Sign In</h1>
              {/* Sign In Form */}
              <div className="my-5"></div>
              <div className="id-pass cn-font my-3.5">
                <input required type="text" className="in" value={ID} onChange={(e) => setID(e.target.value)} />
                <label className="in-label">ID</label>
                <span className="in-span"></span>
              </div>
              <div className="id-pass cn-font my-3.5">
                <input required type="password" onKeyDown={(e) => handleSignIn(e)} className="in" value={Password} onChange={(e) => setPassword(e.target.value)} />
                <label className="in-label">Password</label>
                <span className="in-span"></span>
              </div>
              <button className="text-gray-600/65 text-xs mt-2 mb-4 cn-font">
                Forgot Your Password?
              </button>
              <button onClick={() => handleSignIn()} className="bg-aquamarine/95 text-white px-10 py-2 pt-3 rounded-lg cn-font hover:bg-aquamarine/75 border-1 border-darkaquamarine/65 hover:border-darkaquamarine">
                SIGN IN
              </button>
            </div>
          ) : (
            <div style={{
              opacity: isLoaded ? (isSignIn ? "0" : "1") : "0",
              transition: "opacity 0.5s ease-in-out",
              WebkitTransition: "opacity 0.5s ease-in-out",
              transitionDelay: "0.3s",
            }} className={`w-full h-full flex flex-col justify-center items-center`}>
              <h1 className="text-3xl font-bold cn-font text-white">Welcome Back!</h1>
              <div className="my-3"></div>
              <p className="text-white text-center text-sm cn-font">
                Enter your personal details<br /> and start journey with us
              </p>
              <button onClick={() => setIsSignIn(true)} className="text-white px-10 py-2 pt-3 my-5 border-1 border-white rounded-lg cn-font hover:bg-white/70 hover:text-black/80">
                SIGN IN
              </button>
            </div>
          )}
        </div>
        <div className="relative w-1/2 h-full flex flex-col justify-center items-center z-20">
          {isSignIn ? (
            <div style={{
              opacity: isLoaded ? (isSignIn ? "1" : "0") : "0",
              transition: "opacity 0.5s ease-in-out",
              WebkitTransition: "opacity 0.5s ease-in-out",
              transitionDelay: "0.3s",
            }} className={`w-full h-full flex flex-col justify-center items-center`}>
              <h1 className="text-3xl font-bold cn-font text-white">Hello, Friend!</h1>
              <div className="my-3"></div>
              <p className="text-white text-center text-sm cn-font">
                Register with your personal info and<br /> start journey with us
              </p>
              <button onClick={() => setIsSignIn(false)} className="text-white px-10 py-2 pt-3 my-5 border-1 border-white rounded-lg cn-font hover:bg-white/70 hover:text-black/80">
                SIGN UP
              </button>
            </div>
          ) : (
            <div style={{
              opacity: isLoaded ? (isSignIn ? "0" : "1") : "0",
              transition: "opacity 0.5s ease-in-out",
              WebkitTransition: "opacity 0.5s ease-in-out",
              transitionDelay: "0.3s",
            }} className={`w-full h-full flex flex-col justify-center items-center trans-opacity`}>
              <h1 className="text-2xl font-bold cn-font">Create Account</h1>
              <div className="my-5"></div>
              <div className="id-pass cn-font my-3.5">
                <input required type="text" className="in" value={Name} onChange={(e) => setName(e.target.value)} />
                <label className="in-label">Name</label>
                <span className="in-span"></span>
              </div>
              <div className="id-pass cn-font my-3.5">
                <input required type="text" className="in" value={ID} onChange={(e) => setID(e.target.value)} />
                <label className="in-label">ID</label>
                <span className="in-span"></span>
              </div>
              <div className="id-pass cn-font my-3.5">
                <input required type="password" className="in" value={Password} onChange={(e) => setPassword(e.target.value)} />
                <label className="in-label">Password</label>
                <span className="in-span"></span>
              </div>
              <div className="my-2"></div>
              <button className="bg-aquamarine/95 text-white px-10 py-2 pt-3 rounded-lg cn-font hover:bg-aquamarine/75 border-1 border-darkaquamarine/65 hover:border-darkaquamarine">
                SIGN UP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}