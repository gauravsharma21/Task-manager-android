import React, {Component} from 'react'
import {SectionList, Text, View} from 'react-native'

export default class Tasks extends Component{
    render(){
        return(
            <View><Text>Hello</Text></View>
        )
    }
    static navigationOptions = {
        title : 'Tasks'
    }
    componentDidMount(){
        fetch('http://common-task-manager.herokuapp.com/tasks', {
            headers : {
                Authorization : `Bearer ${this.props.navigation.state.params.token}`
            }
        }).then(response => response.json())
        .then(json => console.log(json))
        .catch(e => console.log(e))
    }
}