import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const TempHum = ({ temperature, humidity }) => (
    <View style={[styles.container]}>
        <View style={styles.temp}>
            <Text>{temperature}°C</Text>
        </View>
        <View style={styles.hum}>
            <Text>{humidity}%</Text>
        </View>
    </View>
)


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    temp: {
        width: 60,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 2
    },
    hum: {
        width: 60,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default TempHum
