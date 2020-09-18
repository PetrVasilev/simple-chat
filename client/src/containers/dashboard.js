import React, { useState } from 'react'
import styled from 'styled-components'

import Slider from '../components/Slider'
import Chat from '../components/Chat'

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const Dashboard = () => {
    const [selectedChat, setSelectedChat] = useState(null)
    return (
        <Container>
            <Slider selectedChatState={[selectedChat, setSelectedChat]} />
            <Chat selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        </Container>
    )
}

export default Dashboard
