import React, { useContext, useEffect } from "react";
import { Alert, Badge } from "react-bootstrap";
import SimpleContext from "./../../context/SimpleContext";

const Header = () => {
    console.log("Header.jsx rendered.");

    const context = useContext(SimpleContext);

    const { ajnas, appTitle } = context.state;

    useEffect(() => {
        console.log("Header.jsx useEffect()");
        const timer = setTimeout(() => {
            alert("Data Saved");
        }, 1000);
        return () => {
            console.log("Header.jsx Unmount");
            clearTimeout(timer);
        };
    }, []);

    // useEffect(() => {
    //     console.log("Header.jsx useEffect()");
    //     setTimeout(() => {
    //         alert("Data Saved");
    //     }, 1000);
    // }, [ajnas]);

    let badgeStyle = "";

    if (ajnas.length >= 3) badgeStyle = "success";
    if (ajnas.length <= 2) badgeStyle = "warning";
    if (ajnas.length <= 1) badgeStyle = "danger";

    return (
        // <SimpleContext.Consumer>
        // {context => (
        <div>
            <Alert variant="info">
                <h2>{appTitle}</h2>
            </Alert>
            <Alert variant="light">
                تعداد اجناس{" "}
                <Badge pill variant={badgeStyle}>
                    {ajnas.length}
                </Badge>{" "}
                عدد می باشد
            </Alert>
        </div>
        // )}
        // </SimpleContext.Consumer>
    );
};

export default Header;
