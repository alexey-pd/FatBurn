import React from 'react';
import styled from "@emotion/styled";

interface Props {
    text: string,
    onClick: () => void
}

const ButtonControlStyled = styled.button`
    color: #fff;
    background: green;
    font-size: inherit;
    margin: auto;
    border: 0;
    padding: 5px 20px;`;

const ButtonControl = ({ text, onClick } : Props ) =>
    (
        <ButtonControlStyled onClick={onClick}>
            {text}
        </ButtonControlStyled>
    );

export default ButtonControl;
