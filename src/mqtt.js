import { Client, Message } from 'react-native-paho-mqtt'
import { SWITCHED_OFF, SWITCHED_ON } from './reducers/devices'
import { MQTT_URL } from './settings'
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

const client = new Client({ uri: MQTT_URL, clientId: 'clientId', storage: myStorage })

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
            return client.subscribe('devices/#')
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
