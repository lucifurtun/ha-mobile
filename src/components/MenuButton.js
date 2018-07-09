import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from './Icon'

const MenuButton = ({ callback }) => (
    <TouchableOpacity onPress={ callback } style={{marginLeft: 10}}>
        <Icon
            name='md/menu'
            size={ 25 }
        />
    </TouchableOpacity>
)


export default MenuButton
