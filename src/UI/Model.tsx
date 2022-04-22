import React from "react";
import ReactDOM from "react-dom";

import classes from "./Model.module.css";

const Backdrop: React.FC<{ hideModel: () => void; }> = (props) => {
    return <div className={classes.backdrop} onClick={props.hideModel}></div>;
};

const ModelOverlay: React.FC<{ children: React.ReactNode }> = (props) => {
    return <div className={classes.modal}>{props.children}</div>;
};

const Model: React.FC<{ children: React.ReactNode; hideModel: () => void }> = (
    props
) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop hideModel={props.hideModel}/>,
                document.getElementById("backdrop-root")!
            )}
            {ReactDOM.createPortal(
                <ModelOverlay>{props.children}</ModelOverlay>,
                document.getElementById("overlay-root")!
            )}
        </>
    );
};

export default Model;
