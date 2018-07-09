import React from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from './Icon'


const SideMenuItem = ({ title, icon, onPress }) => (
    <TouchableOpacity
        name={ icon }
        onPress={ onPress }
        style={ styles.button }
    >
        <View style={ styles.iconContainer }>
            <Icon
                name={ icon }
                style={ styles.icon }
                size={ 25 }
            />
        </View>
        <Text style={ styles.label }>{ title }</Text>
    </TouchableOpacity>
)


const styles = StyleSheet.create({
    button: {
        flexDirection     : 'row',
        alignItems        : 'center',
        height            : 50,
        borderBottomWidth : 1,
        borderBottomColor : '#cccccc',
        backgroundColor   : 'transparent'
    },

    iconContainer: {
        width      : 50,
        alignItems : 'center'
    },
    label: {
        fontSize: 16
    }
})

export default SideMenuItem
