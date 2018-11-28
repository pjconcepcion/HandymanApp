import React from 'react';
import {View,Text} from 'react-native';  
import styles from './HeaderStyles';  

export const Header = ({timeStarted,timeEnded}) => {   
    var timeEnded = timeEnded.split(':');
    var hours = timeEnded[0];
    var minutes = timeEnded[1];
    var seconds = timeEnded[2];
    var PMAM = 'AM';
    if(hours > 12){
        hours -= 12;            
        PMAM = 'PM';
    }

    return(
        <View style = {styles.headerContainer}>
            <View style = {styles.timerContainer}>
                <Text style = {styles.headerTitle}> Time started: </Text>
                <Text style = {styles.headerContent}>{timeStarted}</Text> 
            </View>
            <View style = {styles.timerContainer}>
                <Text style = {styles.headerTitle}> Time ended: </Text>
                <Text style = {styles.headerContent}>{hours +':'+ minutes +':'+ seconds +' '+ PMAM}</Text> 
            </View> 
        </View>   
    );
    
}

export default Header;