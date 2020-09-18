export const SET_CHATS = 'chats/SET'
export const GET_CHATS = 'chats/GET'
export const ADD_CHAT = 'chats/ADD'
export const ADD_MESSAGE = 'chats/ADD_MESSAGE'
export const NEW_MESSAGE_CHAT = 'chats/NEW_MESSAGE_CHAT'
export const READ_MESSAGE_CHAT = 'chats/READ_MESSAGE_CHAT'

const KEY = 'chats'

export default (state, action) => {
    switch (action.type) {
        case SET_CHATS:
            localStorage.setItem(KEY, JSON.stringify(action.data))
            return [...action.data]
        case GET_CHATS:
            const chatsFromStorage = localStorage.getItem(KEY)
            if (chatsFromStorage) {
                const chats = JSON.parse(chatsFromStorage)
                return [...chats]
            } else {
                return []
            }
        case ADD_CHAT:
            const chatForAdd = action.data
            const newStateForAdd = [...state, chatForAdd]
            localStorage.setItem(KEY, JSON.stringify(newStateForAdd))
            return newStateForAdd
        case ADD_MESSAGE:
            const { chatId, message, sender, fromServer } = action.data
            const newStateWhenMessage = [...state].map((chat) => {
                if (chat.id === chatId) {
                    chat.messages = [...chat.messages, { message, sender }]
                    if (fromServer) {
                        chat.newMessage = true
                    }
                }
                return chat
            })
            localStorage.setItem(KEY, JSON.stringify(newStateWhenMessage))
            return newStateWhenMessage
        case READ_MESSAGE_CHAT:
            const { chatId: chatIdForReadMessageChat } = action.data
            const newStateForReadMessageChat = [...state].map((item) => {
                if (item.id === chatIdForReadMessageChat) {
                    item.newMessage = false
                }
                return item
            })
            localStorage.setItem(KEY, JSON.stringify(newStateForReadMessageChat))
            return newStateForReadMessageChat
        default:
            return state
    }
}
