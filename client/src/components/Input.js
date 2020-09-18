import React from 'react'
import styled from 'styled-components'

const View = styled.div`
    width: 100%;

    input {
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        border: 1px solid silver;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        outline: none;
        font-family: 'Roboto', sans-serif;

        @media (max-width: 500px) {
            font-size: 16px;
        }

        ${(props) => (props.hasLabel ? `margin-top: 3px;` : ``)}

        &:focus {
            border-color: ${(props) => props.theme.primary};
        }
    }

    label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
    }
`

const Input = ({ label, id, ...props }) => {
    let inputId = id
    if (!id) {
        inputId = Date.now()
    }
    return (
        <View hasLabel={label ? true : false}>
            {label && <label htmlFor={inputId}>{label}</label>}
            <input id={inputId} {...props} />
        </View>
    )
}

export default Input
