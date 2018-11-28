import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import styles from './SearchContainerStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const SearchContainer = ({setModalVisible}) => {

    function displayModal(isVisible){
        setModalVisible(isVisible);
    }

    return(
        <View>            
            <View style = {styles.btnWrapper}>
                <TouchableOpacity 
                    style = {styles.btnContainer}
                    onPress = {displayModal.bind(this,true)}
                >
                    <MaterialIcons name = {'search'} size = {35} color = {'white'}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SearchContainer;