import {createStackNavigator, createAppContainer} from 'react-navigation'
import LoginPage from './Loginpage'
import JoinPage from './JoinPage'
import MainPage from './MainPage'
import PseudoPage from './PseudoPage'
import TasksPage from './TasksPage'

const App = createStackNavigator({
  Home : {
    screen : PseudoPage,
    navigationOptions : {
      header : null
    }
  },
  LoginPage : {
    screen : LoginPage
  },
  JoinPage : {
    screen : JoinPage
  },
  MainPage : {
    screen : MainPage,
  },
  TasksPage : {
    screen : TasksPage
  }
})

export default createAppContainer(App) 
