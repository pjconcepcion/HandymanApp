import React from 'react';
import Modal from 'react-native-modal';
import {ActivityIndicator} from 'react-native';
import styles from './LoadingStyles';

export const LoadingComponent = ({isLoading}) => {

    return(        
        <Modal isVisible = {isLoading} style = {styles.container}>
            <ActivityIndicator 
                animating = {true}
                size = {'large'}
                color = {'white'}
            />
        </Modal>
    );    
}

export default LoadingComponent;
