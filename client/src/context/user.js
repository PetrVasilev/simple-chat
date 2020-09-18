export const SET_USER = 'user/SET'
export const GET_USER = 'user/GET'

const KEY = 'user'

export default (state, action) => {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem(KEY, JSON.stringify(action.data))
            return {
                phone: action.data.phone,
                ready: true
            }
        case GET_USER:
            const userFromStorage = localStorage.getItem(KEY)
            if (userFromStorage) {
                const user = JSON.parse(userFromStorage)
                return { ...user, ready: true }
            } else {
                return {
                    ready: true
                }
            }
        default:
            return state
    }
}
