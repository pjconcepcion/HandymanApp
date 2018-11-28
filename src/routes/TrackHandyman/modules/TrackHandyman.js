import update from 'react-addons-update';
import {Dimensions} from 'react-native'
import constants from './ActionConstants';
import request from '../../../util/request';
import localhosts,{getIpAddress} from '../../../util/localhost';
import {getID} from '../../../../Auth/auth';
import { socketAction } from '../../../Socket/socket';
//=======================
// Constants 
//=======================
const {
    GET_MY_LOCATION,
    PROFILE_MODAL_VISIBLE,
    CONFIRM_MODAL_VISIBLE,
    GET_USER_PROFILE,
    MEET_USERS,
    GET_DISTANCE,
    SET_MESSAGE,
    READ_MESSAGE,
    RESET_TRACK_HANDYMAN_STATE,
    SET_REASON_BOX_MESSAGE,
    SET_REASON_BOX_VISIBLE,
    CANCEL_TRANSACTION,
    RESET_BOOKING_FORM,
    SET_TRACK_FARE,
    SET_DISTANCE
} = constants;

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
//=======================
// Actions
//=======================

export function setHandymanRegion(position){
    return (dispatch,store) => {
        var socket = socketAction('socket');
        var roomSocket = store().track.roomSocket;
        socket.emit('setHandymanLocation',{position,roomSocket});
        dispatch({
            type: GET_MY_LOCATION,
            position,
        })
    }
}

export function getCurrentLocation(){
    return (dispatch) => {
        var socket = socketAction('socket');
        socket.on('sendHandymanRegion',(data) => {
            dispatch({
                type: GET_MY_LOCATION,
                position: data,
            })
        })
    }
}

export function setDistance(data){
    return (dispatch) => {
        dispatch({
            type: SET_DISTANCE, 
            data
        })
    }
}

export function setTrackModalVisible(isVisible){
    return (dispatch) => {
        dispatch({
            type: PROFILE_MODAL_VISIBLE,
            isVisible
        })
    }
}

export function setConfirmModalVisible(isVisible,type){
    return (dispatch) => {
        dispatch({
            type: CONFIRM_MODAL_VISIBLE,
            isVisible,
            confirmType: type
        })
    }
}

export function getUserProfile(type,userID,fare){
    var url = '';
    localhost = getIpAddress()
    if(type == 1){
        url = localhost + '/api/profile/' + userID;
    }else{
        url = localhost + '/api/profile/handyman/' + userID;
    }
    return (dispatch) => {
        request.get(url)
        .finish((error,res) => {
            dispatch({
                type: GET_USER_PROFILE,
                profile: res.body
            })
            dispatch({
                type: SET_TRACK_FARE,
                fare
            })
            dispatch({
                type: RESET_BOOKING_FORM
            })
        });      
    }
}

export function getDistance(){
    return (dispatch,store) => {
        if(store().track.handymanRegion && store().track.customerRegion){
            var handymanLat = store().track.handymanRegion.latitude;
            var handymanLong = store().track.handymanRegion.longitude;
            var customerLat = store().track.customerRegion.latitude;
            var customerLong = store().track.customerRegion.longitude;
            var radLat1 = Math.PI * handymanLat/180;
            var radLat2 = Math.PI * customerLat/180;
            var theta = handymanLong - customerLong;
            var radTheta = Math.PI * theta/180;
            var distance = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);

            if(distance > 1){
                distance = 1;
            }

            distance = Math.acos(distance);
            distance = distance * 180/Math.PI;
            distance = distance * 60 * 1.1515;
            distance = (distance * 1.609344)/0.0010000;
            dispatch({
                type: GET_DISTANCE,
                distance: distance.toFixed(2)
            })
        }
    }
}

export function setMessage(text){
    return (dispatch) => {
        dispatch({
            type: SET_MESSAGE,
            text
        })
    }
}

export function setReasonBoxMessage(text){
    return (dispatch) => {
        dispatch({
            type: SET_REASON_BOX_MESSAGE,
            text
        })
    }
}

export function cancelTransaction(userType){    
    return (dispatch,store) => {
        getID().then((userID) => {
            var transactionID = store().track.transactionID;
            var bookingID = store().track.bookingID;
            var type = 'cancel';
            var alertMsg = 'Transaction cancelled.';
            localhost = getIpAddress()
            request.post(localhost + '/api/bookings/service/' + bookingID)
                .send({type,userID,userType})
                .finish((error,res) => {
                    if(!error){
                        if(userType == 1){
                            var data = {
                                points: store().profile.points,
                                pointsDeduc: store().track.fare,
                                transactionID: transactionID,
                            }
                            request.post(localhost + '/api/points/' + userID)
                                .send(data)
                                .finish((error,res) => {
                                    if(!error){
                                        alertMsg += '\n\nPoints deducted';
                                        dispatch({
                                            type: RESET_TRACK_HANDYMAN_STATE
                                        })
                                    }
                                })
                        }
                        alert(alertMsg);
                    }
                })
            
        })
    }
}

//=======================
// Action Handler
//=======================
function handleGetUserProfile(state,action){
    var firstName = action.profile.firstName;
    var middleName = action.profile.middleName? (action.profile.middleName.substring(0,1) + '.') : '';
    var lastName = action.profile.lastName;
    var houseNo = action.profile.houseNo;
    var street = action.profile.street;
    var barangay = action.profile.barangay;
    var city = action.profile.city;        
    return update(state,{
        profile:{
            name: {
                $set: firstName +' '+ middleName +' '+lastName
            },
            address:{
                $set: houseNo +' '+ street +' '+ barangay +' '+ city
            },
            birthDay:{
                $set: action.profile.birthDay
            },
            gender:{
                $set: action.gender == 1? 'Male' : 'Female'
            },  
            email:{
                $set: action.profile.email
            },
            contact:{
                $set: action.profile.contact
            },
            rating:{
                $set: action.profile.rating
            },
            type:{
                $set: action.profile.Type
            },
            userID:{
                $set: action.profile.userID
            },
            age:{
                $set: action.profile.age
            }
        }
    })
}

function handleGetCurrentLocation(state,action){
    return update(state,{
        handymanRegion:{
            latitude: {
                $set: action.position.coords.latitude
            },
            longitude: {
                $set: action.position.coords.longitude
            },
            latitudeDelta:{
                $set: LATITUDE_DELTA
            },
            longitudeDelta:{
                $set: LONGITUDE_DELTA
            }
        }
    })
}

function handleSetTrackModalVisible(state,action){
    return update(state,{
        trackModalVisible: {
            $set: action.isVisible
        }
    })
}

function handleSetConfirmModalVisible(state,action){
    return update(state,{
        confirmModalVisible:{
            $set: action.isVisible
        },
        confirmType:{
            $set: action.confirmType
        }
    })
}

function handleSetDistance(state,action){
    return update(state,{
        handymanRegion:{
            latitude:{
                $set: action.data.handymanRegion.latitude
            },
            longitude:{
                $set: action.data.handymanRegion.longitude
            },
            latitudeDelta:{
                $set: action.data.handymanRegion.latitudeDelta
            },
            longitudeDelta:{
                $set: action.data.handymanRegion.longitudeDelta
            }
        },
        customerRegion:{
            latitude:{
                $set: action.data.customerRegion.latitude
            },
            longitude:{
                $set: action.data.customerRegion.longitude
            },
            latitudeDelta:{
                $set: action.data.customerRegion.latitudeDelta
            },
            longitudeDelta:{
                $set: action.data.customerRegion.longitudeDelta
            }
        },
        handymanSocket:{
            $set: action.data.handymanSocket
        },
        customerSocket:{
            $set: action.data.customerSocket
        },
        roomSocket:{
            $set: action.data.roomSocket
        },
        bookingID:{
            $set: action.data.bookingID
        },
        transactionID:{
            $set: action.data.transactionID
        }
    })
}

function handleGetDistance(state,action){
    const {distance} = action;

    if(distance < 10){
        alert('You are less than 10m away.');
    }

    return update(state,{
        distance:{
            $set: distance
        },
    })
}

function handleSetMessage(state,action){
    return update(state,{
        message:{
            $set: action.text
        }
    })
}

function handleReadMessage(state,action){
    return update(state,{
        isMessageRead:{
            $set: action.isMessageRead
        }
    })
}

function handleSetReasonBoxMessage(state,action){
    return update(state,{
        reasonBoxMessage:{
            $set: action.text
        }
    })
}

function handleSetTrackFare(state,action){
    return update(state,{
        fare: {
            $set: action.fare
        }
    })
}

function handleResetTrackHandymanState(state,action){
    return state = initialState;
}

const ACTION_HANDLERS = {
    PROFILE_MODAL_VISIBLE: handleSetTrackModalVisible,
    CONFIRM_MODAL_VISIBLE: handleSetConfirmModalVisible,
    GET_MY_LOCATION: handleGetCurrentLocation,
    GET_USER_PROFILE: handleGetUserProfile,
    SET_DISTANCE: handleSetDistance,
    GET_DISTANCE: handleGetDistance,
    SET_MESSAGE: handleSetMessage,
    READ_MESSAGE: handleReadMessage,
    RESET_TRACK_HANDYMAN_STATE: handleResetTrackHandymanState,
    SET_REASON_BOX_MESSAGE: handleSetReasonBoxMessage,
    SET_TRACK_FARE: handleSetTrackFare
};


const initialState = {
    profile: {},
    trackModalVisible: false,
    confirmModalVisible: false,
    handymanRegion: {},
    customerRegion: {},
    bookingID: '',
    distance: '',
    estimatedTime: '',
    message: '',
    isMessageRead: false,
    roomSocket: '',
    confirmType: '',
    reasonBoxMessage: '',
    transactionID: '',
    fare: 0,
};

export function TrackHandyman(state = initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    return handler? handler(state,action) : state;
}
