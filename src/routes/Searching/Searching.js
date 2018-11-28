import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,    
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {Pulse,Bubbles} from 'react-native-loader';
import styles from './SearchingStyles';
import {socketAction} from '../../Socket/socket';

class Searching extends React.Component {
    constructor(props){
        super(props)       
        this.cancel = this.cancel.bind(this);
    }

    cancel(){
        socketAction('cancelRequest');
        Actions.pop();
    }

    render(){
        return(
            <View style = {styles.container}>
                <Pulse 
                    size = {120}
                    color = {'white'}
                />
                <View style = {styles.contentContainer}>
                    <Text style = {styles.txt}> Searching </Text> 
                    <View style = {styles.loaderContainer}>
                        <Bubbles      
                            styles = {styles.bubbles}               
                            size = {2}
                            color = {'white'}
                        />  
                    </View>              
                </View>      
                <View style = {styles.btnContainer}>                     
                    <TouchableOpacity
                        style = {styles.btnWrapper}
                        onPress = {() => this.cancel()}
                    >
                        <Text style = {styles.btnText}> Cancel </Text>
                    </TouchableOpacity> 
                </View>          
            </View>
        );
    }
}

export default Searching;