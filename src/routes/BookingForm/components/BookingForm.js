import React from 'react';
import {
    View,
    Alert,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Service from './ServiceContainer';
import Form from './Form';
import Button from './ButtonContainer';
import Fare from './FareContainer';
import Loading from '../../../components/Loading';

class BookingForm extends React.Component {

    componentDidMount(){
        this.props.getServices();
        this.props.getPenalty();

        if(this.props.referAddress){
            this.props.setAddress(this.props.referAddress);
            alert(this.props.referAddress);
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style = {{flex: 1,backgroundColor: '#0288D1'}} behavior = 'padding'>
                {this.props.isLoading &&
                    <Loading isLoading = {this.props.isLoading}/> 
                }
                {this.props.services &&                     
                    <Service                    
                        services = {this.props.services}
                        setService = {this.props.setService}
                        selectedService = {this.props.selectedService}
                    />
                }
                {this.props.selectedService != '' &&
                    <Form 
                        form = {this.props.form}
                        services = {this.props.services}
                        setCheckbox = {this.props.setCheckbox}
                        setRadioButton = {this.props.setRadioButton}
                        setDropdown = {this.props.setDropdown}
                        setText = {this.props.setText}
                        setRemarks = {this.props.setRemarks}
                        setTextboxCheck = {this.props.setTextboxCheck}
                        setTextboxRadio = {this.props.setTextboxRadio}
                    />
                }
                {this.props.selectedService != '' && 
                    <Fare 
                        fare = {this.props.fare}
                        penalty = {this.props.penalty}
                    />
                }
                {this.props.selectedService != '' &&
                    <Button 
                        validateBook = {this.props.validateBook}
                    />
                }
            </KeyboardAvoidingView>
        );
    }
}

export default BookingForm;