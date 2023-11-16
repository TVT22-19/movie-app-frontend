import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootPage from "./pages/root/RootPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {AuthProvider, useAuth} from "./hooks/useAuth.tsx";
import {ThemeSwitchProvider} from "./hooks/useThemeSwitch.tsx";

export default function App() {

    const token = useAuth().getToken()

    return (
        <ThemeSwitchProvider>
            <AuthProvider userToken={token || ""}>
                <RouterProvider router={
                    createBrowserRouter(
                        createRoutesFromElements(
                            <Route path="/" element={<RootPage/>}>
                                <Route index element={<HomePage/>}/>

                                <Route path="login" element={<LoginPage/>}/>
                                <Route path="register" element={<RegisterPage/>}/>

                                <Route path="*" element={<NotFoundPage/>}/>
                            </Route>
                        ), {
                            basename: "/movie-app-frontend/"
                        })
                }/>
            </AuthProvider>
        </ThemeSwitchProvider>
    )
}