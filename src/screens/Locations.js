import React from 'react'
import {StyleSheet, Text, View, ListView, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {SwipeListView} from "react-native-swipe-list-view"
import {values} from 'lodash'

class Devices extends React.Component {
    render() {
        return (
            <SwipeListView
                useFlatList
                data={this.props.dataSource}
                disableRightSwipe
                renderItem={(data, rowMap) => {
                    console.log(data)
                    console.log(rowMap)

                    return (
                        <TouchableOpacity style={styles.listItem}>
                            <Text style={{marginRight: 10}}>{data.item.name}</Text>
                        </TouchableOpacity>

                    )
                }}
                renderHiddenItem={(data, secId, rowId, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnLeft]}
                            onPress={() => console.log('Edit Pressed')}>
                            <Text style={styles.backTextWhite}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={() => console.log('Delete Pressed')}>
                            <Text style={styles.backTextWhite}>Deleted</Text>
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-150}
            />

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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
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
    icon: {
        marginLeft: 5
    },
    deleteButton: {
        marginRight: -15
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    backTextWhite: {
        color: '#FFF'
    },
})

function mapStateToProps(state) {
    return {
        devices: state.devices,
        dataSource: values(state.locations),
    }
}


export default connect(mapStateToProps)(Devices)
