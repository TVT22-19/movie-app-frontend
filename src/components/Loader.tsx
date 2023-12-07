import CenteredContainer from "./CenteredContainer";
import {CircularProgress} from "@mui/material";
import React from "react";

export function Loader() {
    return (
        <CenteredContainer>
            <CircularProgress/>
        </CenteredContainer>
    )
}