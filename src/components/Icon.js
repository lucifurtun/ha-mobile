import React from 'react'

import { has, split } from 'lodash'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Zocial from 'react-native-vector-icons/Zocial'

const ICONS = {
    md : MaterialIcons,
    io : Ionicons,
    zo : Zocial
}

const Icon = ({ name, ...otherProps }) => {
    const [pack, iconName] = split(name, '/')

    if (!has(ICONS, pack)) {
        return null
    }

    return React.createElement(ICONS[pack], { name: iconName, ...otherProps })
}


export default Icon
