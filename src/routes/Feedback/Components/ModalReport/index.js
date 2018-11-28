import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';
import ModalDropdown from 'react-native-modal-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ModalReportStyles';
import {socketAction} from '../../../../Socket/socket';

export const ModalReport = ({
    setModalReportVisible,
    modalReportVisible,
    setReportComment,
    reportType,
    setReportType,
    setDescription,
    submitReport}) => {

    function displayModal(){
        setModalReportVisible(false);
    }

    function onChangeReportType(index,value){
        setReportType(value,index);
    }

    function onChangeReportComment(text){
        setReportComment(text);
    }

    function reportSubmit(){
        submitReport();
        setModalReportVisible(false);
    }

    return(
        <Modal
            isVisible = {modalReportVisible}
            onBackButtonPress = {displayModal.bind(this)}
            onBackdropPress = {displayModal.bind(this)}
        >
            <View style = {styles.modalContainer}>
                <View style = {styles.headerWrapper}>
                    <View style = {{justifyContent: 'center'}}>
                        <Text style = {styles.txtTitle}> Report </Text>                                
                    </View>
                    <View style = {{justifyContent: 'center'}}>
                        <TouchableOpacity onPress = {displayModal.bind(this,false)} >
                            <MaterialIcons name = {'close'} size = {30} color = {'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ModalDropdown 
                    options = {reportType}
                    textStyle = {styles.dropdownButton}
                    dropdownStyle = {styles.dropdownList}
                    dropdownTextStyle = {styles.dropdownText}
                    defaultValue = {'Please select type of report...'}
                    onSelect = {(index,value) => onChangeReportType(index,value)}
                />
                <Text style = {styles.txtDescription}> {setDescription?setDescription :  'Description' }</Text>
                <TextInput 
                    placeholder = {'What happened?'}    
                    placeholderTextColor = {'rgba(255,255,255,0.5)'}                
                    underlineColorAndroid = "transparent"
                    style = {styles.txtInput}
                    multiline = {true}
                    onChangeText = {(text) => onChangeReportComment(text)}
                />
                <View style = {styles.btnContainer}>                          
                    <TouchableOpacity 
                        onPress = {reportSubmit.bind(this)} 
                        style = {styles.formButtonContainer}
                    >
                        <Text> REPORT </Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </Modal>
    );
}

export default ModalReport;
