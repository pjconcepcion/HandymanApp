import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import styles from './ModalPaymentContainerStyles'
import Modal from 'react-native-modal';
import {Avatar,Rating,ListItem} from 'react-native-elements';
import {RadioGroup,RadioButton} from 'react-native-flexi-radio-button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ModalPayment = ({isModalVisible,setModalPayment,setValue,selectedIndex,paymentValue,requestLoad}) => {

    function closePaymentModal(){
        setModalPayment(false);
    }

    function onSubmit(){
        requestLoad();
    }

    return(
        <Modal
            isVisible = {isModalVisible}
            onBackButtonPress = {() => closePaymentModal()}
        >
            <View style = {styles.container}>
                <View style = {styles.headerWrapper}>
                    <View style = {{justifyContent: 'center'}}>
                        <Text style = {styles.txtTitle}> TOP-UP </Text>                                
                    </View>
                    <View style = {{justifyContent: 'center'}}>
                        <TouchableOpacity onPress = {() => closePaymentModal()} >
                            <MaterialIcons name = {'close'} size = {30} color = {'white'} />
                        </TouchableOpacity>
                    </View>
                </View>  
                <View>                    
                    <RadioGroup
                        size = {24}
                        thickness = {2}
                        color = 'white'
                        activeColor = '#FFC107'
                        onSelect = {(index, value) => setValue(index,value)}
                        selectedIndex = {selectedIndex}
                    >
                        <RadioButton key = {'100'} value = {100}>
                            <Text style = {styles.optionText}> {100}</Text>
                        </RadioButton>
                        <RadioButton key = {'200'} value = {200}>
                            <Text style = {styles.optionText}> {200}</Text>
                        </RadioButton>
                        <RadioButton key = {'500'} value = {500}>
                            <Text style = {styles.optionText}> {500}</Text>
                        </RadioButton>
                        <RadioButton key = {'1000'} value = {1000}>
                            <Text style = {styles.optionText}> {1000}</Text>
                        </RadioButton>
                    </RadioGroup>
                    <TextInput
                        placeholder = 'If others, please specify here..'
                        placeholderTextColor = "rgba(255,255,255,0.5)"
                        style = {styles.txtInput}
                        underlineColorAndroid = "transparent"
                        onChangeText = {(text) => setValue(-1,text)}
                        keyboardType = 'numeric'
                    />
                </View>            
                <View style = {styles.btnContainer}>
                    <TouchableOpacity 
                        style = {styles.btnClose}
                        onPress = {() => onSubmit()}
                    >
                        <Text> Request </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default ModalPayment;