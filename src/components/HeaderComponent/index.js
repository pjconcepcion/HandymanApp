import React from 'react';
import {
    View, Text
} from 'react-native';
import styles from './HeaderComponentStyles';

export const HeaderComponent = () => {
    return(
        <View style = {styles.container}>
            <Text style = {styles.txtTitle}> Search </Text>
        </View>
    );
}

export default HeaderComponent;