export const SET_CONTACTS = 'contacts/SET'
export const GET_CONTACTS = 'contacts/GET'
export const ADD_CONTACT = 'contacts/ADD'
export const REMOVE_CONTACT = 'contacts/REMOVE'

const KEY = 'contacts'

export default (state, action) => {
    switch (action.type) {
        case SET_CONTACTS:
            localStorage.setItem(KEY, JSON.stringify(action.data))
            return [...action.data]
        case GET_CONTACTS:
            const contactsFromStorage = localStorage.getItem(KEY)
            if (contactsFromStorage) {
                const contacts = JSON.parse(contactsFromStorage)
                return [...contacts]
            } else {
                return []
            }
        case ADD_CONTACT:
            const contactForAdd = action.data
            const newStateForAdd = [
                ...state,
                {
                    phone: contactForAdd.phone,
                    name: contactForAdd.name
                }
            ]
            localStorage.setItem(KEY, JSON.stringify(newStateForAdd))
            return newStateForAdd
        case REMOVE_CONTACT:
            const contactForDelete = action.data
            const newStateForDelete = [...state].filter(
                (item) => item.phone !== contactForDelete.phone
            )
            localStorage.setItem(KEY, JSON.stringify(newStateForDelete))
            return newStateForDelete
        default:
            return state
    }
}
