import React from 'react';
import {
    View,
    Alert,
    Text
} from 'react-native';
import Header from './Header';
import Form from './Form';
import Button from './Button';
import ModalReport from './ModalReport';

class Feedback extends React.Component {
    componentDidMount(){
        Alert.alert('NOTE!','Do not ignore this feedback form. This is required '+
            'in order to have trust on handyman and customer',[
                {text: 'I understand'}
            ]);
        this.props.getReportType();
        this.props.getBookingDetails(this.props.data.bookingID);
        if(!this.props.data.serviceCancel){
            this.props.checkPaidPenalty(this.props.data.userID);
        }
    }

    render(){
        return(
            <View style = {{flex: 1,backgroundColor: '#0288D1'}}>
                <Form 
                    rate = {this.props.rate}
                    setRating = {this.props.setRating}
                    setFeedBackComment = {this.props.setFeedBackComment}
                    userType = {this.props.userType}
                    paidPenalty = {this.props.paidPenalty}
                />
                <Header 
                    timeStarted = {this.props.data.timeStarted}
                    timeEnded = {this.props.data.timeEnded}
                />  
                <Button 
                    setModalReportVisible = {this.props.setModalReportVisible}
                    submitFeedback = {this.props.submitFeedback}
                    resetState = {this.props.resetState}
                    feedbackComment = {this.props.feedbackComment}
                    userType = {this.props.userType}
                    markAsPaid = {this.props.markAsPaid}
                    isPaid = {this.props.isPaid}
                    serviceCancel = {this.props.data.serviceCancel || false}
                />   
                {
                    this.props.modalReportVisible &&
                    <ModalReport 
                        modalReportVisible = {this.props.modalReportVisible}
                        setModalReportVisible = {this.props.setModalReportVisible}
                        reportType = {this.props.reportType}
                        setReportComment = {this.props.setReportComment}
                        setReportType = {this.props.setReportType}
                        setDescription = {this.props.setDescription}
                        submitReport = {this.props.submitReport}
                    />
                }   
            </View>
        );
    }
}

export default Feedback;