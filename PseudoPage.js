import React, { Component } from 'react'
import { View, ActivityIndicator, Image, StyleSheet, Animated, Text } from 'react-native'
import { Cache } from 'react-native-cache'
import AsyncStorage from '@react-native-community/async-storage'

export default class PseudoPage extends Component {
    constructor(props) {
        super(props)
        this.state = { isLoading: true, }
    }

    _isLogged = () => {
        const cache = new Cache({
            namespace: 'myapp',
            policy: {
                maxEntries: 2000
            },
            backend: AsyncStorage
        })
        cache.peekItem('token', async (error, value) => {
            try {
                if (value === null) {
                    this.props.navigation.navigate('LoginPage')
                }
                else {
                    const response = await fetch('http://common-task-manager.herokuapp.com/users/me', {
                        headers: {
                            Authorization: `Bearer ${value}`
                        }
                    })
                    console.log('response', response)
                    if (response.status === 200) {
                        this.props.navigation.navigate('MainPage', { token: value })
                    }
                    else {
                        this.props.navigation.navigate('LoginPage')
                    }
                }
            }
            catch (e) {
                console.log(e)
            }
        })
    }
    componentDidMount() {
        console.log('Hello')
        this._isLogged()
    }

    render() {
        const spinner = this.state.isLoading ? <ActivityIndicator size="large"></ActivityIndicator> : Null
        return (
            <View style={styles.container}>
                <View style={styles.bg}><Image source={require('./media/TM_logo.png')} style={styles.logo} /></View>
                <View style = {{flexDirection : "row"}}>
                    {spinner}
                    <Text style={styles.text}>Please wait...</Text>
                </View>
            </View>
        )
    }
}
const styles = new StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#3d0670'
    },
    bg: {
        alignSelf: 'stretch',
        marginBottom: 5,
    },
    logo: {
        height: 350,
        width: 350,
        marginBottom: 80,
        top: 40,
        alignSelf: 'center',
    },
    text: {
        color : 'white',
        marginLeft : 10,
        top : 3,
        fontSize : 20
    }
})