import React from 'react';
import {
    View, 
    Text, 
    TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './ModalContainerStyles';

const ModalContainer = ({setModalVisible,modalVisible,notificationData}) => {

    function closeModal(){
        setModalVisible(false);
    }
    
    return(            
        <Modal
            isVisible = {modalVisible}
            onBackButtonPress = {closeModal.bind(this)}
            onBackdropPress = {closeModal.bind(this)}
        >
            <View style = {styles.modalContainer}>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerTitle}> {notificationData.type}</Text>
                    <TouchableOpacity onPress = {closeModal.bind(this)}>
                        <MaterialIcon name = {'close'} size = {30} color = {'white'}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.contentContainer}>
                    <Text style = {styles.message}>{notificationData.message}</Text>                    
                    <Text style = {styles.remarks}>{notificationData.remarks}</Text>
                </View>
                <View style = {styles.btnContainer}>
                    <TouchableOpacity 
                        style = {styles.btnSave}
                        onPress = {closeModal.bind(this)}
                    >
                        <Text> Close </Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </Modal>
    );
}

export default ModalContainer;   