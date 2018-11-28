import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';  
import styles from './ButtonStyles';  

export const Button = ({setModalReportVisible,submitFeedback,resetState,feedbackComment,userType,isPaid,markAsPaid,serviceCancel}) => {   
    
    function openReportModal(){
        setModalReportVisible(true);
    }

    function onSubmitFeedback(){
        if(feedbackComment.trim() != ''){
            if(userType == 'customer' && !isPaid){
                if(serviceCancel){
                    submitFeedback();
                }else{
                    alert('Please mark as paid.');
                }
            }else{
                submitFeedback();
            }
        }else{
            alert('Please fill up the feedback form. Feedback is required.');
        }
    }

    return(        
        <View style = {styles.btnContainer}> 
            {userType == 'customer' && !serviceCancel?
            <TouchableOpacity
                style = {[styles.btnWrapper,styles.btnWhite]}
                onPress = {() => Alert.alert('Payment','Did you customer already paid?',[
                    {text: 'Yes', onPress: markAsPaid()},
                    {text: 'Not yet'}
                ])}
            >
                <Text style = {{color: 'black'}}> Mark as Paid </Text>
            </TouchableOpacity> : null}  
            <TouchableOpacity
                style = {[styles.btnWrapper,styles.btnRed]}
                onPress = {() => openReportModal()}
            >
                <Text style = {styles.btnText}> Report </Text>
            </TouchableOpacity>                    
            <TouchableOpacity
                style = {[styles.btnWrapper,styles.btnGreen]}
                onPress = {() => onSubmitFeedback()}
            >
                <Text style = {styles.btnText}> Submit </Text>
            </TouchableOpacity> 
        </View>   
    );
    
}

export default Button;