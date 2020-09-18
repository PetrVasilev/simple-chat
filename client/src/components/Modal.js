import React, { useRef } from 'react'
import styled from 'styled-components'

import useOutsideClick from '../hooks/useOutsideClick'

const View = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);

    @media (max-width: 400px) {
        justify-content: flex-start;
        padding-top: 30px;
    }
`

const Card = styled.div`
    background: white;
    padding: 20px;
    border: 1px solid #e4e4e4;
    max-width: 350px;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 400px) {
        width: 100%;
    }
`

const Title = styled.div`
    font-size: 16px;
    color: black;
    margin-bottom: 15px;
`

const Modal = ({ title = '', children, visible, closeModal }) => {
    const ref = useRef(null)

    useOutsideClick(ref, closeModal)

    if (!visible) return null
    return (
        <View>
            <Card ref={ref}>
                {title && <Title>{title}</Title>}
                {children}
            </Card>
        </View>
    )
}

export default Modal
