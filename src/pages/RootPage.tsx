import {Outlet} from "react-router-dom";
import CenteredContainer from "../components/CenteredContainer.tsx";

export default function RootPage() {
    return (
        <CenteredContainer>
            <Outlet/>
        </CenteredContainer>
    )
}