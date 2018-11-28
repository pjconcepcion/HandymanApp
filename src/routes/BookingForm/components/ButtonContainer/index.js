import React from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ButtonContainerStyles';
import {socketAction} from '../../../../Socket/socket';

export const Button = ({validateBook}) => {

    function submitBooking(){
        validateBook()
    }

    return(
        <TouchableOpacity style = {styles.container} onPress = {() => submitBooking()}>   
            <Text style = {styles.btnText}> BOOK NOW </Text>
        </TouchableOpacity>
    );
}

export default Button;


