import React from 'react'
import { StyleSheet, Text, View, Switch, ListView } from 'react-native'
import { Client, Message } from 'react-native-paho-mqtt'
import { connect } from 'react-redux'
import { switchOn, switchOff, SWITCHED_OFF, SWITCHED_ON } from '../reducers/devices'

class Devices extends React.Component {
    render() {
        return (
            <View style={ styles.container }>
                <ListView
                    dataSource={ this.props.dataSource }
                    renderRow={ (rowData) => (
                        <View style={{flexDirection: 'row', alignItems: 'center' , marginTop: 10}}>
                            <Text style={{marginRight: 10}}>{ rowData.name }</Text>
                            <Switch
                                onValueChange={ (value) => {
                                    if (value) {
                                        this.props.switchOn(rowData.id)
                                    }
                                    else {
                                        this.props.switchOff(rowData.id)
                                    }
                                } }
                                value={ rowData.state }
                                size={30}
                            />
                        </View>
                    ) }
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

function mapStateToProps(state) {
    return {
        devices: state.devices,
        dataSource: ds.cloneWithRows(state.devices),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        switchOn: (id) => dispatch(switchOn(id)),
        switchOff: (id) => dispatch(switchOff(id)),
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices)
