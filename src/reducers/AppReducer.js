import { combineReducers } from 'redux'
import {devices, locations} from '.'

const AppReducer = combineReducers({
    devices: devices.devicesReducer,
    locations: locations.reducer
})

export default AppReducer
