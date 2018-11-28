import React from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';  
import {Rating} from 'react-native-elements';
import styles from './FormStyles';  

export const Form = ({rate,setRating,setFeedBackComment,userType,paidPenalty}) => {   
    
    function onChangeRating(rating){
        setRating(rating);
    }

    function onTextChange(text){
        setFeedBackComment(text);
    }

    return(
        <KeyboardAvoidingView style = {styles.formContainer} behavior = {'padding'}>
            {paidPenalty &&  <Text style = {styles.txtPenalty}> Penalties are paid </Text>}
            <View style = {styles.ratingContainer}> 
                <Rating
                    imageSize = {50}
                    style = {{paddingHorizontal: 10}}
                    type = {'star_modal'}             
                    ratingColor = {'#FFC107'}
                    fractions = {1}
                    startingValue = {rate}
                    onFinishRating = {(rating) => onChangeRating(rating)}
                    showRating
                />
            </View>   
            <View style = {styles.txtInputContainer}>
                <Text style = {styles.txtTitle}>Give your {userType} a feedback: </Text>
                <TextInput 
                    placeholder = {'What can you say about your ' + userType +'?'}    
                    placeholderTextColor = {'rgba(255,255,255,0.5)'}                
                    underlineColorAndroid = "transparent"
                    style = {styles.txtInput}
                    onChangeText = {(text) => onTextChange(text)}
                />
            </View>     
        </KeyboardAvoidingView>   
    );
    
}

export default Form;