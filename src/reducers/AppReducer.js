import { combineReducers } from 'redux'
import {devices} from '.'

const AppReducer = combineReducers({
    devices: devices.devicesReducer
})

export default AppReducer
