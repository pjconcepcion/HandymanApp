import React from 'react';
import {
    Text,
    View
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './FareContainerStyles';
import {socketAction} from '../../../../Socket/socket';

export const Fare = ({fare,penalty}) => {

    return(
        <View style = {styles.container}>   
            <View>
                <Text style = {styles.fareText}> Cost: Php {fare}</Text>
            </View>
            {penalty?
                <View style = {styles.penaltyContainer}>
                    <FontAwesome name = {'warning'} size = {20} color = {'#e74c3c'}/>
                    <Text> Php {penalty} </Text>
                </View> : null
            }
        </View>
    );
}

export default Fare;


