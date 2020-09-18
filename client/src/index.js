import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './components/GlobalStyles'

import Dashboard from './containers/dashboard'
import Login from './containers/login'

import ContextProvider from './context'
import { State } from './context'

const theme = {
    primary: '#0c9bba',
    hover: '#09839e',
    hoverBackground: 'rgba(12, 155, 186, 0.2)'
}

const Check = () => {
    const { userState } = useContext(State)

    const [user] = userState

    return user.ready ? user.phone ? <Dashboard /> : <Login /> : null
}

const App = () => {
    return (
        <ContextProvider>
            <ThemeProvider theme={theme}>
                <Check />
            </ThemeProvider>
            <GlobalStyles />
        </ContextProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
