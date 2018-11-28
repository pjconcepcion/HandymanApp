import React from 'react';
import {
    View, 
    Text, 
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import {
    Rating,
    ListItem,
    Avatar
} from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './ModalContainerStyles';

const ModalContainer = ({setModalVisible,modalVisible,transactionData}) => {

    function closeModal(){
        setModalVisible(false);
    }

    var firstName,middleName,lastName;
    var choices = transactionData.choices;
    if(transactionData.userProfile){
        firstName = transactionData.userProfile.firstName || '';
        middleName = transactionData.userProfile.middleName? 
            (transactionData.userProfile.middleName.substring(0,1) + '.' ) : '';
        lastName = transactionData.userProfile.lastName || '';
    }
    
    var service = {
        title: transactionData.service,
        subtitle: 'Service',
        icon: 'format-paint',
    }
    
    var optionList = {
        subtitle: 'Option',
        icon: 'build',
    }    

    var otherList = [
        {            
            title: transactionData.date,
            subtitle: 'Date',
            icon: 'date-range',
        },{            
            title: transactionData.amount,
            subtitle: 'Fare',
            icon: 'attach-money',
        },{            
            title: transactionData.remarks || 'No Remarks',
            subtitle: 'Remarks',
            icon: 'comment',
        },{
            title: transactionData.comment || 'No Feedback',
            subtitle: 'Feedback',
            icon: 'feedback',
        }
    ]
        
    function renderItem(item){
        return (
            item.choices.map((value,index) =>
                <Text key = {index} style = {styles.txtSubtitle}> 
                    • {value.value} 
                </Text>
            )
        );
    }

    return(            
        <Modal
            isVisible = {modalVisible}
            onBackButtonPress = {closeModal.bind(this)}
            onBackdropPress = {closeModal.bind(this)}
        >
            <View style = {styles.modalContainer}>
                <View style = {styles.headerContainer}>
                    <TouchableOpacity onPress = {closeModal.bind(this)}>
                        <MaterialIcon name = {'close'} size = {30} color = {'white'}/>
                    </TouchableOpacity>
                </View>                
                <View style = {styles.profileContainer}>
                    <Avatar 
                        large
                        rounded
                        source = {require('../../../../assets/profile1.png')}
                        avatarStyle = {{borderWidth: 2, borderColor: 'white'}}
                        containerStyle = {{borderWidth: 2, borderColor: 'white'}}
                    />
                    <Text style = {styles.headerName}>
                        {firstName +' '+ middleName +' '+ lastName}
                    </Text>
                    <Rating
                        imageSize = {25}
                        style = {{paddingVertical: 5}}
                        type = {'star_modal'}             
                        readonly = {true}
                        ratingColor = {'#FFC107'}
                        startingValue = {transactionData.rating}
                    />
                </View>
                <ScrollView style = {styles.contentContainer} showsHorizontalScrollIndicator> 
                    <ListItem
                        title = {service.title}
                        subtitle = {service.subtitle}
                        leftIcon = {{name: service.icon, size: 20,color: 'white'}}
                        titleStyle = {styles.txtTitle}
                        subtitleStyle = {styles.txtSubtitle}
                        hideChevron
                    />      
                    <ListItem 
                        subtitle = {
                            <View>
                                {transactionData.choices.map((item,index) =>
                                    <View key = {index}> 
                                        <Text style = {styles.txtTitle}>{item.title}</Text>
                                        {renderItem(item)} 
                                    </View>
                                )}
                            </View>
                        }
                        leftIcon = {{name: optionList.icon, size: 20,color: 'white'}}
                        titleStyle = {styles.txtTitle}
                        subtitleStyle = {styles.txtSubtitle}
                        hideChevron
                    />
                    {
                        otherList.map((item,index) =>      
                            <ListItem
                                key = {index}
                                title = {item.title}
                                subtitle = {item.subtitle}
                                leftIcon = {{name: item.icon, size: 20,color: 'white'}}
                                titleStyle = {styles.txtTitle}
                                subtitleStyle = {styles.txtSubtitle}
                                hideChevron
                            />  
                        )   
                    }              
                </ScrollView>
                <View style = {styles.btnContainer}>
                    <TouchableOpacity 
                        style = {styles.btnClose}
                        onPress = {closeModal.bind(this)}
                    >
                        <Text> Close </Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </Modal>
    );
}

export default ModalContainer;   