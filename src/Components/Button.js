import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
    width: ${props => {
        if (props.width === undefined) {
            return "100%;";
        } else {
            return `${props.width};`;
        }
    }};
    border: 0;
    border-radius: ${props => props.theme.borderRadius};
    color: white;
    font-weight: 600;
    background-color: ${props => props.theme.blueColor};
    text-align: center;
    padding: 7px 0px;
    font-size: 14px;
`;

const Button = ({ width, className, text, onClick }) => (
    <Container width={width} className={className} onClick={onClick}>
        {text}
    </Container>
);

Button.propTypes = {
    text: PropTypes.string.isRequired
};

export default Button;
