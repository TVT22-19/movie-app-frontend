import {ReactNode} from "react";

export interface AuthContent {
    getToken: () => string | undefined,
    setToken: (token: string) => void
    isAuthorized: boolean
}

export interface AuthProviderProps {
    children: ReactNode
}

export interface ColorModeContent {
    toggleColorMode: () => void
}

export interface ThemeSwitchProviderProps {
    children: ReactNode
}