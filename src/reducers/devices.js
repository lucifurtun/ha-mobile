import { takeEvery } from 'redux-saga/effects'
import { client } from '../mqtt'
import { Message } from 'react-native-paho-mqtt'

export const DEVICE_TYPENAMES = {
    SENSOR: 'Sensor',
    SWITCH: 'Switch'
}


export const devicesReducer = (state = {}, action, rootState) => {
    switch(action.type) {
        case 'UPDATE_DEVICES':
            let initialState = {}

            for (let device of action.payload) {
                switch(device.__typename) {
                    case DEVICE_TYPENAMES.SENSOR:
                        if (device.type === 'temperature') {
                            initialState[device.id] = {
                                value: { t: 0, h: 0 }
                            }
                        }
                        break
                    case DEVICE_TYPENAMES.SWITCH:
                        initialState[device.id] = {
                            value: false
                        }
                        break
                }
            }

            return initialState

        case 'GET_TEMPERATURE':
            return state
        case 'STATUS_TEMPERATURE':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    value: action.payload.value
                }
            }
        case 'STATUS_SWITCH':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    value: action.payload.value
                }
            }
        case 'GET_SWITCH':
            return state
        case 'SET_SWITCH':
            return state
    }

    return state
}

export const switchOn = id => ({
    type: 'SET_SWITCH',
    payload: {
        id,
        value: true
    }
})

export const switchOff = id => ({
    type: 'SET_SWITCH',
    payload: {
        id,
        value: false
    }
})


function* sendRequest(action) {
    const payload = {
        id: action.payload.id,
        action: 'SET',
        value: action.payload.value
    }

    const message = new Message(JSON.stringify(payload))
    message.destinationName = 'devices/switches'
    client.send(message)
}

export function* saga() {
    yield takeEvery('SET_SWITCH', sendRequest)
}
