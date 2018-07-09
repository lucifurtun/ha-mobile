import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ViewPropTypes } from 'react-native'

const Container = ({ children, withPadding, style }) => (
    <View style={ [styles.container, style, withPadding && styles.padded] }>
        { children }
    </View>
)

Container.propTypes = {
    style       : ViewPropTypes.style,
    withPadding : PropTypes.bool
}

const styles = StyleSheet.create({
    container: {
        flex            : 1,
        backgroundColor : 'transparent'
    },
    padded: {
        padding: 15
    }
})

export default Container
