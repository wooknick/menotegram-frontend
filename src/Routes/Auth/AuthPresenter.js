import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Box = styled.div`
    ${props => props.theme.whiteBox}
    border-radius:0px;
    width: 100%;
    max-width: 350px;
`;

const StateChanger = styled(Box)`
    text-align: center;
    padding: 20px 0px;
`;

const Link = styled.span`
    color: ${props => props.theme.blueColor};
    cursor: pointer;
`;

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    form {
        width: 100%;
        input {
            width: 100%;
            &:not(:last-child) {
                margin-bottom: 7px;
            }
        }
        button {
            margin-top: 10px;
        }
    }
`;

export default ({ action, setAction, username, firstName, lastName, email, secret, onSubmit }) => (
    <Wrapper>
        <Form>
            {action === "login" && (
                <>
                    <Helmet>
                        <title>Login | Menotegram</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"Email"} {...email} type="email" />
                        <Button text={"Login"} />
                    </form>
                </>
            )}
            {action === "signUp" && (
                <>
                    <Helmet>
                        <title>Sign Up | Menotegram</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"First Name"} {...firstName} />
                        <Input placeholder={"Last Name"} {...lastName} />
                        <Input placeholder={"Email"} {...email} type="email" />
                        <Input placeholder={"Username"} {...username} />
                        <Button text={"Sign Up"} />
                    </form>
                </>
            )}
            {action === "confirm" && (
                <>
                    <Helmet>
                        <title>Confrim Secret | Menotegram</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder="Paste your secret" required {...secret} />
                        <Button text={"Confirm"} />
                    </form>
                </>
            )}
        </Form>
        {action !== "confirm" && (
            <StateChanger>
                {action === "login" ? (
                    <>
                        Don't have an account?
                        <Link onClick={() => setAction("signUp")}>Sign up</Link>
                    </>
                ) : (
                    <>
                        Have an account? <Link onClick={() => setAction("login")}>Log in</Link>
                    </>
                )}
            </StateChanger>
        )}
    </Wrapper>
);
