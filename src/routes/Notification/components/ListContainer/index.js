import React from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import {ListItem} from 'react-native-elements';
import styles from './ListContainerStyles';

const ListContainer = ({getNotification,setNotification,notification}) => {
    
    function displayModal(index,notificationID){
        setNotification(index,true,notificationID);
    }

    function onRefresh(){
        getNotification();
    }

    return(
        <View>
            <FlatList 
                data = {notification}
                renderItem = {({item,index}) => 
                    <ListItem
                        key = {item.notificationID}
                        title = {item.type}
                        subtitle = {item.dateReceive}
                        titleStyle = {item.readFlag == 1? styles.txtTitle: styles.unReadTitle}
                        subtitleStyle = {item.readFlag == 1? styles.txtSubtitle: styles.unReadSubtitle}
                        onPress = {displayModal.bind(this,index,item.notificationID)}
                        containerStyle = {item.readFlag == 1? 
                            {backgroundColor: 'transparent'}:
                            {backgroundColor: 'rgba(255,255,255,0.8)'}}
                        chevronColor = {item.readFlag == 1? 'white' : '#0288D1'}
                    />
                }
                keyExtractor = {(item) => item.notificationID.toString()}
                refreshing = {false}
                onRefresh = {onRefresh.bind(this)}
            />
        </View>
    );
}

export default ListContainer;