import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink, createHttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'

import { createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { PersistGate } from 'redux-persist/integration/react'

import Devices from './src/screens/Devices'
import Locations from './src/screens/Locations'
import SideMenu from './src/components/SideMenu'
import { persistor, store } from './src/store'
import { client, runMQTT } from './src/mqtt'
import MenuButton from './src/components/MenuButton'
import { API_URL } from './src/settings'
import { AppState } from 'react-native'


console.disableYellowBox = true


const HaNavigator = createStackNavigator({
    devices: {
        screen: Devices,
        navigationOptions: ({ navigation }) => ({
            title: 'Devices',
            headerLeft: <MenuButton callback={navigation.toggleDrawer}/>
        })
    },
    locations: {
        screen: Locations,
        navigationOptions: ({ navigation }) => ({
            title: 'Locations',
            headerLeft: <MenuButton callback={navigation.toggleDrawer}/>
        })
    },
}, {
    mode: 'modal',
})


const AppNavigator = createDrawerNavigator({
    app: HaNavigator,
}, {
    contentComponent: SideMenu
})

// const RootNavigator = createSwitchNavigator({
//     app: AppNavigator
// }, {
//     initialRouteName: 'devices'
// })

store.subscribe(() => {
    console.log(store.getState())
})

/*
 Workaround to fix circular imports when importing "store".
 */
client.on('messageReceived', (message) => {

    const data = JSON.parse(message.payloadString)
    if (message.destinationName === 'devices/sensors/temperature') {
        store.dispatch({ type: 'STATUS_TEMPERATURE', payload: data })
    }

    if (message.destinationName === 'devices/switches') {
        if (data.action === 'STATUS') {
            store.dispatch({ type: 'STATUS_SWITCH', payload: data })
        }
    }
})

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
})


const APIClient = new ApolloClient({
    link: new HttpLink({ uri: API_URL }),
    cache: new InMemoryCache({ fragmentMatcher }),
})


export default class App extends React.Component {
    state = {
        appState: AppState.currentState
    }

    componentDidMount() {
        runMQTT()
        AppState.addEventListener('change', this._handleAppStateChange)
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange)
    }

    _handleAppStateChange = (nextAppState) => {
        const appBecameActive = this.state.appState.match(/inactive|background/) && (nextAppState === 'active')

        if (appBecameActive) {
            console.log('App is active now!')
            if (!client.isConnected()) {
                runMQTT()
            }
        }

        this.setState({ appState: nextAppState })
    }

    render() {
        return (
            <Provider store={store}>
                {/*<PersistGate loading={null} persistor={persistor}>*/}
                <ApolloProvider client={APIClient}>
                    <AppNavigator/>
                </ApolloProvider>
                {/*</PersistGate>*/}
            </Provider>
        )
    }
}
