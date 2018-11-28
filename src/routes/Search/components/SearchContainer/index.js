import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './SearchContainerStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const SearchContainer = ({verifiedFlag,setReferral,isReferring}) => {

    function displayBookingForm(){      
        if(verifiedFlag){
            Actions.push('bookingform');
        }else{
            alert('Your account is not yet verified.');
        }
    }   

    function referBook(){
        setReferral(true);
    }
    
    return(
        <View>            
            <View style = {styles.btnWrapper}>
                {!isReferring &&
                    <TouchableOpacity 
                        style = {styles.referContainer}
                        onPress = {referBook.bind(this)}
                    >
                        <MaterialCommunityIcons name = {'share'} size = {25} color = {'white'}/>
                    </TouchableOpacity>
                }
                {!isReferring &&
                    <TouchableOpacity 
                        style = {styles.btnContainer}
                        onPress = {displayBookingForm.bind(this)}
                    >
                        <MaterialIcons name = {'search'} size = {35} color = {'white'}/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

export default SearchContainer;