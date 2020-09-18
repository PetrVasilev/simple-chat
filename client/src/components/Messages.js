import React, { useCallback } from 'react'
import styled from 'styled-components'

import { phoneMasked } from '../utils'

const View = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    padding: 10px;
    overflow-y: auto;
    box-sizing: border-box;
`

const Message = styled.div`
    margin-bottom: 6px;
    display: flex;
    flex-direction: column;

    ${(props) =>
        props.myMessage
            ? `
                align-self: flex-end;
            `
            : ``}

    .message {
        background: white;
        padding: 8px;
        font-size: 14px;
        border: 1px solid #e4e4e4;
        width: fit-content;
        border-radius: 6px;

        ${(props) =>
            props.myMessage
                ? `
                    align-self: flex-end;
                    background-color: ${props.theme.primary};
                    color: white;
                `
                : ``}
    }

    .sender {
        font-size: 12px;
        color: gray;
        padding: 3px 8px;

        ${(props) =>
            props.myMessage
                ? `
                    align-self: flex-end;
                `
                : ``}
    }
`

const Messages = ({ currentChat, user, contacts }) => {
    const messages = currentChat.messages

    const setRef = useCallback((node) => {
        if (window.innerWidth > 500) {
            if (node) {
                node.scrollIntoView({ smooth: true })
            }
        } else {
            window.scrollTo(0, document.body.scrollHeight)
        }
    }, [])

    return (
        <View>
            {messages.map((item, index) => {
                const myMessage = item.sender === user.phone
                const contact = contacts.find((c) => item.sender === c.phone)
                const lastMessage = messages.length - 1 === index
                return (
                    <Message ref={lastMessage ? setRef : null} key={index} myMessage={myMessage}>
                        <div className="message">{item.message}</div>
                        <div className="sender">
                            {myMessage ? 'Вы' : contact ? contact.name : phoneMasked(item.sender)}
                        </div>
                    </Message>
                )
            })}
        </View>
    )
}

export default Messages
