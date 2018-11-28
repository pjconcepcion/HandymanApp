import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './PlaceContainerStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const PlaceContainer = ({verifiedFlag,setReferral,searchPlace,setAddress,referAddress,referrable,getCurrentLocation}) => {

    function referBook(){
        getCurrentLocation();
        setReferral(false);
    }

    function onChangePlace(text){
        searchPlace(text);
    }

    function bookNow(){
        if(referrable){
            Actions.push('bookingform',{referAddress});
        }else{
            alert('Invalid address');
        }
    }

    return(
        <View style = {styles.searchContainer}>     
            <Text style = {styles.txtTitle}> Refer Service to a Friend: </Text>
            <View style = {styles.searchContentContainer}>
                <TextInput
                    placeholder = "Enter Street, barangay and City"
                    placeholderTextColor = "#78909C"
                    style = {styles.txtInput}
                    onChangeText = {(text) => onChangePlace(text)}
                    underlineColorAndroid = "transparent"
                />
                <TouchableOpacity 
                    style = {styles.closeBtn}
                    onPress = {referBook.bind(this)}
                >
                    <MaterialIcons name = {'close'} size = {25} color = {'white'}/>
                </TouchableOpacity>
            </View> 
            <TouchableOpacity style = {styles.btnBook} onPress = {bookNow.bind(this)}>   
                <Text style = {styles.btnText}> BOOK NOW </Text>
            </TouchableOpacity>      
        </View>
    );
}

export default PlaceContainer;