import React from "react";
import { gql } from "apollo-boost";
import { ThemeProvider } from "styled-components";
import GloabalStyles from "../Styles/GloabalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import { useQuery } from "react-apollo-hooks";

const QUERY = gql`
    {
        isLoggedIn @client
    }
`;
export default () => {
    const {
        data: { isLoggedIn }
    } = useQuery(QUERY);

    return (
        <ThemeProvider theme={Theme}>
            <>
                <GloabalStyles />
                <Router isLoggedIn={isLoggedIn} />
            </>
        </ThemeProvider>
    );
};
