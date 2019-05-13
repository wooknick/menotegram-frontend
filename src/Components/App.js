import React from "react";
import { ThemeProvider } from "styled-components";
import GloabalStyles from "../Styles/GloabalStyles";
import Theme from "../Styles/Theme";

export default () => (
    <ThemeProvider theme={Theme}>
        <GloabalStyles />
    </ThemeProvider>
);
