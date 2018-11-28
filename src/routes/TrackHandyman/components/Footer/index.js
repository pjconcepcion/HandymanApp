import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';
import styles from './FooterStyles'
import {Avatar,Rating} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {socketAction} from '../../../../Socket/socket';

export const Footer = ({
    setTrackModalVisible,
    setConfirmModalVisible,
    profile,
    distance,
    message,isMessageRead,setMessage,roomSocket,
    userType}) => {

    function openTrackModalVisible(){
        setTrackModalVisible(true);
    }
    
    function openConfirmModalVisible(type){
        setConfirmModalVisible(true,type);
    }

    function messageUser(){
        var data = {message,roomSocket}
        socketAction('messageUser',data);
    }

    function onChangeMessage(text){
        setMessage(text);
    }

    return(        
        <KeyboardAvoidingView behavior = {'padding'}> 
            {distance != ''? <View style = {styles.distanceContainer}>
                <Text style = {styles.distance}> 
                    Distance: 
                    <Text style = {styles.distanceValue}> {distance} m </Text>
                </Text>
            </View> : null}
            <View style = {styles.chatContainer}>
                <TextInput 
                    placeholder = {'Send a message...'}
                    placeholderTextColor = {'rgba(0,0,0,0.5)'}
                    style = {styles.txtChatBox}
                    underlineColorAndroid = "transparent"
                    onChangeText = {(text) => onChangeMessage(text)}
                />
                <TouchableOpacity 
                    disabled = {isMessageRead} 
                    style = {[styles.btnSendContainer,
                        isMessageRead?{ backgroundColor: '#95a5a6'}:{backgroundColor: '#FFC107'}]} 
                    onPress = {() => messageUser()}
                > 
                        <MaterialIcons name = {'send'} size = {30} color = {'white'} />
                </TouchableOpacity>
            </View>    
            {userType == 2?
                <TouchableOpacity 
                    style = {styles.btnArrive}
                    onPress = {() => openConfirmModalVisible('arrival')}
                > 
                        <Text style = {styles.btnArriveText}> Handyman Arrived</Text> 
                </TouchableOpacity> : null
            }
            <TouchableOpacity onPress = {() => openTrackModalVisible()}> 
                <View style = {styles.container}> 
                    <View style = {styles.avatarContainer}>
                        <Avatar 
                            large
                            rounded
                            source = {require('../../../../assets/profile1.png')}
                        />
                    </View>      
                    <View style = {styles.profileContainer}>
                        <Text style = {styles.name}> {profile.name}</Text>                
                        {profile.rating > -1? 
                            <Rating
                                imageSize = {25}
                                style = {{paddingVertical: 5}}
                                type = {'star_modal'}             
                                readonly = {true}
                                ratingColor = {'#FFC107'}
                                startingValue = {profile.rating}
                            /> : 
                            <Text style = {styles.address}> {profile.address} </Text>   
                        }
                    </View> 
                    <View style = {styles.show}> 
                        <MaterialIcons name = {'remove-red-eye'} size = {25} color = {'#BDBDBD'}/>
                    </View>                
                </View>        
            </TouchableOpacity>
            <View style = {styles.btnCancelContainer}>
                <TouchableOpacity 
                    style = {styles.btnCancel}
                    onPress = {() => openConfirmModalVisible('cancel')}
                >
                    <Text style = {styles.txtCancel}> Cancel </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView> 
    );
}

export default Footer;