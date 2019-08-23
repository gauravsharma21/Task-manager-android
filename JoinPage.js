import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Text, Button, BackHandler } from 'react-native'

export default class JoinPage extends Component {

    static navigationOptions = {
        title: 'JoinPage'
    }
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            age: "",
            email: "",
            password: "",
            message: ""
        }
    }
    _getResponse = () => {
        const data = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email,
            password: this.state.password
        }
        fetch('http://common-task-manager.herokuapp.com/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status !== 201)
                throw new Error('Arrey bhai!!!')
            return response.json()
        })
            .then((json) => {
                console.log(json)
                this.props.navigation.navigate('MainPage', { token: json.token, name: json.user.name })
            })
            .catch(error => {
                console.log(error)
                this.setState({ message: 'Some error occured' })
            })
    }
    componentDidMount() {
        this.backhandle = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        this.backhandle.remove()
    }

    handleBackButton = () => {
        this.props.navigation.goBack(null)
        return true;
    };
    render() {
        return (
            <View style={styles.bg}>
                <Text style={styles.header}>Sign Up</Text>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='#514d54'
                        placeholder='Type your name'
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='#514d54'
                        placeholder='Type your age'
                        onChangeText={(age) => this.setState({ age })}
                        value={this.state.age}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder='Type your email'
                        placeholderTextColor='#514d54'
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder='Type your password'
                        placeholderTextColor='#514d54'
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                    ></TextInput>
                    <Button
                        title='Join'
                        onPress={this._getResponse}
                    ></Button>
                    <Text>{this.state.message}</Text>
                </View>
            </View>
        )
    }
}

const styles = new StyleSheet.create({
    header: {
        color: 'white',
        fontSize: 50,
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
        paddingVertical: 50,
        paddingHorizontal: 20
    },
    input: {
        color: '#3d0670',
        fontFamily: 'Arial',
        fontSize: 20,
        padding: 10,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#514d54'
    }
})