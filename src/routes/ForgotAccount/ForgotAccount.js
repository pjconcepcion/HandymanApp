import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ForgotAccountStyles';
import request from '../../util/request';
import localhosts,{getIpAddress} from '../../util/localhost';

class ForgotAccount extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',  
            question: '',
            userID: '',
            answer: '',
            userAnswer: '', 
            password: '',
            rePassword: '',
            validUser: false,    
            validAnswer: false,     
        }
    }

    login(){
        Actions.pop();
    }

    search(){
        let username = this.state.username || this.props.username;
        if(username.trim() == ''){
            alert('Please enter a valid email address');
        }else{
            localhost = getIpAddress()
            request.get(localhost + '/api/questions/' + username.trim())
                .finish((error,res) => {
                    if(error){
                        console.log(error);
                    }else{         
                        if(res.body){                    
                            this.setState({
                                validUser: true,
                                validAnswer: false,
                                question: res.body.question,
                                answer: res.body.answer,
                                userID: res.body.userID,
                            });
                        }else{
                            alert('No Record found');
                            this.setState({
                                validUser: false,
                                validAnswer: false,
                                question: '',
                                answer: ''
                            });
                        }
                    }
                })
        }
        
    }

    checkAnswer(){
        const {answer,userAnswer} = this.state;

        if(answer == userAnswer){
            this.setState({validAnswer: true, validUser: false});
        }else{
            alert('Incorrect answer');
            this.setState({validAnswer: false});
        }
    }

    resetPassword(){
        const {password,rePassword,userID} = this.state

        if(password == rePassword){
            localhost = getIpAddress()
            request.post(localhost + '/api/profile/' + userID)
                .send({type: 'password', value: password})
                .finish((error,res) => {
                    if(!error){
                        alert('Successfully reset');
                        Actions.pop();
                    }else{
                        alert('There was a problem resetting your password');
                        console.log(error);
                    }
                })
        }else{
            alert('Password and re-enter password do not match.');
        }
    }

    componentDidMount(){
        if(this.props.username){
            this.setState({username: this.props.username});
            this.search();
        }
    }

    render(){
        return(
            <View style={styles.container}>
                    <View style = {styles.header}>
                        <Text style = {{fontSize: 18}}> Remember your account? </Text>
                        <TouchableOpacity onPress = {this.login.bind(this)}>
                            <Text style = {{color: '#0288D1',fontSize: 18}}> Login </Text>
                        </TouchableOpacity>
                    </View> 
                    <View style = {styles.form}>                        
                        <View style = {styles.searchForm}>
                            <TextInput
                                placeholder = 'Enter Email Address'
                                placeholderTextColor = 'rgba(255,255,255,0.7)'
                                style = {styles.txtInput}
                                underlineColorAndroid = "transparent"
                                onChangeText = {(text) => this.setState({username: text,validUser: false})}
                                value = {this.state.username}
                            />
                            <TouchableOpacity
                                style = {styles.btn}
                                onPress = {this.search.bind(this)}
                            >
                                <MaterialIcons name = {'search'} size = {30} color = {'black'}/>
                            </TouchableOpacity>   
                        </View>                   
                        {this.state.validUser && 
                            <View style = {styles.formQuestion}>
                                <Text style = {styles.questionText}> {this.state.question} </Text> 
                                <View style = {styles.searchForm}>                  
                                    <TextInput
                                        placeholder = 'Enter your answer'
                                        placeholderTextColor = 'rgba(255,255,255,0.7)'
                                        style = {styles.txtInput}
                                        underlineColorAndroid = "transparent"
                                        onChangeText = {(text) => this.setState({userAnswer: text})}
                                        secureTextEntry = {true}
                                    />                                
                                    <TouchableOpacity
                                        style = {styles.btn}
                                        onPress = {this.checkAnswer.bind(this)}
                                    >
                                        <MaterialIcons name = {'check'} size = {30} color = {'black'}/>
                                    </TouchableOpacity>  
                                </View>         
                            </View>
                        }        
                        {this.state.validAnswer &&
                            <View style = {[styles.formQuestion,styles.resetPassword]}>
                                <Text style = {[styles.questionText,{alignSelf: 'center'}]}> Reset Password </Text> 
                                <View style = {styles.resetForm}>                  
                                    <TextInput
                                        placeholder = 'Enter new password'
                                        placeholderTextColor = 'rgba(255,255,255,0.7)'
                                        style = {styles.txtPassword}
                                        underlineColorAndroid = "transparent"
                                        onChangeText = {(text) => this.setState({password: text})}
                                        secureTextEntry = {true}
                                    />   
                                    <TextInput
                                        placeholder = 'Re-enter new password'
                                        placeholderTextColor = 'rgba(255,255,255,0.7)'
                                        style = {styles.txtPassword}
                                        underlineColorAndroid = "transparent"
                                        onChangeText = {(text) => this.setState({rePassword: text})}
                                        secureTextEntry = {true}
                                    />                                  
                                    <TouchableOpacity
                                        style = {styles.btnSubmit}
                                        onPress = {this.resetPassword.bind(this)}
                                    >                                        
                                        <Text style = {{fontSize: 18}}> Reset </Text> 
                                    </TouchableOpacity>  
                                </View>         
                            </View>
                        }                    
                    </View>  
            </View>
        );
    }
}

export default ForgotAccount;