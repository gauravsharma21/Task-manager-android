import React, { Component } from 'react'
import { Text, View, Button, BackHandler, ToastAndroid } from 'react-native'

export default class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    render() {
        return (
            <View>
                <Text>Welcome</Text>
            </View>
        )
    }
}