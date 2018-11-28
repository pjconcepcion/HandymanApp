import React from 'react';
import {View} from 'react-native';
import ListContainer from './ListContainer';
import ModalContainer from './ModalContainer';

class Notification extends React.Component{ 
    
    componentWillMount(){
        this.props.getTransaction();
    }

    render(){
        return(
            <View style = {{flex: 1, backgroundColor: '#0288D1'}}>
                <ListContainer 
                    getTransaction = {this.props.getTransaction}
                    setModalVisible = {this.props.setModalVisible}
                    transaction = {this.props.transaction}               
                />
                {this.props.modalVisible &&
                    <ModalContainer 
                        setModalVisible = {this.props.setModalVisible}
                        modalVisible = {this.props.modalVisible}
                        transactionData = {this.props.transactionData}
                    />                
                }
            </View>
        );
    }
}

export default Notification;