import React from "react";
import { ThemeProvider } from "styled-components";
import GloabalStyles from "../Styles/GloabalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";

export default () => (
    <ThemeProvider theme={Theme}>
        <>
            <GloabalStyles />
            <Router isLoggedIn={true} />
        </>
    </ThemeProvider>
);
