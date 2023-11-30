import {createContext, useContext, useState} from "react";
import {AuthContent, AuthProviderProps} from "./types";

const AuthContext = createContext<AuthContent>({
    getToken(): string | undefined {
        return undefined;
    },
    setToken(token: string): void {
    },
    isAuthorized: false
});

export const AuthProvider = (props: AuthProviderProps) => {

    const [_token, _setToken] = useState(localStorage.getItem("token") || "");

    const isAuthorized = !(!getToken() || getToken() === "");

    function setToken(token: string) {
        _setToken(token)
        localStorage.setItem("token", token)
    }

    function getToken(): string | undefined {
        return _token
    }

    return (
        <AuthContext.Provider value={{getToken, setToken, isAuthorized}}>
            {props.children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);