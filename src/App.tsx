import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootPage from "./pages/root/RootPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import GroupPage from "./pages/GroupPage.tsx";
import GroupCreationPage from "./pages/GroupCreationPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {AuthProvider, useAuth} from "./hooks/useAuth.tsx";
import {ThemeSwitchProvider} from "./hooks/useThemeSwitch.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ProfilePage from "./pages/profile/ProfilePage.tsx";

export default function App() {

    return (
        <ThemeSwitchProvider>
            <QueryClientProvider client={new QueryClient()}>
                <AuthProvider>
                    <RouterProvider router={
                        createBrowserRouter(
                            createRoutesFromElements(
                                <Route path="/" element={<RootPage/>}>
                                    <Route index element={<HomePage/>}/>

                                    <Route path="login" element={<LoginPage/>}/>
                                    <Route path="register" element={<RegisterPage/>}/>

                                    <Route path="profile/:id" element={<ProfilePage/>}/>

                                    <Route path="group" element={<GroupPage/>}/>
                                    <Route path="creategroup" element={<GroupCreationPage/>}/>

                                    <Route path="*" element={<NotFoundPage/>}/>
                               </Route>
                        ), {
                            basename: "/movie-app-frontend/"
                        })
                }/>
              </AuthProvider>
          </QueryClientProvider>
        </ThemeSwitchProvider>
    )
}