import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootPage from "./pages/RootPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {createTheme, PaletteMode, ThemeProvider} from "@mui/material";
import {createContext, useMemo, useState} from "react";

export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

export default function App() {

    const storedTheme = localStorage.getItem("theme") as PaletteMode
    const [mode, setMode] = useState<PaletteMode>(storedTheme || "light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    localStorage.setItem("theme", prevMode === 'light' ? 'dark' : 'light')
                    return (prevMode === 'light' ? 'dark' : 'light');
                });
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={
                    createBrowserRouter(
                        createRoutesFromElements(
                            <Route path="/" element={<RootPage/>}>
                                <Route index element={<HomePage/>}/>
                                <Route path="*" element={<NotFoundPage/>}/>
                            </Route>
                        ), {
                            basename: "/movie-app-frontend/"
                        })
                }/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}