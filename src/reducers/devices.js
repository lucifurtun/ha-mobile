import { takeEvery } from 'redux-saga/effects'
import { client } from '../mqtt'
import { Message } from 'react-native-paho-mqtt'


export const SWITCH_ON = 'SWITCH_ON'
export const SWITCHED_ON = 'SWITCHED_ON'

export const SWITCH_OFF = 'SWITCH_OFF'
export const SWITCHED_OFF = 'SWITCHED_OFF'


const initialState = {
    1: { id: 1, name: 'Light1', state: false },
    2: { id: 2, name: 'Light2', state: false }
}

export const devicesReducer = (state = initialState, action, rootState) => {
    switch (action.type) {
        case SWITCH_ON:
            console.log('switch on', action.payload.id)
            return state
        case SWITCHED_ON:
            console.log('switched on', action.payload.id)
            console.log(action.payload)
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    state: true
                }
            }
        case SWITCH_OFF:
            console.log('switch off', action.payload.id)
            return state
        case SWITCHED_OFF:
            console.log('switched off', action.payload.id)
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    state: false
                }
            }
    }

    return state
}

export const switchOn = id => ({
    type: SWITCH_ON,
    payload: {
        id
    }
})

export const switchOff = id => ({
    type: SWITCH_OFF,
    payload: {
        id
    }
})


function* sendRequest(action) {
    const message = new Message(JSON.stringify({ 'id': action.payload.id, 'event': 'SWITCH_ON' }))
    message.destinationName = 'devices/power'
    client.send(message)
}

export function* saga() {
    yield takeEvery(SWITCH_ON, sendRequest)
    yield takeEvery(SWITCH_OFF, sendRequest)
}
