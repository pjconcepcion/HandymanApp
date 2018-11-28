import React from 'react';
import {View} from 'react-native';
import HeaderContainer from './HeaderContainer';
import ListContainer from './ListContainer';
import ModalContainer from './ModalContainer';

class Settings extends React.Component{ 

    componentDidMount(){
        this.props.getProfile();
        this.props.getQuestions();
        this.props.getMyQuestion();
    }

    render(){
        return(
            <View style = {{flex: 1, backgroundColor: '#0288D1'}}>
                <HeaderContainer />
                <ListContainer 
                    setModal = {this.props.setModal}
                    deleteAllState = {this.props.deleteAllState}
                />
                { this.props.modalSettings.isVisible &&
                    <ModalContainer                        
                        setModal = {this.props.setModal}
                        modalSettings = {this.props.modalSettings} 
                        saveEdit = {this.props.saveEdit}
                        setName = {this.props.setName}
                        setAddress = {this.props.setAddress}
                        setEmail = {this.props.setEmail}
                        setContact = {this.props.setContact}
                        setPassword = {this.props.setPassword}
                        setBirthDate = {this.props.setBirthDate}
                        setGender = {this.props.setGender}
                        setQuestion = {this.props.setQuestion}            
                        setAnswer = {this.props.setAnswer}     
                        setImage = {this.props.setImage}       
                        setEmergency = {this.props.setEmergency}
                        editProfile = {this.props.editProfile}
                        profileData = {this.props.profileData}                        
                        resetSettings = {this.props.resetSettings}
                        securityQuestion = {this.props.securityQuestion}
                        questions = {this.props.questions}
                    /> 
                }              
            </View>
        );
    }
}

export default Settings;