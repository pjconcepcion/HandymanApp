import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from './LoginStyles';
import request from '../../util/request';
import localhosts,{getIpAddress,setIpAddress} from '../../util/localhost';
import {onLogin,onLogout} from '../../../Auth/auth';
import {socketAction} from '../../Socket/socket';

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
    }

    login(){
        alert(localhost);
        const {username,password} = this.state;
        if(username != '' && password != ''){
            localhost = getIpAddress();
            request.get(localhost + '/api/login')
                .query({username,password})
                .finish((error,res) => {
                    if(!error){
                        if(res.body){
                            var userID = res.body.userID + '';
                            var userType = res.body.Type + '';
                            onLogin(userID).then(() =>{
                                var data = {userID,userType}
                                socketAction('login',data);
                                if(userType == 2){
                                    Actions.push('handymanUI');
                                }else{
                                    Actions.push('customerUI');
                                }
                                this.setState({username: '',password: ''});
                            });   
                        }else{
                            alert('Email or password do not match');
                        }          
                    }else{
                        console.log(error);
                    }
                })
        }else{
            alert('Please enter your username and password.');
        }
    }

    signUp(){
        Actions.push('signupform');
    }

    forgotPassword(){
        Actions.push('forgotaccount',{username: this.state.username});
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View style = {styles.header}>
                        <Image style = {styles.logo} source = {require('../../assets/logo.png')}/>
                    </View>
                    <View style = {styles.loginForm}>
                        <TextInput
                            placeholder = "192.168.XXX.XXX"
                            placeholderTextColor = "#78909C"
                            style = {styles.txtInput}
                            underlineColorAndroid = "transparent"
                            onChangeText = {(text) => setIpAddress(text)}
                        />
                        <TextInput
                            placeholder = "Email"
                            placeholderTextColor = "#78909C"
                            style = {styles.txtInput}
                            underlineColorAndroid = "transparent"
                            onChangeText = {(text) => this.setState({username: text})}
                            value = {this.state.username}
                        />
                        <TextInput
                            placeholder = "Password"
                            placeholderTextColor = "#78909C"
                            secureTextEntry = {true}
                            style = {styles.txtInput}
                            underlineColorAndroid = "transparent"
                            onChangeText = {(text) => this.setState({password: text})}
                            value = {this.state.password}
                        />
                        <TouchableOpacity
                            style = {styles.btnLogin}
                            onPress = {this.login}
                        >
                            <Text style = {styles.btnLoginText}> Login </Text>
                        </TouchableOpacity>                     
                        <TouchableOpacity
                            onPress = {this.forgotPassword}
                        >
                            <Text style = {{color: 'white', fontSize: 16}}> Forgot your account? </Text>
                        </TouchableOpacity>
                    </View>                            
                    <View style = {styles.signUp}>
                        <Text style = {{fontSize: 16}}> Don't have an account yet? </Text>
                        <TouchableOpacity
                            onPress = {this.signUp}
                        >
                            <Text style = {{color: 'white', fontSize: 16}}> Sign up </Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
        );
    }
}

export default Login;