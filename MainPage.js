import React, { Component } from 'react'
import { Text, View, TextInput, Button, BackHandler, ToastAndroid, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native'
import moment from 'moment'

export default class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clickCount: 0,
            addClick: 0,
            task: "",
            incompletetasks : 0
        }
        this._isMounted = false
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Task Manager',
            headerLeft: null,
            headerRight: (
                <Button
                    title='Logout'
                    onPress={() => {
                        fetch('http://common-task-manager.herokuapp.com/users/logout', {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${navigation.state.params.token}`
                            }
                        })
                            .then(response => {
                                navigation.navigate('LoginPage')
                            })
                            .catch(error => console.log(error))
                    }}
                >
                </Button>
            )
        }
    }

    componentDidMount() {
        this._isMounted = true
        this.backhandle = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        this._isMounted = false
        this.backhandle.remove()
    }

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT)
            setTimeout(() => {
                if (this._isMounted)
                    this.setState({ backClickCount: 0 })
            }, 3000)
        })
    }

    handleBackButton = () => {
        if (this.state.addClick == 0)
            this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring()
        else
            this.setState({ addClick: 0 })
        return true;
    };

    saveTask = async (task) => {
        try {
            const data = JSON.stringify({
                description: task,
                completed: false
            })
            const response = await fetch('http://common-task-manager.herokuapp.com/tasks', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.navigation.state.params.token}`
                },
                body: data
            })
        } catch (e) {
            console.log(e)
        }
    }

    fetchTasks = () => {
        fetch('https://common-task-manager.herokuapp.com/task', {
            headers : {
                Authorization : `Bearer ${this.props.navigation.state.params.token}`
            }
        })
    }

    render() {
        var bottombar = <View style={styles.bottombar}>
            <TextInput style={styles.input}
                placeholder='Add description'
                onChangeText={(text) => this.setState({ task: text })}
                value={this.state.task}
            ></TextInput>
            <View style={styles.taskButtons}>
                <View style={{ flex: 1 }}>
                    <Button
                        title='Save'
                        onPress={async () => await this.saveTask(this.state.task)}
                    ></Button>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title='Cancel'
                        onPress={() => {
                            this.setState({ addClick: 0 })
                        }}
                    ></Button>
                </View>
            </View>
        </View>
        var bar = null
        if (this.state.addClick != 0) {
            bar = bottombar
        }
        var date = new Date()
        var timestamp = date.getTime()
        var day = moment(timestamp).format("dddd")
        var fulldate = moment(timestamp).format("MMMM D, YYYY")
        return (
            <View style={styles.bg}>
                <View style={styles.container}>
                    <View>
                        <View style={{ margin: 15 }}>
                            <Text style={styles.date}>{day}</Text>
                            <Text style={styles.date}>{fulldate}</Text>
                        </View>
                        <Text style={styles.welcome}>Welcome,</Text>
                        <Text style={styles.welcome}>{this.props.navigation.state.params.name}</Text>
                        <Button
                            title='Tasks'
                            onPress={() => { 
                                this.props.navigation.navigate('TasksPage', { token: this.props.navigation.state.params.token })}}
                        ></Button>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.setState({ addClick: 1 })}
                            style={{ width: 100, alignSelf: 'flex-end' }}
                        >
                            <Image
                                source={require('./media/add.png')}
                                style={styles.add}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                {bar}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#3d0670',
        flex: 1,
        justifyContent: "space-between"
    },
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    welcome: {
        color: 'white',
        fontSize: 40,
        top: 50,
        marginLeft: 10
    },
    date: {
        color: 'white',
        fontSize: 20,
        alignSelf: "flex-end",
    },
    add: {
        height: 80,
        width: 80,
        alignSelf: "flex-end",
        margin: 20
    },
    input: {
        color: '#3d0670',
        fontFamily: 'Arial',
        fontSize: 20,
        borderBottomWidth: 2
    },
    bottombar: {
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 20,
        height: 200
    },
    taskButtons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    }
})