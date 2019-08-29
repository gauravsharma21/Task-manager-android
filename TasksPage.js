import React, { Component } from 'react'
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native'

export default class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
    }
    static navigationOptions = {
        title: 'Tasks'
    }
    componentDidMount() {
        fetch('http://common-task-manager.herokuapp.com/tasks', {
            headers: {
                Authorization: `Bearer ${this.props.navigation.state.params.token}`
            }
        }).then(response => response.json())
            .then(json => {
                this.setState({ tasks: json })
            }
            )
            .catch(e => console.log(e))
    }
    _deleteitembyid = (id) => {
        const url = 'http://common-task-manager.herokuapp.com/tasks/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.props.navigation.state.params.token}`
            }
        }).then(response => ToastAndroid.show('Deleted!', ToastAndroid.SHORT))
            .catch(e => console.log(e))
        const filterData = this.state.tasks.filter(item => item._id !== id)
        this.setState({ tasks: filterData }) 
    }
    _renderItem = ({ item }) => {
        return (
            <View style={styles.task}>
                <Text style={styles.text}>{item.description}</Text>
                <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                            <Image
                                style={styles.icon}
                                source={require('./media/edit-icon.png')}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => this._deleteitembyid(item._id)}
                            style={{ alignSelf: "flex-end" }}>
                            <Image
                                style={styles.icon}
                                source={require('./media/Recycle_Bin_icon.png')}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        const { tasks } = this.state
        return (
            <View>
                <FlatList
                    data={tasks}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                ></FlatList>
            </View>
        )
    }
}
const styles = new StyleSheet.create({
    task: {
        borderWidth: 2,
        borderRadius: 20,
        padding: 30,
        marginHorizontal: 10,
    },
    text: {
        fontFamily: 'Arial',
        fontSize: 30
    },
    icon: {
        height: 40,
        width: 40,
        alignSelf: "flex-end"
    }
})