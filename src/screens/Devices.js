import React from 'react'
import {StyleSheet, Text, View, Switch, FlatList} from 'react-native'
import {connect} from 'react-redux'
import {switchOn, switchOff} from '../reducers/devices'
import {values} from 'lodash'
import {graphql} from "react-apollo"
import {gql} from "apollo-boost"

class Devices extends React.Component {
    render() {
        console.log(this.props.devices)
        return (
            <View style={styles.container}>
                <FlatList
                    useFlatList
                    data={values(this.props.data.devices)}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={(data, rowMap) => (
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <Text style={{marginRight: 10}}>{data.item.name}</Text>
                            <Switch
                                onValueChange={(value) => {
                                    if (value) {
                                        this.props.switchOn(data.item.id)
                                    }
                                    else {
                                        this.props.switchOff(data.item.id)
                                    }
                                }}
                                value={data.item.state}
                                size={30}
                            />
                        </View>
                    )}
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
    name
    host
    pin
    type
    location {
      name
    }
  }
}
`)


export default dataQuery(connect(mapStateToProps, mapDispatchToProps)(Devices))
