import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CenteredContainer from "../components/CenteredContainer.tsx";

export default function NotFoundPage() {

    const location = useLocation()
    const [currentPath, setCurrentPath] = useState("")

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    return (
        <CenteredContainer>
            <h1>404 - Page not found :(</h1>
            <h3>Path: {currentPath}</h3>
        </CenteredContainer>
    )
}