import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
    appearance: none;
    -webkit-appearance: none;
    border: none;
    border: 1px solid ${(props) => props.theme.primary};
    box-shadow: none;
    padding: 10px 20px;
    min-width: 130px;
    outline: none;
    background: ${(props) => props.theme.primary};
    color: white;
    cursor: pointer;
    transition: 0.3s all;
    font-size: 14px;

    &:hover {
        background-color: ${(props) => props.theme.hover};
        border: 1px solid ${(props) => props.theme.hover};
    }
`

const Button = ({ children, ...props }) => {
    return <Container {...props}>{children}</Container>
}

export default Button
