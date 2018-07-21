import { Client, Message } from 'react-native-paho-mqtt'
import { SWITCHED_OFF, SWITCHED_ON } from './reducers/devices'
// import { store } from './store'

const myStorage = {
    setItem: (key, item) => {
        myStorage[key] = item
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
        delete myStorage[key]
    }
}

const client = new Client({ uri: 'ws://127.0.0.1:1884/', clientId: 'clientId', storage: myStorage })

client.on('connectionLost', (responseObject) => {
    if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage)
    }
})


const runMQTT = () => {
    client.connect()
        .then(() => {
            // Once a connection has been made, make a subscription and send a message.
            console.log('onConnect')
            return client.subscribe('devices/power')
        })
        .then(() => {
            const message = new Message('Hello')
            message.destinationName = 'World'
            client.send(message)
        })
        .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log('onConnectionLost:' + responseObject.errorMessage)
            }
        })
}

export {client, runMQTT}
