import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import InputMask from 'react-input-mask'

import Input from './Input'
import Button from './Button'
import { State } from '../context'
import { ADD_CONTACT } from '../context/contacts'

const Form = styled.form`
    width: 100%;

    input {
        margin-bottom: 15px;
    }
`

const ErrorText = styled.div`
    color: red;
    font-size: 14px;
    margin-bottom: 15px;
`

const AddContact = ({ onFinish }) => {
    const [error, setError] = useState(null)

    const { contactsState, userState } = useContext(State)

    const dispatchContact = contactsState[1]
    const [user] = userState

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const maskedPhone = e.target.phone.value
        const phone = maskedPhone.replace(/\+| |\(|\)|_/g, '')
        if (phone.length !== 11) {
            return setError('Введите правильный номер телефона')
        }
        if (phone === user.phone) {
            return setError('Невозможно добавить себя в контакты')
        }
        const data = { name, phone }
        dispatchContact({
            type: ADD_CONTACT,
            data
        })
        onFinish()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input name="name" label="Имя" required />
            <InputMask name="phone" mask="+7 (999) 999 99 99" required>
                {(inputProps) => <Input {...inputProps} label="Номер телефона" />}
            </InputMask>
            {error && <ErrorText>{error}</ErrorText>}
            <Button type="submit">Добавить</Button>
        </Form>
    )
}

export default AddContact
