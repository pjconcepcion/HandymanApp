import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,  
    ScrollView,
    TextInput, 
    Alert 
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import call from 'react-native-phone-call';
import styles from './ServiceStartStyles';
import Modal from 'react-native-modal';
import {socketAction} from '../../Socket/socket';
import Loading from '../../components/Loading';
import localhosts,{getIpAddress} from '../../util/localhost';
import request from '../../util/request';
import {getID} from '../../../Auth/auth';
import ModalDropdown from 'react-native-modal-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class ServiceStart extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            isModalFinishVisible: false,
            isModalReportVisible: false,
            isLoading: false,
            timeStarted: '',     
            display: '',       
            date: new Date().toLocaleDateString(),
            userType: '',
            userID: '',
            reportType: [],
            reportComment: '',
            selectedReport: '',
        }      
    }

    componentWillMount(){
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();
        var seconds = new Date().getSeconds();
        var timeStarted = hours + ':' + minutes + ':' + seconds;
        var PMAM = 'AM';
        if(hours > 12){
            hours -= 12;            
            PMAM = 'PM';
        }

        if(minutes < 10){
            minutes = '0' + minutes;
        }

        var display = hours + ':' + minutes + ':' + seconds + ' ' + PMAM;
        this.setState({timeStarted: timeStarted,display: display});
        getID().then((userID) => {
            localhost = getIpAddress()
            request.get(localhost + '/api/profile/'+ userID)
            .finish((error,res) => {
                if(!error){
                    this.setState({
                        userType: res.body.Type,
                        userID: userID
                    });
                }
            })
        })

        localhost = getIpAddress()
        request.get(localhost + '/api/reports')
            .finish((error,res) => {
                if(!error){
                    var question = res.body.map(function(value, index) {
                        return [value.name];
                    });
                
                    this.setState({reportType: question})
                }
            })
    }

    call(){
        var args = {
            number: '211',
            prompt: false,
        }
        call(args).catch((error) => console.log(error));
    }

    setModalFinishVisible(isVisible){
        this.setState({isModalFinishVisible: isVisible});
    }

    setModalReportVisible(isVisible){
        this.setState({isModalReportVisible: isVisible});
    }

    finishTransaction(){
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();
        var seconds = new Date().getSeconds();
        var timeEnded = hours + ':' + minutes + ':' + seconds;
        var bookingId = this.props.data.bookingID;
        var data = {
            timeStarted: this.state.display,
            timeEnded,
            bookingID: this.props.data.bookingID, 
            roomSocket: this.props.data.roomSocket}
        this.setState({isModalFinishVisible: false},() => {
            localhost = getIpAddress()
            request.post(localhost + '/api/bookings/service/' + bookingId)  
                .send({bookingID: bookingId, type: 'accept',timeEnded,timeStarted: this.state.timeStarted}) 
                .finish((error,res) => {
                    if(!error){
                        socketAction('serviceFinish',data); 
                    }
                })  
        });
    }

    reportSubmit(){
        if(this.state.selectedReport != ''){
            var bookingId = this.props.data.bookingID;
            localhost = getIpAddress()
            request.post(localhost + '/api/reports/quick/')
            .send({
                transactionID: bookingId,
                userID: this.state.userID,
                reportType: this.state.selectedReport,
                reportComment: this.state.reportComment || 'EMERGENCY REPORT'
            })
            .finish((error,res) => {
                if(!error){
                    alert('Report Submitted.');
                }
            })
        }else{
            alert('Please select a report type.');
        }
    }

    cancel(){
        Alert.alert('Cancel transaction','Penalty fee will apply. Are you sure to cancel transaction?',[
            {
                text:'Yes', onPress: () => { 
                    var hours = new Date().getHours();
                    var minutes = new Date().getMinutes();
                    var seconds = new Date().getSeconds();
                    var timeEnded = hours + ':' + minutes + ':' + seconds;
                    var bookingId = this.props.data.bookingID;
                    var userType = this.state.userType;
                    var userID = this.state.userID;
                    var data = {
                        timeStarted: this.state.display,
                        timeEnded,
                        bookingID: this.props.data.bookingID, 
                        roomSocket: this.props.data.roomSocket}
                    this.setState({isModalFinishVisible: false},() => {
                        localhost = getIpAddress()
                        request.post(localhost + '/api/bookings/service/' + bookingId)  
                            .send({bookingID: bookingId, type: 'cancelTransaction',userID,userType,timeEnded,timeStarted: this.state.timeStarted}) 
                            .finish((error,res) => {
                                if(!error){
                                    socketAction('serviceCancel',data); 
                                }
                            })  
                        });}
            },
            {text:'No'}
        ])
    }

    render(){
        return(
            <View style = {styles.container}>
                <Loading isLoading = {this.state.isLoading}/>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerTitle}> Time started: </Text>
                    <Text style = {styles.headerContent}>{this.state.display}</Text> 
                    <Text style = {styles.headerSubtitle}> {this.state.date}</Text> 
                </View>     
                <View style = {styles.btnContainer}> 
                    <TouchableOpacity
                        style = {[styles.btnWrapper,styles.btnRed]}
                        onPress = {() => this.setModalReportVisible(true)}
                    >
                        <Text style = {styles.btnText}> Report </Text>
                    </TouchableOpacity>  
                    <TouchableOpacity
                        style = {[styles.btnWrapper,styles.btnRed]}
                        onPress = {() => this.call()}
                    >
                        <Text style = {styles.btnText}> Emergency </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity
                        style = {[styles.btnWrapper,styles.btnRed]}
                        onPress = {() => this.cancel()}
                    >
                        <Text style = {styles.btnText}> Cancel </Text>
                    </TouchableOpacity>                   
                    {this.state.userType != 2?
                    <TouchableOpacity
                        style = {[styles.btnWrapper,styles.btnGreen]}
                        onPress = {() => this.setModalFinishVisible(true)}
                    >
                        <Text style = {styles.btnText}> Finish </Text>
                    </TouchableOpacity> : null} 
                </View>        
                <Modal 
                    isVisible = {this.state.isModalFinishVisible}
                    onBackButtonPress = {() => this.setModalFinishVisible(false)}
                    onBackdropPress = {() => this.setModalFinishVisible(false)}
                >
                    <View style = {styles.modalContainer}>
                        <Text style = {styles.modalText}> 
                            Are you sure your handyman is done rendering his service?
                        </Text>
                        <View style = {styles.btnModalContainer}> 
                            <TouchableOpacity
                                style = {[styles.btnModal,styles.btnGreen]}
                                onPress = {() => this.finishTransaction()}
                            >
                                <Text style = {styles.btnText}> Yes </Text>
                            </TouchableOpacity>                    
                            <TouchableOpacity
                                style = {[styles.btnModal,styles.btnRed]}
                                onPress = {() => this.setModalFinishVisible(false)}
                            >
                                <Text style = {styles.btnText}> No </Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                </Modal>  
                <Modal
                    isVisible = {this.state.isModalReportVisible}
                    onBackButtonPress = {this.setModalReportVisible.bind(this,false)}
                    onBackdropPress = {this.setModalReportVisible.bind(this,false)}
                >
                    <View style = {styles.modalContainer}>
                        <View style = {styles.headerWrapper}>
                            <View style = {{justifyContent: 'center'}}>
                                <Text style = {styles.txtTitle}> Report </Text>                                
                            </View>
                            <View style = {{justifyContent: 'center'}}>
                                <TouchableOpacity onPress = {this.setModalReportVisible.bind(this,false)} >
                                    <MaterialIcons name = {'close'} size = {30} color = {'white'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ModalDropdown 
                            options = {this.state.reportType}
                            textStyle = {styles.dropdownButton}
                            dropdownStyle = {styles.dropdownList}
                            dropdownTextStyle = {styles.dropdownText}
                            defaultValue = {'Please select type of report...'}
                            onSelect = {(index,value) => this.setState({selectedReport: value})}
                        />
                        <TextInput 
                            placeholder = {'What happened?'}    
                            placeholderTextColor = {'rgba(255,255,255,0.5)'}                
                            underlineColorAndroid = "transparent"
                            style = {styles.txtInput}
                            multiline = {true}
                            onChangeText = {(text) => this.setState({reportComment: text})}
                        />
                        <View style = {styles.btnReportContainer}>                          
                            <TouchableOpacity 
                                onPress = {this.reportSubmit.bind(this)} 
                                style = {styles.formButtonContainer}
                            >
                                <Text> REPORT </Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default ServiceStart;