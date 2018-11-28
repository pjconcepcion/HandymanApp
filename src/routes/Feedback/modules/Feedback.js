import update from 'react-addons-update';
import {Alert} from 'react-native';
import constants from './ActionConstants';
import request from '../../../util/request';
import localhosts,{getIpAddress} from '../../../util/localhost';
import {Actions} from 'react-native-router-flux';
import {getID} from '../../../../Auth/auth';
import { socketAction } from '../../../Socket/socket';
//=======================
// Constants 
//=======================
const {
    SET_RATING,
    SET_FEEDBACK_COMMENT,
    SET_MODAL_REPORT_VISIBLE,
    GET_REPORT_TYPE,
    SET_REPORT_COMMENT,
    SET_REPORT_TYPE,
    GET_BOOKING_DETAILS,
    RESET_FEEDBACK_STATE,
    SET_PENALTIES_PAID,
    MARK_AS_PAID
} = constants;
//=======================
// Actions
//=======================

export function setRating(rate){
    return (dispatch) => {
        dispatch({
            type: SET_RATING,
            rate
        })
    }
}

export function setFeedBackComment(text){
    return (dispatch) => {
        dispatch({
            type: SET_FEEDBACK_COMMENT,
            text
        })
    }
}

export function setModalReportVisible(isVisible){
    return (dispatch) =>{
        dispatch({
            type: SET_MODAL_REPORT_VISIBLE,
            isVisible
        })
    }
}

export function getReportType(){
    return (dispatch) => {
        localhost = getIpAddress()
        request.get(localhost + '/api/reports')
            .finish((error,res) => {
                dispatch({
                    type: GET_REPORT_TYPE,
                    reportType: res.body
                })
            })
    }
}

export function setReportType(reportType,index){
    return (dispatch,store) => {
        dispatch({
            type: SET_REPORT_TYPE,
            reportType,
            description: store().feedback.reportDescription[index]
        });
    }
}

export function setReportComment(text){
    return (dispatch) => {
        dispatch({
            type: SET_REPORT_COMMENT,
            text
        })
    }
}

export function submitReport(){
    return (dispatch,store) => {
        getID().then((userID) => {
            var myID = userID;
            var otherParty = '';
            if(myID == store().feedback.bookingDetails.customerID){
                otherParty = store().feedback.bookingDetails.handymanID
            }else{
                otherParty = store().feedback.bookingDetails.customerID
            }

            var reportType = store().feedback.selectedReport;
            var comment = store().feedback.reportComment;
            var transactionID = store().feedback.bookingDetails.transactionID;
            var data = {
                reporterID: myID,
                reportedID: otherParty,
                reportType,
                comment,
                transactionID, 
            }
            localhost = getIpAddress()
            request.post(localhost + '/api/reports')
                .send(data)
                .finish((error,res) => {
                    if(error){
                        console.log(error);
                    }else{
                        alert('Report submitted.');
                    }
                })
        })
    }
}

export function getBookingDetails(bookingID){
    return (dispatch) => {
        localhost = getIpAddress()
        request.get(localhost + '/api/bookings/' + bookingID)
            .finish((error,res) => {
                getID().then((userID) => {
                    dispatch({
                        type: GET_BOOKING_DETAILS,
                        booking: res.body,
                        userID
                    })
                })
            })
    }
}

export function submitFeedback(){
    return (dispatch,store) => {
        getID().then((userID) => {
            var transactionID = store().feedback.bookingDetails.transactionID;
            var rate = store().feedback.rate;
            var comment = store().feedback.feedbackComment;            
            var userID = userID;
            var data = {transactionID,rate,comment,userID}
            var pop = store().feedback.userType == 'handyman'? 'customerUI' : 'handymanUI' ;
            localhost = getIpAddress()
            request.post(localhost + '/api/feedback') 
                .send(data)
                .finish((error,res) => {
                    if(error){
                        console.log(error);
                    }else{
                        dispatch({
                            type: RESET_FEEDBACK_STATE
                        })
                        Alert.alert('Feedback','Feedback submitted',[
                            {text: 'OK',onPress: () => {Actions[pop].call()}}
                        ]);
                    }
                })
        })
    }
}

export function checkPaidPenalty(userID){
    return (dispatch) => {
        localhost = getIpAddress()
        request.post(localhost + '/api/penalty/' + userID)
            .finish((error,res) => {
                if(!error){
                    if(res.body.changedRows > 0){
                        dispatch({
                            type: SET_PENALTIES_PAID,
                            paid: true,
                        })
                    }
                }
            })
    }
}

export function markAsPaid(){
    return (dispatch,store) => {
        getID().then((userID) => {
            var data = {
                points: store().profile.points,
                pointsDeduc: store().feedback.bookingDetails.amount,
                transactionID: store().feedback.bookingDetails.transactionID,
            }
            localhost = getIpAddress()
            request.post(localhost + '/api/points/' + userID)
                .send(data)
                .finish((error,res) => {
                    if(!error){
                        dispatch({
                            type: MARK_AS_PAID,
                            value: true
                        })
                    }
                })
        })
    }
}

export function resetState(){
    return (dispatch) => {
        dispatch({
            type: RESET_STATE
        })
    }
}

//=======================
// Action Handler
//=======================

function handleSetRating(state,action){
    return update(state,{
        rate:{
            $set: action.rate
        }
    })
}

function handleSetFeedbackComment(state,action){
    return update(state,{
        feedbackComment:{
            $set: action.text
        }
    })
}

function handleSetModalReportVisible(state,action){
    return update(state,{
        modalReportVisible:{
            $set: action.isVisible
        },
        setDescription:{
            $set: '',
        }
    })
}

function handleGetReportType(state,action){
    var question = action.reportType.map(function(value, index) {
        return [value.name];
    });

    var description = action.reportType.map(function(value, index) {
        return [value.description];
    });

    return update(state,{
        reportType:{
            $set: question
        },
        reportDescription:{
            $set: description
        }
    })
}

function handleSetReportType(state,action){
    return update(state,{
        selectedReport:{
            $set: action.reportType
        },
        setDescription:{
            $set: action.description
        }
    })    
}

function handleSetReportComment(state,action){
    return update(state,{
        reportComment:{
            $set: action.text
        }
    })
}

function handleGetBookingDetails(state,action){
    var myType = action.booking.customerID == action.userID? 'handyman' : 'customer';

    return update(state,{
        bookingDetails:{
            $set: action.booking
        },
        userType: {
            $set: myType
        }   
    })
}

function handlePaidPenalties(state,action){
    return update(state,{
        paidPenalty: {
            $set: action.paid
        }
    })
}

function handleMarkAsPaid(state,action){
    return update(state,{
        isPaid: {
            $set: action.value
        }
    })
}

function handleResetState(state,action){
    return state = initialState;
}

const ACTION_HANDLERS = {
    SET_RATING: handleSetRating,
    SET_FEEDBACK_COMMENT: handleSetFeedbackComment,
    SET_MODAL_REPORT_VISIBLE: handleSetModalReportVisible,
    SET_REPORT_TYPE: handleSetReportType,
    GET_REPORT_TYPE: handleGetReportType,
    SET_REPORT_COMMENT: handleSetReportComment,
    GET_BOOKING_DETAILS: handleGetBookingDetails,
    RESET_FEEDBACK_STATE: handleResetState,
    SET_PENALTIES_PAID: handlePaidPenalties,
    MARK_AS_PAID: handleMarkAsPaid
};


const initialState = {
    rate: 2.5,
    feedbackComment: '',
    modalReportVisible: false,
    reportType: {},
    bookingDetails: {},
    selectedReport: '',
    setDescription: '',
    userType: '',
    paidPenalty: false,
    isPaid: false,
};

export function FeedbackReducer(state = initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    return handler? handler(state,action) : state;
}
