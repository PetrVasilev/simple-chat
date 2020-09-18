import React, { useRef, useState, useContext } from 'react'
import styled from 'styled-components'
import InputMask from 'react-input-mask'

import Input from '../components/Input'
import Button from '../components/Button'
import { State } from '../context'
import { SET_USER } from '../context/user'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    @media (max-width: 400px) {
        justify-content: flex-start;
        padding-top: 30px;
    }
`

const Form = styled.form`
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
    max-width: 350px;
    width: 100%;
    border: 1px solid #e4e4e4;

    @media (max-width: 400px) {
        width: 100%;
    }

    button {
        margin-top: 15px;
    }
`

const ErrorText = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: -5px;
`

const Login = () => {
    const phoneRef = useRef(null)
    const [error, setError] = useState(null)
    const { userState } = useContext(State)

    const userDispatch = userState[1]

    const handleSubmit = (e) => {
        e.preventDefault()
        const maskedPhone = phoneRef.current.value
        const phone = maskedPhone.replace(/\+| |\(|\)|_/g, '')
        if (phone.length !== 11) {
            return setError('Введите правильный номер телефона')
        }
        userDispatch({
            type: SET_USER,
            data: { phone }
        })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputMask ref={phoneRef} mask="+7 (999) 999 99 99" required>
                    {(inputProps) => <Input {...inputProps} label="Номер телефона" />}
                </InputMask>
                {error && <ErrorText>{error}</ErrorText>}
                <Button type="submit">Войти</Button>
            </Form>
        </Container>
    )
}

export default Login
