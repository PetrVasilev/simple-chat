import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import Input from './Input'
import Button from './Button'
import Messages from './Messages'
import { State } from '../context'
import { phoneMasked } from '../utils'
import { ADD_MESSAGE, READ_MESSAGE_CHAT } from '../context/chats'
import { ReactComponent as BackIcon } from '../assets/icons/arrow-back.svg'
import { ReactComponent as SendIcon } from '../assets/icons/send.svg'

const Container = styled.div`
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;

    @media (max-width: 500px) {
        height: auto;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;

    .send-action {
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;

        padding-left: 10px;
        padding-right: 10px;
        min-width: 70px;

        svg {
            height: 20px;
            width: 20px;
            margin-left: 3px;

            path {
                stroke: white !important;
            }
        }
    }

    .message-input {
        height: 42px;
    }
`

const Header = styled.div`
    border-bottom: 2px solid #d9d9d9;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 14px;
    padding-bottom: 10px;
    text-align: center;
    background: white;
    position: relative;
`

const Back = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        height: 20px;
        width: 20px;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
`

const Chat = ({ selectedChat, setSelectedChat }) => {
    const [message, setMessage] = useState('')
    const { contactsState, chatsState, userState, socket } = useContext(State)

    if (!selectedChat) return null

    const [contacts] = contactsState
    const [chats, dispatchChats] = chatsState
    const [user] = userState

    const currentChat = chats.find((item) => item.id === selectedChat)

    if (!currentChat) return null

    const usersPhones = currentChat.users.filter((phone) => phone !== user.phone)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message) {
            const data = {
                chatId: selectedChat,
                message,
                sender: user.phone
            }
            dispatchChats({
                type: ADD_MESSAGE,
                data
            })
            socket.emit('send-message', {
                ...data,
                receivers: usersPhones
            })
            setMessage('')
        }
    }

    return (
        <Container>
            <Header>
                {window.innerWidth < 650 && (
                    <Back
                        onClick={() => {
                            dispatchChats({
                                type: READ_MESSAGE_CHAT,
                                data: {
                                    chatId: selectedChat
                                }
                            })
                            setSelectedChat(null)
                        }}
                    >
                        <BackIcon />
                    </Back>
                )}
                {usersPhones
                    .map((item) => {
                        const contact = contacts.find((c) => c.phone === item)
                        return contact ? contact.name : phoneMasked(item)
                    })
                    .join(', ')}
            </Header>
            <Messages contacts={contacts} user={user} currentChat={currentChat} />
            <Form onSubmit={handleSubmit}>
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Написать сообщение..."
                    className="message-input"
                />
                <Button className="send-action">
                    <SendIcon />
                </Button>
            </Form>
        </Container>
    )
}

export default Chat
