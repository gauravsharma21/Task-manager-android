import {createStackNavigator, createAppContainer} from 'react-navigation'
import LoginPage from './Loginpage'
import JoinPage from './JoinPage'
import MainPage from './MainPage'
import PseudoPage from './PseudoPage'

const App = createStackNavigator({
  Home : {
    screen : PseudoPage,
  },
  LoginPage : {
    screen : LoginPage
  },
  JoinPage : {
    screen : JoinPage
  },
  MainPage : {
    screen : MainPage,
  }
})

export default createAppContainer(App) 
