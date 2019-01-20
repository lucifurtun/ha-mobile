import React from 'react'
import { StyleSheet, Text, View, Switch, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { switchOn, switchOff } from '../reducers/devices'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { has, isUndefined } from 'lodash'
import TempHum from '../components/TempHum'


class Devices extends React.Component {
    componentDidUpdate(prevProps) {
        // if (prevProps.data.devices && prevProps.data.devices.length !== this.props.data.devices.length) {
        //     this.props.dispatch({ type: 'UPDATE_DEVICES', payload: this.props.data.devices })
        // }
        if (!has(prevProps.data, 'devices') && has(this.props.data, 'devices')) {
            this.props.dispatch({ type: 'UPDATE_DEVICES', payload: this.props.data.devices })
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.data.devices}
                    extraData={this.props}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(data) => {
                        const item = data.item
                        return (
                            <View style={styles.listItem}>
                                <Text style={{ marginRight: 10 }}>{item.display}</Text>
                                {
                                    item.access === 'SWITCH' &&
                                    !isUndefined(this.props.devices[item.id]) &&
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        flex: 1,
                                        marginRight: 10
                                    }}>
                                        <Switch
                                            onValueChange={(value) => {
                                                if (value) {
                                                    this.props.switchOn(item.id)
                                                } else {
                                                    this.props.switchOff(item.id)
                                                }
                                            }}
                                            value={this.props.devices[item.id].value}
                                            size={30}
                                            disabled={item.access === 'SENSOR'}
                                        />
                                    </View>
                                }
                                {
                                    item.access === 'SENSOR' &&
                                    !isUndefined(this.props.devices[item.id]) &&
                                    <TempHum
                                        temperature={this.props.devices[item.id].value.t}
                                        humidity={this.props.devices[item.id].value.h}
                                    />
                                }
                            </View>
                        )
                    }}
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
    listItem: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#878787',
        backgroundColor: '#FFFFFF'
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})


function mapStateToProps(state) {
    return {
        devices: state.devices,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        switchOn: (id) => dispatch(switchOn(id)),
        switchOff: (id) => dispatch(switchOff(id)),
        dispatch: dispatch
    }
}

const dataQuery = graphql(gql`
query{
  devices {
    id
    display
    serialNumber
    type
    access
    location {
      name
    }
  }
}
`)


export default dataQuery(connect(mapStateToProps, mapDispatchToProps)(Devices))
