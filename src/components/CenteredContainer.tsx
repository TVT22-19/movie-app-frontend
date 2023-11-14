import {CentredContainerProps} from "./types";
import {CSSProperties} from "react";

export default function CenteredContainer(props: CentredContainerProps) {

    const containerStyle: CSSProperties = {
        height: "calc(100svh - 64px - 64px)",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div style={containerStyle}>
            {props.children}
        </div>
    )
}