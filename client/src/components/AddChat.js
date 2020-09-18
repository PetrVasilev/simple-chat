import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import Input from './Input'
import Button from './Button'
import Checkbox from './Checkbox'
import { State } from '../context'
import { ADD_CHAT } from '../context/chats'
import { phoneMasked } from '../utils'

const Form = styled.form`
    width: 100%;

    input[type='text'] {
        margin-bottom: 15px;
    }
`

const ErrorText = styled.div`
    color: red;
    font-size: 14px;
    margin-bottom: 15px;
`

const Contacts = styled.div`
    max-height: 30vh;
    overflow-y: auto;

    .text {
        color: gray;
        font-size: 14px;
        margin-bottom: 15px;
    }

    .list {
        .contact-item {
            margin-bottom: 15px;
        }
    }
`

const Contact = styled.div`
    .name {
        font-size: 14px;
    }

    .phone {
        color: gray;
        margin-top: 5px;
        font-size: 12px;
    }
`

const AddChat = ({ onFinish }) => {
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const [selectedContacts, setSelectedContacts] = useState([])

    const { contactsState, chatsState, userState } = useContext(State)

    const [contacts] = contactsState
    const chatsDispatch = chatsState[1]
    const [user] = userState

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedContacts.length === 0) {
            return setError('Выберите хотя бы один контакт')
        }
        chatsDispatch({
            type: ADD_CHAT,
            data: {
                id: Date.now(),
                users: [...selectedContacts.map((item) => item.phone), user.phone],
                messages: []
            }
        })
        onFinish()
        setSelectedContacts([])
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                type="text"
            />

            {selectedContacts.length > 0 && (
                <Contacts>
                    <div className="text">Выбрано ({selectedContacts.length})</div>
                    <div className="list">
                        {selectedContacts.map((item) => (
                            <Checkbox
                                className="contact-item"
                                value={item.phone}
                                key={item.phone}
                                onChange={() =>
                                    setSelectedContacts((prev) =>
                                        prev.filter((i) => i.phone !== item.phone)
                                    )
                                }
                                defaultChecked
                            >
                                <Contact>
                                    <div className="name">{item.name}</div>
                                    <div className="phone">{phoneMasked(item.phone)}</div>
                                </Contact>
                            </Checkbox>
                        ))}
                    </div>
                </Contacts>
            )}

            <Contacts>
                {contacts.length === 0 ? (
                    <div className="text">Контактов нет</div>
                ) : (
                    <>
                        <div className="text">Выберите контакты</div>
                        <div className="list">
                            {contacts
                                .filter((item) => {
                                    const exist = selectedContacts.find(
                                        (i) => i.phone === item.phone
                                    )
                                    return exist ? false : true
                                })
                                .filter((item) => {
                                    const regex = new RegExp(search.replace(/\\/g, '\\\\'), 'gi')
                                    return item.name.match(regex)
                                })
                                .map((item) => (
                                    <Checkbox
                                        className="contact-item"
                                        value={item.phone}
                                        key={item.phone}
                                        onChange={() => {
                                            setError(null)
                                            setSelectedContacts((prev) => [...prev, item])
                                        }}
                                    >
                                        <Contact>
                                            <div className="name">{item.name}</div>
                                            <div className="phone">{phoneMasked(item.phone)}</div>
                                        </Contact>
                                    </Checkbox>
                                ))}
                        </div>
                    </>
                )}
            </Contacts>

            {error && <ErrorText>{error}</ErrorText>}

            <Button>Создать</Button>
        </Form>
    )
}

export default AddChat
