import React, { PureComponent } from "react";
import styled from "@emotion/styled";

const LayoutScreenStyled = styled.div`
    background: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 40px;
    font-size: 30px;
    justify-content: space-between;
    @media (min-width: 960px) {
        font-size: 80px;
        
        strong {
            min-height: 200px;
        }
    }
    
    p {
        font-size: 50%;
    }
    
    h1 {
        font-size: 4em;
        line-height: 1;
        margin: 0;
    }
`;

interface Props {
    children: React.ReactElement
}

class LayoutScreen extends PureComponent<Props> {
    render() {
        const {children} = this.props;
        return (
            <LayoutScreenStyled>
                {children}
            </LayoutScreenStyled>
        );
    }
}

export default LayoutScreen;
