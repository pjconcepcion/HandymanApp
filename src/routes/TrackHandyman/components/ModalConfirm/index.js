import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import styles from './ModalConfirmStyles'
import Modal from 'react-native-modal';
import {Avatar,Rating,ListItem} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {socketAction} from '../../../../Socket/socket';

export const ModalConfirm = ({
    confirmModalVisible,
    setConfirmModalVisible,
    confirmType,
    roomSocket,
    bookingID,
    userType,
    userID,
    reasonBoxMessage,
    setReasonBoxMessage,
    customerSocket, handymanSocket,
    cancelTransaction,
    timeInterval
}) => {

    function closeConfirmModal(){
        setConfirmModalVisible(false);
    }
    
    function confirmMessage(){
        if(confirmType == 'arrival'){
            return 'Does the handyman already arrived?';
        }else{
            if(userType == 1){
                return 'Do you wish to cancel transaction? If yes, Penalty fee (%20 of the fare) will deduct to your points';
            }else{
                return 'Do you wish to cancel transaction? If yes, Penalty fee (%15 of the fare) will apply to your next transaction';
            }
        }
    }

    function onPressYes(){
        if(confirmType == 'arrival'){
            clearInterval(timeInterval);
            closeConfirmModal();
            var data = {bookingID,roomSocket}
            socketAction('handymanArrived',data);
        }else{
            if(reasonBoxMessage.trim() != ''){
                var userSocket = userType == 1? customerSocket : handymanSocket 
                var cancelled = true;
                var data = {bookingID,roomSocket,userID,userType,reasonBoxMessage,userSocket,cancelled};                
                setConfirmModalVisible(false);
                clearInterval(timeInterval);
                cancelTransaction(userType);
                socketAction('cancelTransaction',data);
            }else{
                alert('Please enter a reason.');
            }
        }
        
    }

    function onChangeReasonBox(text){
        setReasonBoxMessage(text);
    }

    return(
        <Modal
            isVisible = {confirmModalVisible}
            onBackButtonPress = {() => closeConfirmModal()}
            onBackdropPress = {() => closeConfirmModal()}
        >
            <View style = {styles.container}>
                <View style = {styles.contentContainer}>
                    
                    <Text style = {styles.txtContent}>
                        {confirmMessage()}
                    </Text>
                    {confirmType == 'cancel'?
                        <TextInput 
                            placeholder = {'Enter reason...'}
                            placeholderTextColor = {'rgba(0,0,0,0.5)'}
                            style = {styles.txtReasonBox}
                            underlineColorAndroid = "transparent"
                            onChangeText = {(text) => onChangeReasonBox(text)}
                        /> : null
                    }
                </View>                
                <View style = {styles.btnContainer}>
                    <TouchableOpacity 
                        style = {[styles.btn,
                            confirmType == 'arrival'? styles.btnGreen : styles.btnRed]}
                        onPress = {() => onPressYes()}
                    >
                        <Text style = {styles.btnTxt}> Yes </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {[styles.btn,
                            confirmType == 'arrival'? styles.btnRed : styles.btnGreen ]}
                        onPress = {() => closeConfirmModal()}
                    >
                        <Text style = {styles.btnTxt}> No </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default ModalConfirm;