import React from "react";
import styled from "styled-components";
import Button from "../Button";

const EButton = styled(Button)`
    width: ${props => props.width};
`;

export default ({ width, isFollowing, onClick }) => (
    <EButton width={width} text={isFollowing ? "Unfollow" : "Follow"} onClick={onClick} />
);
