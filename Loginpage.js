import React, { Component } from 'react'
import { View, Button, TextInput, Text } from 'react-native'
import { Cache } from 'react-native-cache'
import AsyncStorage from '@react-native-community/async-storage'

export default class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            message: ''
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Task Manager',
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
    _gettoken = async () => {
        const cache = new Cache({
            namespace: 'myapp',
            policy: {
                maxEntries: 2000
            },
            backend: AsyncStorage
        })
        cache.peekItem('token', function (error, value) {
            console.log(value)
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
                console.log(json)
                this._storetoken(json.token)
                this._gettoken()
                this.props.navigation.navigate('MainPage', { token: json.token })
            })
            .catch(error => {
                console.log('lul')
                this.setState({ message: 'Invalid Credentials' })
            })
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder='Enter email'
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                ></TextInput>
                <TextInput
                    placeholder='Enter password'
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true}
                ></TextInput>
                <Button
                    title='GO'
                    onPress={this.getData}
                ></Button>
                <Text>{this.state.message}</Text>
            </View>
        )
    }
}