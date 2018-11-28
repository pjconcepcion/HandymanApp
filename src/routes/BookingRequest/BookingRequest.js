import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView   
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ListItem} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './BookingRequestStyles';
import {socketAction} from '../../Socket/socket';
import {getID} from '../../../Auth/auth'
import request from '../../util/request';
import localhosts,{getIpAddress} from '../../util/localhost';

var sizeOf = require('object-sizeof');

class BookingRequest extends React.Component {
    constructor(props){
        super(props)       
        this.state = {
            timer: 30,
            timerInterval: '',
        }
        this.cancel = this.cancel.bind(this);
        this.accept = this.accept.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount(){
        let timer = setInterval(() => {
            var time = this.state.timer;
            time -= 1;
            this.setState({timer: time});
            if(time == 0){
                clearInterval(timer);
                this.cancel(this.props.data);
            }

        },1000);
        this.setState({timerInterval: timer});
    }


    cancel(data){
        clearInterval(this.state.timerInterval);
        socketAction('cancelBookRequest',data.socketID);
    }

    accept(data){  
        clearInterval(this.state.timerInterval);
        getID().then((userID) => {
            data.handymanID = userID;
            localhost = getIpAddress()
            request.post(localhost + '/api/bookings/' + data.bookingID)
                .send({data})
                .finish((error,res) => {
                    if(!error){
                        data.transactionID = res.body;
                        socketAction('acceptRequest',data); 
                    }               
                })
        })
    }
        
    renderItem(item){
        return (
            item.map((value,index) =>
                <Text key = {index} style = {styles.txtSubtitle}> 
                    • {value.description} 
                </Text>
            )
        );
    }

    render(){
        const {data} = this.props;  
        var firstName = data.name.firstName;
        var middleName = data.name.middleName? (data.name.middleName.substring(0,1) + '.') : '';
        var lastName = data.name.lastName;
        var address = data.address.houseNo? 
            (data.address.houseNo + ' ' + data.address.street + ' ' + data.address.barangay + ', '+ 
            data.address.city) : ''; 

        var service = {
            title: data.service,
            subtitle: 'Service',
            icon: 'format-paint',
        }
        var choices = data.newForm;        
        var optionList = {
            subtitle: 'Option',
            icon: 'build',
        }    
    
        var otherList = [
            {            
                title: data.fare,
                subtitle: 'Cost',
                icon: 'attach-money',
            },{            
                title: data.remarks || 'No Remarks',
                subtitle: 'Remarks',
                icon: 'comment',
            }
        ]

        return(
            <View style = {styles.container}>
                <View style = {styles.headerContainer}>                                       
                    <TouchableOpacity
                            style = {styles.btnWrapper}
                            onPress = {() => this.cancel(data)}
                    >
                        <MaterialIcons name = {'close'} size = {30} color = {'#ecf0f1'}/>  
                    </TouchableOpacity>            
                </View> 
                <View style = {styles.timerContainer}>
                    <Text  style = {styles.txtTime}> Time left:
                        <Text style = {[styles.txtTimer,
                            this.state.timer < 10? styles.red : '']}>  {this.state.timer} </Text> 
                    </Text>
                </View>
                <ScrollView style = {styles.contentContainer} showsHorizontalScrollIndicator> 
                    <ListItem
                        title = {firstName + ' ' + middleName + ' '+ lastName}
                        subtitle = {'Customer name'}
                        leftIcon = {{name: 'account-circle', size: 30,color: 'white'}}
                        titleStyle = {styles.txtTitle}
                        subtitleStyle = {styles.txtSubtitle}
                        hideChevron
                    />
                    <ListItem
                        title = {address}
                        subtitle = {'Address'}
                        leftIcon = {{name: 'home', size: 30,color: 'white'}}
                        titleStyle = {styles.txtTitle}
                        subtitleStyle = {styles.txtSubtitle}
                        hideChevron
                    />
                    <ListItem
                        title = {service.title}
                        subtitle = {service.subtitle}
                        leftIcon = {{name: service.icon, size: 30,color: 'white'}}
                        titleStyle = {styles.txtTitle}
                        subtitleStyle = {styles.txtSubtitle}
                        hideChevron
                    />      
                    <ListItem 
                        subtitle = {
                            <View>
                                {choices.map((item,index) =>
                                    <View key = {index}> 
                                        <Text style = {styles.txtTitle}> {item.title}</Text>
                                        {this.renderItem(item.choices)}
                                    </View>
                                )}
                            </View>
                        }
                        leftIcon = {{name: optionList.icon, size: 30,color: 'white'}}
                        titleStyle = {styles.txtTitle}
                        subtitleStyle = {styles.txtSubtitle}
                        hideChevron
                    />
                    {
                        otherList.map((item,index) =>      
                            <ListItem
                                key = {index}
                                title = {item.title}
                                subtitle = {item.subtitle}
                                leftIcon = {{name: item.icon, size: 30,color: 'white'}}
                                titleStyle = {styles.txtTitle}
                                subtitleStyle = {styles.txtSubtitle}
                                hideChevron
                            />  
                        )   
                    }              
                </ScrollView>
                <View style = {styles.btnContainer}>                     
                    <TouchableOpacity
                        style = {styles.btnWrapper}
                        onPress = {() => this.accept(data)}
                    >
                        <View style = {styles.btn}>
                            <Text style = {styles.btnText}> Accept </Text>
                        </View>
                    </TouchableOpacity> 
                </View>          
            </View>
        );
    }
}

export default BookingRequest;