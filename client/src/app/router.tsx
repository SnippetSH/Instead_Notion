import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { Home, Login, MakePage } from "@/pages";
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="w-full h-full"> {/* 이 줄 추가 */}
        <TransitionGroup className="w-full h-full">
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={300}
          >
            <Outlet />
          </CSSTransition>
        </TransitionGroup>
      </div> {/* 이 줄 추가 */}
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/makePage',
        element: <MakePage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);