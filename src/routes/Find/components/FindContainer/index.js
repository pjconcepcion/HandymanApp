import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';
import {CheckBox } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './FindContainerStyles';
import {socketAction} from '../../../../Socket/socket';

export const FindContainer = ({modalVisible,setModalVisible,services,setService,region,points}) => {
    
    function findBooking(){
        var selectedService = {services: [],region:{}};
        var selectValid = false;
        services.map((item,index) => {
            if(item.isSelected){
                selectedService.services.push(item.name);
                selectValid = true;
            }
        })

        if(points > 150){
            if(selectValid){
                selectedService.region = region;
                socketAction('find',selectedService);
                Actions.push('searching');
                displayModal(false);
            }else{
                alert('Please select a service/s');
            }
        }else{
            alert('You have less than 150 points. Please top-up to have more points.');
        }
    }
        
    function displayModal(isVisible){
        setModalVisible(isVisible);
    }

    function selectService(index){
        setService(index);
    }

    return(
        <Modal
            isVisible = {modalVisible}
            onBackButtonPress = {displayModal.bind(this,false)}
            onBackdropPress = {displayModal.bind(this,false)}
        >
            <View style = {styles.modalContainer}>
                <View style = {styles.headerWrapper}>
                    <View style = {{justifyContent: 'center'}}>
                        <Text style = {styles.txtTitle}> Find </Text>                                
                    </View>
                    <View style = {{justifyContent: 'center'}}>
                        <TouchableOpacity onPress = {displayModal.bind(this,false)} >
                            <MaterialIcons name = {'close'} size = {30} color = {'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.formWrapper}>
                    <Text style = {styles.txtLabel}> Select service/s: </Text>             
                </View>
                <ScrollView>
                    {services.map((item,index) => 
                        <CheckBox 
                            key = {index}
                            title = {item.name}
                            checked = {item.isSelected}
                            onPress = {selectService.bind(this,index)}
                            checkedIcon = 'check-square'
                            checkedColor = '#FFC107'
                            uncheckedIcon = 'square'
                            uncheckedColor = "white"
                            containerStyle = {styles.chkBoxContainer}
                            textStyle = {styles.chkBoxText}
                        />                          
                    )}
                </ScrollView>
                <View style = {styles.btnContainer}>                          
                    <TouchableOpacity 
                        onPress = {findBooking.bind(this)} 
                        style = {styles.formButtonContainer}
                    >
                        <Text> FIND NOW </Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </Modal>
    );
}

export default FindContainer;
