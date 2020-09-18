import React from 'react'
import styled from 'styled-components'

const View = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    input {
        margin-right: 10px;
    }
`

const Checkbox = ({ children, className, ...props }) => {
    return (
        <View className={className}>
            <input {...props} type="checkbox" />
            {children}
        </View>
    )
}

export default Checkbox
