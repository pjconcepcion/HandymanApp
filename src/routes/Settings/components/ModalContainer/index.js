import React from 'react';
import {
    View, 
    Text, 
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {ImagePicker} from 'expo';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker  from 'react-native-datepicker';
import {Avatar} from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './ModalContainerStyles';

const displayModalType = (
    type,
    setName,
    setAddress,
    setEmail,
    setContact,
    setPassword,
    setBirthDate,
    setGender,
    setQuestion,questions,securityQuestion,
    editProfile,profileData,
    setAnswer,
    setImage,
    setEmergency
    ) => {

    function onChangeName(type,text){
        setName(type,text);
    }

    function onChangeAddress(type,text){
        setAddress(type,text);
    }

    function onChangeEmail(text){
        setEmail(text);
    }

    function onChangeContact(text){
        setContact(text);
    }

    function onChangePassword(type,text){
        setPassword(type,text);
    }
    
    function onChangeBirthDate(date){
        setBirthDate(date);
    }

    function onChangeGender(gender){
        setGender(gender);
    }
    
    function onChangeQuestion(index){
        setQuestion(index);
    }

    function onChangeAnswer(type,text){
        setAnswer(type,text);
    }

    function onChangeEmergency(type,text){
        setEmergency(type,text);
    }

    async function openImagePicker(){
        var image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            quality: 0.5,
            base64: true,
        });

        if(!image.cancelled){
            setImage('data:image/jpeg;base64,' + image.base64);
        }
    }

    if(type == 'Name'){
        return (
            <View style = {styles.modalContentContainer}>
                <TextInput 
                    placeholder = {'First name'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    onChangeText = {(text) => onChangeName('firstName',text)}
                    value = {editProfile.editName.firstName == null? 
                            profileData.name.firstName : editProfile.editName.firstName}
                />                    
                <TextInput 
                    placeholder = {'Middle name'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    onChangeText = {(text) => onChangeName('middleName',text)}
                    value = {editProfile.editName.middleName == null? 
                            profileData.name.middleName : editProfile.editName.middleName}
                />                    
                <TextInput 
                    placeholder = {'Last name'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    onChangeText = {(text) => onChangeName('lastName',text)}
                    value = {editProfile.editName.lastName == null? 
                            profileData.name.lastName : editProfile.editName.lastName}
                />       
            </View>
        );
    }
    else if(type == 'Address'){
        return (
            <View style = {styles.modalContentContainer}>
                <TextInput 
                    placeholder = {'House No'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    onChangeText = {(text) => onChangeAddress('houseNo',text)}
                    value = {editProfile.editAddress.houseNo == null? 
                            profileData.address.houseNo : editProfile.editAddress.houseNo}
                />                    
                <TextInput 
                    placeholder = {'Street'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    onChangeText = {(text) => onChangeAddress('street',text)}
                    value = {editProfile.editAddress.street == null? 
                            profileData.address.street : editProfile.editAddress.street}
                />                    
                <TextInput 
                    placeholder = {'Barangay'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    onChangeText = {(text) => onChangeAddress('barangay',text)}
                    value = {editProfile.editAddress.barangay == null? 
                            profileData.address.barangay : editProfile.editAddress.barangay}
                />                    
                <TextInput 
                    placeholder = {'City'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    onChangeText = {(text) => onChangeAddress('city',text)}
                    value = {editProfile.editAddress.city == null? 
                            profileData.address.city : editProfile.editAddress.city}
                />        
            </View>
        );
    }
    else if(type == 'Birthdate'){
        return (
            <View style = {styles.modalContentContainer}>   
                <DatePicker 
                    style = {{width: '100%'}}
                    placeholder = {'Set your birthdate'}
                    date = {editProfile.editBirthDate == ''? profileData.birthDate : editProfile.editBirthDate}
                    mode = "date"
                    format = "YYYY-MM-DD"
                    minDate = '1940-01-01'
                    maxDate = '2000-12-31'
                    confirmBtnText = 'Confirm'
                    cancelBtnText  = 'Cancel'
                    customStyles = {{
                        dateInput:{
                            borderColor: 'transparent',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start',
                            borderBottomColor: 'rgba(255,255,255,0.5)',
                            borderBottomWidth: 1,
                        },
                        dateText:{
                            color: 'white',
                            fontSize: 22,
                        },
                        placeholderText:{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 22,
                        },
                    }}
                    onDateChange = {(date) => onChangeBirthDate(date)}
                />    
            </View>
        );
    }
    else if(type == 'Gender'){
        var selected = '';
        if(editProfile.editGender.male){
            selected = 'male';
        }
        else if(editProfile.editGender.female){
            selected = 'female';
        }else{
            selected = profileData.gender == 1? 'male' : 'female'
        }

        return (
            <View style = {styles.modalContentContainer}>    
                <View style = {styles.btnGenderContainer}>
                    <TouchableOpacity 
                        onPress = {() => onChangeGender(true)}
                        style = {[styles.btnGender,
                            selected == 'male'? {
                                backgroundColor: '#4CAF50'
                            }: {backgroundColor: 'white'}]}
                    >
                        <Text> Male </Text>
                    </TouchableOpacity>                    
                    <TouchableOpacity 
                        onPress = {() => onChangeGender(false)}   
                        style = {[styles.btnGender,
                            selected == 'female'?{
                                backgroundColor: '#EC407A'
                            }: {backgroundColor: 'white'}]}                 
                    >
                        <Text> Female </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    else if(type == 'Email Address'){
        return (
            <View style = {styles.modalContentContainer}>   
                <TextInput 
                    placeholder = {'Email Address'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    keyboardType = {'email-address'}
                    onChangeText = {(text) => onChangeEmail(text)}
                    value = {editProfile.editEmail == null? profileData.email : editProfile.editEmail}
                />              
            </View>
        );
    }
    else if(type == 'Contact'){
        return (
            <View style = {styles.modalContentContainer}>
                <TextInput 
                    placeholder = {'Contact Number'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    keyboardType = {'numeric'}
                    onChangeText = {(text) => onChangeContact(text)}
                    value = {editProfile.editContact == null? profileData.contact : editProfile.editContact}
                />                       
            </View>
        );
    }
    else if(type == 'Password'){
        return (
            <View style = {styles.modalContentContainer}>
                <TextInput 
                    placeholder = {'Current Password'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    secureTextEntry = {true}
                    onChangeText = {(text) => onChangePassword('currentPassword',text)}
                />                    
                <TextInput 
                    placeholder = {'New Password'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    secureTextEntry = {true}
                    onChangeText = {(text) => onChangePassword('newPassword',text)}
                />                    
                <TextInput 
                    placeholder = {'Re-enter new password'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    secureTextEntry = {true}
                    onChangeText = {(text) => onChangePassword('reNewPassword',text)}
                />         
            </View>
        );
    }
    else if(type == 'Security Question'){
        return (
            <View style = {styles.modalContentContainer}>            
                <Dropdown 
                    label = {'Please select a question...'}
                    data = {questions}
                    baseColor = 'white'
                    textColor = 'white'
                    itemColor = 'white'
                    fontSize = {20}
                    containerStyle = {styles.dropdownContainer}
                    pickerStyle = {styles.pickerStyle}
                    itemCount = {3}
                    onChangeText = {(value,index) => onChangeQuestion(index)}
                />             
                <TextInput 
                    placeholder = {'Enter current answer'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    secureTextEntry = {true}
                    onChangeText = {(text) => onChangeAnswer('currentAnswer',text)}
                />                       
                <TextInput 
                    placeholder = {'Enter new answer'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    secureTextEntry = {true}
                    onChangeText = {(text) => onChangeAnswer('newAnswer',text)}
                />                 
                <TextInput 
                    placeholder = {'Re-enter answer'}
                    placeholderTextColor = {"#78909C"}
                    style = {styles.txtInput}
                    underlineColorAndroid = {'transparent'}
                    secureTextEntry = {true}
                    onChangeText = {(text) => onChangeAnswer('reNewAnswer',text)}
                /> 
            </View>
        );
    }
    else if(type == 'Profile picture'){
        return (
            <View style = {styles.modalContentContainer}>
                <TouchableOpacity style = {styles.btnGenderContainer} onPress = {() => openImagePicker()}>  
                    {editProfile.editImage?
                        <Avatar 
                            xlarge
                            rounded
                            source = {{uri: editProfile.editImage}}
                            avatarStyle = {{borderWidth: 2, borderColor: 'white'}}
                            containerStyle = {{borderWidth: 2, borderColor: 'white'}}
                        /> :
                        <MaterialIcon name = {'photo-size-select-actual'} size = {70} color = {'white'}/> 
                    }
                </TouchableOpacity>
            </View>
        );   
    }
    else if(type == 'Contact Person'){
        return (
            <View style = {styles.modalContentContainer}>
                    <TextInput 
                        placeholder = {'Name of Contact Person'}
                        placeholderTextColor = {"#78909C"}
                        style = {styles.txtInput}
                        underlineColorAndroid = {'transparent'}
                        onChangeText = {(text) => onChangeEmergency('contactPerson',text)}
                        value = {editProfile.editEmergency.contactperson == null? 
                                profileData.contactPerson.emergencyPerson : editProfile.editEmergency.contactperson}
                    />                    
                    <TextInput 
                        placeholder = {'Contact number of Person'}
                        placeholderTextColor = {"#78909C"}
                        style = {styles.txtInput}
                        underlineColorAndroid = {'transparent'}
                        onChangeText = {(text) => onChangeEmergency('contactNumber',text)}
                        value = {editProfile.editEmergency.contactNumber == null? 
                                profileData.contactPerson.emergencyNumber : editProfile.editEmergency.contactNumber}
                    />                    
                    <TextInput 
                        placeholder = {'Relationship with that person'}
                        placeholderTextColor = {"#78909C"}
                        style = {styles.txtInput}
                        underlineColorAndroid = {'transparent'}
                        onChangeText = {(text) => onChangeEmergency('relationship',text)}
                        value = {editProfile.editEmergency.lastName == null? 
                                profileData.contactPerson.emergencyRelationship : editProfile.editEmergency.relationship}
                    />       
                </View>
        );
    }else{
        return null;
    }
}
const ModalContainer = ({
    setModal,
    modalSettings,
    saveEdit,
    setName,
    setAddress,
    setEmail,
    setContact,
    setPassword,
    setBirthDate,
    setGender,
    setQuestion,questions,securityQuestion,
    editProfile,profileData,
    resetSettings,
    setAnswer,
    setImage,
    setEmergency}) => {

    function closeModal(){
        resetSettings();
        setModal('',false);
    }
    
    function onPressSave(type){
        if(isValidate(type)){
            saveEdit(type);
        }
    }

    function isValidate(type){
        if(type == 'Password'){
            if(editProfile.editPassword.newPassword ==  editProfile.editPassword.reNewPassword){
                if(editProfile.editPassword.currentPassword == ''){
                    alert('Please enter your current password.');
                    return false;
                }
                else if(profileData.password != editProfile.editPassword.currentPassword){
                    alert('Current password did not match.');
                    return false;
                }
            }else{
                alert('You must enter the same password twice in order to comfirm it.');
                return false;
            }
        }
        else if(type == 'Security Question'){  
            if(editProfile.editQuestion.currentAnswer !== null || editProfile.editQuestion.reNewAnswer !== null){
                if(editProfile.editQuestion.newAnswer == '' || editProfile.editQuestion.reNewAnswer == ''){
                    alert('Please fill up the answers field');
                    return false;
                }else{      
                    if(editProfile.editQuestion.newAnswer == editProfile.editQuestion.reNewAnswer){
                        if(editProfile.editQuestion.currentAnswer !== null){
                            if(securityQuestion.answer != editProfile.editQuestion.currentAnswer){
                                alert('Current answer did not match.');
                                return false;
                            }
                        }                
                    }else{
                        alert('You must enter the same answer twice in order to comfirm it.');
                        return false;
                    } 
                }    
            }
            if(editProfile.editQuestion.question == null){
                alert('Please select a question');
                return false
            }
            
        }
        else if(type == 'Name'){
            let error = 'Please fill up your\n';
            let valid = true;
            if(editProfile.editName.firstName != null){
                if(editProfile.editName.firstName.trim() == ''){
                    error = error.concat('• First Name\n');
                    valid = false;
                }
            }
            if(editProfile.editName.middleName != null){
                if(editProfile.editName.middleName.trim() == ''){
                    error = error.concat('• Middle Name\n');
                    valid = false;
                }
            }
            if(editProfile.editName.lastName != null){
                if(editProfile.editName.lastName.trim() == ''){
                    error = error.concat('• Last Name\n');
                    valid = false;
                }
            }
            if(!valid){
                alert(error);
            }
            return valid;
        }
        else if(type == 'Address'){
            let error = 'Please fill up your\n';
            let valid = true;
            if(editProfile.editAddress.houseNo != null){
                if(editProfile.editAddress.houseNo.trim() == ''){
                    error = error.concat('• House No\n');
                    valid = false;
                }
            }
            if(editProfile.editAddress.street != null){
                if(editProfile.editAddress.street.trim() == ''){
                    error = error.concat('• Street\n');
                    valid = false;
                }
            }
            if(editProfile.editAddress.barangay != null){
                if(editProfile.editAddress.barangay.trim() == ''){
                    error = error.concat('• Barangay\n');
                    valid = false;
                }
            }
            if(editProfile.editAddress.city != null){
                if(editProfile.editAddress.city.trim() == ''){
                    error = error.concat('• City\n');
                    valid = false;
                }
            }

            if(!valid){
                alert(error);
            }
            return valid;
        }
        if(type == 'Contact' || type == 'Email Address'){
            alert('Please fill up your \n• ' + type);
            return false;
        }

        return true;
    }

    return(            
        <Modal
            isVisible = {modalSettings.isVisible}
            onBackButtonPress = {closeModal.bind(this)}
            onBackdropPress = {closeModal.bind(this)}
        >
            <View style = {styles.modalContainer}>
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headerTitle}> {modalSettings.modalType} </Text>
                    <TouchableOpacity onPress = {closeModal.bind(this)}>
                        <MaterialIcon name = {'close'} size = {30} color = {'white'}/>
                    </TouchableOpacity>
                </View>
                {
                    displayModalType(modalSettings.modalType,
                        setName,
                        setAddress,
                        setEmail,
                        setContact,
                        setPassword,
                        setBirthDate,
                        setGender,
                        setQuestion,questions,securityQuestion,
                        editProfile,profileData,
                        setAnswer,
                        setImage,
                        setEmergency)
                }
                <View style = {styles.btnContainer}>
                    <TouchableOpacity 
                        style = {styles.btnSave}
                        onPress = {onPressSave.bind(this,modalSettings.modalType)}
                    >
                        <Text> Save </Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </Modal>
    );
}

export default ModalContainer;   