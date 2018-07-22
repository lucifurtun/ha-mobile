import React from 'react'
import {Provider} from 'react-redux'
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

import {createDrawerNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import {PersistGate} from 'redux-persist/integration/react'

import Devices from './src/screens/Devices'
import Locations from './src/screens/Locations'
import SideMenu from './src/components/SideMenu'
import {persistor, store} from './src/store'
import {client, runMQTT} from './src/mqtt'
import MenuButton from './src/components/MenuButton'
import {SWITCHED_OFF, SWITCHED_ON} from './src/reducers/devices'


console.disableYellowBox = true


const HaNavigator = createStackNavigator({
    devices: {
        screen: Devices,
        navigationOptions: ({navigation}) => ({
            title: 'Devices',
            headerLeft: <MenuButton callback={navigation.toggleDrawer}/>
        })
    },
    locations: {
        screen: Locations,
        navigationOptions: ({navigation}) => ({
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
    console.log(data)

    if (data.event === SWITCHED_ON) {
        store.dispatch({type: SWITCHED_ON, payload: {id: data.id}})
    }

    if (data.event === SWITCHED_OFF) {
        store.dispatch({type: SWITCHED_OFF, payload: {id: data.id}})
    }
})

const APIClient = new ApolloClient({
    link: new HttpLink({uri: 'http://127.0.0.1:8000/graphql/'}),
    cache: new InMemoryCache(),
})


export default class App extends React.Component {
    componentDidMount() {
        runMQTT()
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ApolloProvider client={APIClient}>
                        <AppNavigator/>
                    </ApolloProvider>
                </PersistGate>
            </Provider>
        )
    }
}
