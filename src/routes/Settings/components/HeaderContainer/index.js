import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './HeaderContainerStyles';

const HeaderContainer = () => {
    return(            
        <View style = {styles.container}>
            <View style = {styles.txtContainer}>                    
                <Text style = {styles.txtTitle}> Settings </Text>
            </View>
        </View>
    );
}

export default HeaderContainer;   