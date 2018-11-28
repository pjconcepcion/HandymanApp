import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import DatePicker  from 'react-native-datepicker';
import {Actions} from 'react-native-router-flux';
import {Dropdown} from 'react-native-material-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './FormStyles';
import request from '../../util/request';
import localhosts,{getIpAddress} from '../../util/localhost';
import Loading from '../../components/Loading';

class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            houseNo: '',
            street: '',
            barangay: '',
            city: '',
            birthDay: '',
            emailAddress: '',
            contactNumber: '',
            password: '',
            rePassword: '',
            isFocusing: '',
            questions: [],
            selectedQuestion: '',
            answer: '',
            validName: false,
            validContact: false,
            validEmail: false,
            validAddress: false,
            validAccount: false,
            isLoading: false,
        }
        this.checkValidation = this.checkValidation.bind(this);
    }

    checkValidation(){
        const {
            firstName,
            middleName,
            lastName,
            houseNo,
            street,
            barangay,
            city,
            birthDay,
            emailAddress,
            contactNumber,
            password,
            rePassword,
            selectedQuestion,
            answer,
            validEmail
        } = this.state

        if(firstName.trim() != '' && middleName.trim() != '' && lastName.trim() != '' && birthDay.trim() != ''){
            this.setState({validName: true});
        }else{
            this.setState({validName: false});
        }

        if(houseNo.trim() != '' && street.trim() != '' && barangay.trim() != '' && city.trim() != ''){
            this.setState({validAddress: true});
        }else{
            this.setState({validAddress: false});
        }

        if(contactNumber.trim() != '' && validEmail){
            this.setState({validContact: true});
        }else{
            this.setState({validContact: false});
        }

        if(password.trim() != '' && rePassword.trim() != '' && selectedQuestion != '' && answer.trim() != ''){
            this.setState({validAccount: true});
        }else{
            this.setState({validAccount: false});
        }
    }

    onSubmit(){
        const {
            firstName,
            middleName,
            lastName,
            houseNo,
            street,
            barangay,
            city,
            birthDay,
            emailAddress,
            contactNumber,
            password,
            rePassword,
            selectedQuestion,
            answer,
            validAccount,
            validAddress,
            validContact,
            validName,
        } = this.state

        if(password != rePassword){
            alert('Password and re-enter password do not match.');
        }
        else if(!validName){            
            alert('You miss some textfield/s in the Profile tab');        
        }
        else if(!validAddress){            
            alert('You miss some textfield/s in the Address tab');        
        }
        else if(!validContact){            
            alert('You miss some textfield/s in the Contact tab');        
        }
        else if(!validAccount){            
            alert('You miss some textfield/s in the Account tab');        
        }else{
            var newProfile = {
                firstName,
                middleName,
                lastName,
                houseNo,
                street,
                barangay,
                city,
                birthDay,
                emailAddress,
                contactNumber,
                password,
                selectedQuestion,
                answer
            }       
            this.setState({isLoading: true});
            setTimeout(() => {
                this.setState({isLoading: false}, this.onCreate(newProfile));
            },2000);
        }
        
        
    }

    onCreate(newProfile){  
        localhost = getIpAddress()
        request.post(localhost + '/api/newAccount')
            .send(newProfile)               
            .finish((error,res) => {
                if(error){
                    console.log(error);
                }else{ 
                    if(res.body.affectedRows > 0){
                        alert('Successfully created your account');
                        Actions.push('login');
                    }else{
                        alert('There was a problem creating your account');
                        console.log(res.body);
                    }
                }
            })
    }

    onFocus(type){
        this.setState({isFocusing: type});
    }

    onEndEditing(){
        if(this.state.isFocusing == 'emailAddress'){
            if(this.state.emailAddress.indexOf('@') > -1){
                this.setState({validEmail: true}, () => 
                this.checkValidation())
            }else{
                this.setState({validEmail: false}, () =>
                this.checkValidation())
            }
        }
        this.checkValidation();
        this.setState({isFocusing: ''})
    }

    onSetBirthdate(date){
        this.setState({birthDay: date})
    }

    onSelectQuestion(value){
        this.setState({selectedQuestion: value}, () => 
            this.checkValidation());
    }

    login(){
        Actions.pop();
    }

    componentWillMount(){
        request.get(localhost + '/api/questions')
            .finish((error,res) => {
                if(!error){   
                    this.setState({questions: res.body});
                }
            })
    }

    render(){
        return(
            <View style = {styles.background}>
                {this.state.isLoading &&
                    <Loading isLoading = {this.state.isLoading}/>    
                }           
                
                <View style = {styles.header}>
                    <Text style = {{fontSize: 18}}> Already have an account? </Text>
                    <TouchableOpacity onPress = {this.login.bind(this)}>
                        <Text style = {{color: '#0288D1',fontSize: 18}}> Login </Text>
                    </TouchableOpacity>
                </View> 
                <ScrollView>
                    <KeyboardAvoidingView style = {styles.container}>
                        <View style = {styles.formContainer}>          
                            <View style = {styles.title}> 
                                <MaterialIcons name = {'person'} size = {30} color = {'white'} />
                                <Text style = {styles.titleText}> Personal Information </Text>                                
                                <View style = {styles.validation}>
                                    {this.state.validName &&
                                        <MaterialIcons name = {'check-circle'} size = {25} color = {'#00E676'}/>
                                    }
                                </View>
                            </View>          
                            <TextInput  
                                placeholder = {'First name'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'firstName'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({firstName: text})}
                                onFocus = {this.onFocus.bind(this,'firstName')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                            />
                            <TextInput  
                                placeholder = {'Middle name'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'middleName'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({middleName: text})}
                                onFocus = {this.onFocus.bind(this,'middleName')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                            />
                            <TextInput  
                                placeholder = {'Last name'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'lastName'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({lastName: text})}
                                onFocus = {this.onFocus.bind(this,'lastName')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                            />     
                            <DatePicker 
                                style = {{width: '100%'}}
                                placeholder = {'Birthdate'}
                                date =  {this.state.birthDay}
                                mode = "date"
                                format = "YYYY-MM-DD"
                                minDate = '1940-01-01'
                                maxDate = '2000-12-31'
                                showIcon = {false}
                                confirmBtnText = 'Confirm'
                                cancelBtnText  = 'Cancel'
                                customStyles = {{
                                    dateInput:{
                                        borderColor: 'transparent',
                                        alignItems: 'flex-start',
                                        borderBottomColor: '#BBDEFB',
                                        borderBottomWidth: 1,
                                        paddingVertical: 0,
                                    },
                                    dateText:{
                                        color: 'white',
                                        fontSize: 18,
                                        paddingHorizontal: 10,
                                    },
                                    placeholderText:{
                                        color: 'rgba(255,255,255,0.8)',
                                        fontSize: 18,
                                        paddingHorizontal: 10,
                                    },
                                }}
                                onDateChange = {(date) => this.setState({birthDay: date},
                                    () => this.checkValidation())}
                            />
                        </View>   
                        <View style = {styles.formContainer}>          
                            <View style = {styles.title}> 
                                <MaterialIcons name = {'phone'} size = {30} color = {'white'} />
                                <Text style = {styles.titleText}> Contact </Text>                                                                
                                <View style = {styles.validation}>
                                    {this.state.validContact &&
                                        <MaterialIcons name = {'check-circle'} size = {25} color = {'#00E676'}/>
                                    }
                                </View>
                            </View>   
                            <TextInput  
                                placeholder = {'Email Address'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'emailAddress'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({emailAddress: text})}
                                onFocus = {this.onFocus.bind(this,'emailAddress')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                keyboardType = {'email-address'}
                                underlineColorAndroid = {'transparent'}
                            />
                            <TextInput  
                                placeholder = {'Contact Number'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'contactNumber'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({contactNumber: text})}
                                onFocus = {this.onFocus.bind(this,'contactNumber')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                keyboardType = {'phone-pad'}
                                underlineColorAndroid = {'transparent'}
                            />        
                        </View>           
                        <View style = {styles.formContainer}>          
                            <View style = {styles.title}> 
                                <MaterialIcons name = {'home'} size = {30} color = {'white'} />
                                <Text style = {styles.titleText}> Address </Text>                                                                
                                <View style = {styles.validation}>
                                    {this.state.validAddress &&
                                        <MaterialIcons name = {'check-circle'} size = {25} color = {'#00E676'}/>
                                    }
                                </View>
                            </View>  
                            <TextInput  
                                placeholder = {'House No.'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'houseNo'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({houseNo: text})}
                                onFocus = {this.onFocus.bind(this,'houseNo')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                            />
                            <TextInput  
                                placeholder = {'Street'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'street'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({street: text})}
                                onFocus = {this.onFocus.bind(this,'street')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                            />
                            <TextInput  
                                placeholder = {'Barangay'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'barangay'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({barangay: text})}
                                onFocus = {this.onFocus.bind(this,'barangay')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                            />
                            <TextInput  
                                placeholder = {'City'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'city'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({city: text})}
                                onFocus = {this.onFocus.bind(this,'city')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                            />
                        </View>
                        <View style = {styles.formContainer}>
                            <View style = {styles.title}> 
                                <MaterialIcons name = {'lock'} size = {30} color = {'white'} />
                                <Text style = {styles.titleText}> Account </Text>                                
                                <View style = {styles.validation}>
                                    {this.state.validAccount &&
                                        <MaterialIcons name = {'check-circle'} size = {25} color = {'#00E676'}/>
                                    }
                                </View>
                            </View>                      
                            <TextInput  
                                placeholder = {'Password'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'password'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({password: text})}
                                onFocus = {this.onFocus.bind(this,'password')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                                secureTextEntry = {true}
                            />
                            <TextInput  
                                placeholder = {'Re-enter your password'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'rePassword'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({rePassword: text})}
                                onFocus = {this.onFocus.bind(this,'rePassword')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                                secureTextEntry = {true}
                            /> 
                            <Dropdown 
                                label = {'Select a security question'}
                                data = {this.state.questions}
                                baseColor = 'rgba(255,255,255,0.7)'
                                textColor = 'white'
                                itemColor = 'white'
                                fontSize = {20}
                                containerStyle = {styles.dropdownContainer}
                                pickerStyle = {styles.pickerStyle}
                                itemCount = {3}
                                onChangeText = {(value,index) => this.onSelectQuestion(value)}
                            />  
                            <TextInput  
                                placeholder = {'Answer to your security question...'}
                                placeholderTextColor = {'rgba(255,255,255,0.7)'}
                                style = {[styles.formInput, this.state.isFocusing == 'answer'? 
                                    {borderBottomColor: '#FFC107',borderBottomWidth: 1} :'']}  
                                onChangeText = {(text) => this.setState({answer: text})}
                                onFocus = {this.onFocus.bind(this,'answer')}
                                onEndEditing = {this.onEndEditing.bind(this)}
                                underlineColorAndroid = {'transparent'}
                                secureTextEntry = {true}
                            />                        
                        </View>
                        <View style = {styles.btnContainer}>
                            <TouchableOpacity 
                                onPress = {this.onSubmit.bind(this)}
                                style = {styles.btnSubmit}
                            >
                                <Text> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>             
            </View>
        );
    }
}

export default Form;