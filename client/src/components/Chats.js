import React, { useContext } from 'react'
import styled from 'styled-components'

import { State } from '../context'
import { READ_MESSAGE_CHAT } from '../context/chats'
import { phoneMasked } from '../utils'

const View = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

const Chat = styled.div`
    border-bottom: 2px solid #e4e4e4;
    padding: 13px 10px;
    background: white;
    cursor: pointer;
    transition: 0.3s background-color;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 14px;
    }

    .badge {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: red;
    }

    &:hover {
        background-color: ${(props) => props.theme.hoverBackground};
    }

    ${(props) => (props.active ? `background-color: ${props.theme.hoverBackground};` : ``)}
`

const Chats = ({ selectedChatState }) => {
    const { chatsState, userState, contactsState } = useContext(State)

    const [selectedChat, setSelectedChatState] = selectedChatState

    const [chats, dispatchChats] = chatsState
    const [user] = userState
    const [contacts] = contactsState

    return (
        <View>
            {chats.map((item) => (
                <Chat
                    onClick={() => {
                        setSelectedChatState(item.id)
                        dispatchChats({
                            type: READ_MESSAGE_CHAT,
                            data: {
                                chatId: item.id
                            }
                        })
                    }}
                    active={selectedChat === item.id}
                    key={item.id}
                >
                    <div className="content">
                        {item.users
                            .filter((u) => u !== user.phone)
                            .map((phone) => {
                                const contact = contacts.find((c) => c.phone === phone)
                                return contact ? contact.name : phoneMasked(phone)
                            })
                            .join(', ')}
                    </div>
                    {selectedChat !== item.id && item.newMessage && <div className="badge" />}
                </Chat>
            ))}
        </View>
    )
}

export default Chats
