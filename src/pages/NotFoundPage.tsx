import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function NotFoundPage() {

    const location = useLocation()
    const [currentPath, setCurrentPath] = useState("")

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    return (
        <>
            <h1>404 - Page not found :(</h1>
            <h3>Path: {currentPath}</h3>
        </>
    )
}