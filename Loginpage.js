import React, { Component } from 'react'
import { View, Button, TextInput, Text, BackHandler, ToastAndroid, StyleSheet } from 'react-native'
import { Cache } from 'react-native-cache'
import AsyncStorage from '@react-native-community/async-storage'

export default class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            clickCount: 0
        }
        this._isMounted = false
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Task Manager',
            headerLeft: null,
            headerRight: (
                <Button
                    onPress={() => { navigation.navigate('JoinPage') }}
                    title='Join'
                ></Button>
            )
        }
    }
    _storetoken = (token) => {
        const cache = new Cache({
            namespace: 'myapp',
            policy: {
                maxEntries: 2000
            },
            backend: AsyncStorage
        })
        cache.setItem('token', token, function (error) {
        })
    }
    getData = () => {
        data = {
            email: this.state.email,
            password: this.state.password
        }
        fetch('http://common-task-manager.herokuapp.com/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status !== 200) {
                throw new Error()
            }
            return response.json()
        })
            .then((json) => {
                this._storetoken(json.token)
                this.props.navigation.navigate('MainPage', { token: json.token, name: json.user.name })
            })
            .catch(error => {
                ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT)
            })
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
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    render() {
        return (
            <View style={styles.bg}>
                <Text style={styles.header}>Login</Text>
                <View style={styles.container}>
                    <TextInput
                        placeholder='Enter email'
                        placeholderTextColor='#514d54'
                        style={styles.input}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    ></TextInput>
                    <TextInput
                        placeholder='Enter password'
                        placeholderTextColor='#514d54'
                        style={styles.input}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                    ></TextInput>
                    <Button
                        title='GO'
                        onPress={this.getData}
                    ></Button>
                </View>
            </View>
        )
    }
}

const styles = new StyleSheet.create({
    header: {
        color: 'white',
        fontSize: 50,
        right: 10,
        fontWeight: 'bold'
    },
    bg: {
        backgroundColor: '#3d0670',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 30,
        width: 300,
        paddingVertical: 70,
        paddingHorizontal: 20
    },
    input: {
        color: '#3d0670',
        fontFamily: 'Arial',
        fontSize: 20,
        padding: 10,
        marginBottom: 20,
        borderBottomWidth: 2
    }
})