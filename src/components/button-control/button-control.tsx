import React from 'react';
import styled from "@emotion/styled";

interface Props {
    text: string,
    onClick: () => void,
    disabled: boolean
}

const ButtonControlStyled = styled.button`
    color: #fff;
    background: green;
    font-size: 3rem;
    margin: auto;
    border: 0;
    padding: 5px 20px;
    transition: opacity .235s;
    
    &[disabled] {
        opacity: .5;
    }
    
    `;

const ButtonControl = ({ text, onClick, disabled } : Props ) =>
    (
        <ButtonControlStyled onClick={onClick} disabled={disabled}>
            {text}
        </ButtonControlStyled>
    );

export default ButtonControl;
