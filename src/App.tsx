import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootPage from "./pages/RootPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

export default function App() {
    return (
        <RouterProvider router={
            createBrowserRouter(
                createRoutesFromElements(
                    <Route path="/" element={<RootPage/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Route>
                )
            )
        }/>
    )
}