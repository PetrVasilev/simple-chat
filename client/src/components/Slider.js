import React, { useState } from 'react'
import styled from 'styled-components'

import Button from './Button'
import Chats from './Chats'
import Contacts from './Contacts'
import Modal from './Modal'
import AddChat from './AddChat'
import AddContact from './AddContact'

const Container = styled.div`
    width: 300px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-right: 2px solid #d9d9d9;

    @media (max-width: 500px) {
        height: 100%;
        border-right: none;
    }

    ${(props) =>
        props.isSelectedChat
            ? `
                @media (max-width: 650px) {
                    display: none;
                }
            `
            : `
                @media (max-width: 650px) {
                    width: 100vw;
                }
            `}
`

const Tabs = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: white;
`

const Tab = styled.div`
    padding-top: 14px;
    padding-bottom: 10px;
    width: 50%;
    text-align: center;
    cursor: pointer;
    transition: 0.3s color;
    border-bottom: 2px solid #d9d9d9;
    font-size: 14px;

    ${(props) =>
        props.active
            ? `
                color: ${props.theme.primary};
                border-bottom: 2px solid ${props.theme.primary};
            `
            : ``}

    &:hover {
        color: ${(props) => props.theme.primary};
    }
`

const Action = styled.div`
    .action {
        width: 100%;
        height: 42px;
    }
`

const Slider = ({ selectedChatState }) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <Container isSelectedChat={selectedChatState[0]}>
            <Tabs>
                <Tab onClick={() => setSelectedTab(0)} active={selectedTab === 0}>
                    Чаты
                </Tab>
                <Tab onClick={() => setSelectedTab(1)} active={selectedTab === 1}>
                    Контакты
                </Tab>
            </Tabs>
            {selectedTab === 0 && <Chats selectedChatState={selectedChatState} />}
            {selectedTab === 1 && <Contacts />}
            <Action>
                <Button onClick={() => setModalVisible(true)} className="action">
                    {selectedTab === 0 && `Создать чат`}
                    {selectedTab === 1 && `Добавить контакт`}
                </Button>
            </Action>
            <Modal
                title={selectedTab === 0 ? 'Создать чат' : 'Добавить контакт'}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
            >
                {selectedTab === 0 && <AddChat onFinish={() => setModalVisible(false)} />}
                {selectedTab === 1 && <AddContact onFinish={() => setModalVisible(false)} />}
            </Modal>
        </Container>
    )
}

export default Slider
