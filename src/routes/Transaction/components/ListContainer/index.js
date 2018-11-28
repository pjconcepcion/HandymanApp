import React from 'react';
import {
    View,
    FlatList
} from 'react-native';
import {ListItem} from 'react-native-elements';
import styles from './ListContainerStyles';

const ListContainer = ({getTransaction,setModalVisible,transaction}) => {
    
    function displayModal(transactionID){
        setModalVisible(transactionID,true)
    }

    function onRefresh(){
        getTransaction();
    }


    return(
        <View>
            <FlatList 
                data = {transaction}
                renderItem = {({item,index}) => 
                    <ListItem
                        key = {item.transactionID}
                        title = {item.Service}
                        subtitle = {item.date + ' - TT'+ item.transactionID}
                        titleStyle = {styles.txtTitle}
                        subtitleStyle = {styles.txtSubtitle}
                        onPress = {displayModal.bind(this,item.transactionID)}
                        chevronColor = {'white'}
                    />
                }
                keyExtractor = {(item) => item.transactionID.toString()}
                refreshing = {false}
                onRefresh = {onRefresh.bind(this)}
            />            
        </View>
    );
}

export default ListContainer;