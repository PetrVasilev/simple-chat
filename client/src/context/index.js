import React, { useReducer, useEffect, useState } from 'react'
import io from 'socket.io-client'

import userReducer, { GET_USER } from './user'
import contactsReducer, { GET_CONTACTS } from './contacts'
import chatsReducer, { GET_CHATS, ADD_CHAT, ADD_MESSAGE } from './chats'

export const State = React.createContext()

export default ({ children }) => {
    const [socket, setSocket] = useState(null)

    const userState = useReducer(userReducer, { phone: null, ready: false })
    const contactsState = useReducer(contactsReducer, [])
    const chatsState = useReducer(chatsReducer, [])

    const [user, dispatchUser] = userState
    const [chats, dispatchChats] = chatsState
    const dispatchContacts = contactsState[1]

    useEffect(() => {
        dispatchUser({
            type: GET_USER
        })
        dispatchContacts({
            type: GET_CONTACTS
        })
        dispatchChats({
            type: GET_CHATS
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (user.phone) {
            if (!socket) {
                const socketProp = io('http://192.168.31.175:3000', {
                    query: {
                        phone: user.phone
                    }
                })
                setSocket(socketProp)
            }
        }
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        if (!socket) return
        socket.on('new-message', ({ message, chatId, sender, chatUsers }) => {
            const existChat = chats.find((chat) => chat.id === chatId)
            if (existChat) {
                dispatchChats({
                    type: ADD_MESSAGE,
                    data: {
                        chatId,
                        message,
                        sender,
                        fromServer: true
                    }
                })
            } else {
                dispatchChats({
                    type: ADD_CHAT,
                    data: {
                        id: chatId,
                        users: chatUsers,
                        messages: []
                    }
                })
                dispatchChats({
                    type: ADD_MESSAGE,
                    data: {
                        chatId,
                        message,
                        sender,
                        fromServer: true
                    }
                })
            }
        })
        return () => socket.off('new-message')
        // eslint-disable-next-line
    }, [socket, chats])

    return (
        <State.Provider
            value={{
                userState,
                contactsState,
                chatsState,
                socket
            }}
        >
            {children}
        </State.Provider>
    )
}
