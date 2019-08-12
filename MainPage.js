import React, { Component } from 'react'
import { Text, View, Button, BackHandler } from 'react-native'

export default class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clickCount: 0
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Task Manager',
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
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
        })
    }

    render() {
        return (
            <View>
                <Text>Welcome</Text>
            </View>
        )
    }
}