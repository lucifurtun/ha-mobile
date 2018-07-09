import React from 'react'

import Container from './Container'
import SideMenuItem from './SideMenuItem'
import { store } from '../store'


const SideMenu = ({ navigation }) => {
    return (
        <Container>
            <SideMenuItem
                title="Devices"
                icon="md/devices"
                onPress={ () => navigation.navigate('devices') }
            />
            <SideMenuItem
                title="Locations"
                icon="md/room"
                onPress={ () => navigation.navigate('locations') }
            />
            <SideMenuItem
                title="Log out"
                icon="md/power-settings-new"
                onPress={ () => console.log('Logged Out.') }
            />

        </Container>
    )
}

export default SideMenu
