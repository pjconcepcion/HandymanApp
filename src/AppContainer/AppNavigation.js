import React, {Component} from "react";
import {Alert,BackHandler} from "react-native";
import {Actions} from "react-native-router-flux";
import {onLogout} from '../../Auth/auth';
import {socketAction} from '../Socket/socket';

class AppNavigation extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            var scene = Actions.currentScene;
            try {
                switch(scene){
                    case 'login':
                        Alert.alert('Exit App', 'Do you wish to close the app?',
                        [
                            {text: 'Yes',onPress: () => BackHandler.exitApp()},
                            {text: 'Cancel'}
                        ])
                        break;
                    case 'search':
                    case '_profile':
                    case '_notification':
                    case '_transaction':
                    case '_settings':
                    case '_find':
                        Alert.alert('Logout', 'Do you want to log out?',
                            [
                                {text: 'Yes',onPress: () => onLogout().then(()=> Actions.reset('root'))},
                                {text: 'Cancel'}
                            ])
                        break;                    
                    case 'forgotaccount':
                    case 'signupform':                
                    case 'bookingform':
                        Actions.pop();
                        break;
                    case 'searching':
                        Alert.alert('Cancel Searching', 'Do you want to cancel search?',
                            [
                                {text: 'Yes',onPress: () => {                                    
                                    socketAction('cancelRequest');
                                    Actions.pop();
                                }},
                                {text: 'Cancel'}
                            ])
                        break;
                }
                return true;
            }
            catch (err) {
                console.debug("Can't pop. Exiting the app...");
                return false;
            }
        });
    }

    componentWillUnmount(){
        console.log("Unmounting app, removing listeners");
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        return this.props.children;
    }
}

export default AppNavigation;