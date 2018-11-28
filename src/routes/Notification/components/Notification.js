import React from 'react';
import {View} from 'react-native';
import ListContainer from './ListContainer';
import ModalContainer from './ModalContainer';

class Notification extends React.Component{ 
    
    componentWillMount(){
        setTimeout(()=>{
            this.props.getNotification();
        },2000)
    }

    render(){
        return(
            <View style = {{flex: 1, backgroundColor: '#0288D1'}}>
                <ListContainer 
                    getNotification = {this.props.getNotification}
                    setNotification = {this.props.setNotification}
                    notification = {this.props.notification}                    
                />
                <ModalContainer 
                    setModalVisible = {this.props.setModalVisible}
                    modalVisible = {this.props.modalVisible}
                    notificationData = {this.props.notificationData}
                />
            </View>
        );
    }
}

export default Notification;