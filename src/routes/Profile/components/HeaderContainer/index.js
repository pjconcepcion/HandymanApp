import React from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './HeaderContainerStyles';

const HeaderContainer = ({name,profilePicture,type,setModalPayment,points}) => {    
    var firstName = name.firstName;
    var middleName = name.middleName? (name.middleName.substring(0,1) + '.') : '';
    var lastName = name.lastName;

    function goToSettings(){
        Actions.settings();
    }

    function openPaymentModal(){
        setModalPayment(true);
    }

    return(
        <View style = {styles.headerContainer}>
            <View style = {styles.headerContent}>
                {type == 2? <Text style = {styles.txtPoints}> Points: {points}</Text> : null}
                <View style = {styles.btnHeaderContainer}>
                {type == 2?
                    <TouchableOpacity
                        onPress = {() => openPaymentModal()}
                        style = {styles.btnStyle}
                    >
                        <MaterialIcons name = {'account-balance-wallet'} size = {30} color = {'white'}/>
                    </TouchableOpacity> : null}
                    <TouchableOpacity
                        onPress = {() => goToSettings()}
                        style = {styles.btnStyle}
                    >
                        <MaterialIcons name = {'edit'} size = {30} color = {'white'}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.avatarContainer}>
                <Avatar 
                    xlarge
                    rounded
                    source = {profilePicture?{uri: profilePicture} : require('../../../../assets/profile1.png')}
                    avatarStyle = {{borderWidth: 2, borderColor: 'white'}}
                    containerStyle = {{borderWidth: 2, borderColor: 'white'}}
                />
            </View>
            <View style = {styles.nameContainer}>                 
                <Text style = {styles.txtName}> 
                    {firstName + ' ' + middleName + ' ' + lastName}
                </Text>
            </View>
        </View>
    );
}

export default HeaderContainer