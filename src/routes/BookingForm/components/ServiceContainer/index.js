import React from 'react';
import {
    View,
    Text
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Dropdown} from 'react-native-material-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ServiceContainerStyles';
import {socketAction} from '../../../../Socket/socket';

export const Service = ({services,setService,selectedService}) => {
            
    function selectService(value,index){
        setService(value,index);
    }

    return(
        <View style = {styles.container}>       
            <Dropdown 
                label = {'Please select a service...'}
                data = {services}
                baseColor = 'white'
                textColor = 'white'
                itemColor = 'white'
                fontSize = {20}
                containerStyle = {styles.dropdownContainer}
                pickerStyle = {styles.pickerStyle}
                itemCount = {3}
                onChangeText = {(value,index) => selectService(value,index)}
            />
            <Text style = {styles.amount}> Php {selectedService.amount? selectedService.amount : '0'}</Text>
        </View>
    );
}

export default Service;


