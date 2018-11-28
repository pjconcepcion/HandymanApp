import update from 'react-addons-update';
import {Alert} from 'react-native';
import constants from './ActionConstants';
import request from '../../../util/request';
import localhosts,{getIpAddress} from '../../../util/localhost';
import {getID} from '../../../../Auth/auth';
//=======================
// Constants 
//=======================
const {
    GET_PROFILE,
    SAVE_EDIT,
    SET_MODAL_PAYMENT,
    SET_PAYMENT_VALUE,
    GET_POINTS,
    DELETE_ALL_STATE
} = constants;

//=======================
// Actions 
//=======================
export function getProfile(){
    return (dispatch) => {
        getID().then((userID) => {
        localhost = getIpAddress()
        request.get(localhost + '/api/profile/' + userID)
            .finish((error,res)=> {  
                if(!error){  
                    if(res.body){
                        dispatch({
                            type: GET_PROFILE,
                            profile: res.body
                        })
                    }
                }else{
                    console.log(error);
                }
            })
        });
    }
}

export function setModalPayment(isVisible){
    return (dispatch) => {
        getID().then((userID) => {
            localhost = getIpAddress()
            request.get(localhost + '/api/points/topuphistory/' + userID)
                .finish((error,res) => {
                    if(!error){
                        if(res.body.No == 0){
                            dispatch({
                                type: SET_MODAL_PAYMENT,
                                isVisible
                            })
                        }else{
                            Alert.alert('Top Up','Please pay your previous request.');
                        }
                    }
                })
        })
    }
}

export function setValue(index,value){
    return (dispatch) => {
        dispatch({
            type: SET_PAYMENT_VALUE,
            index,
            value
        })
    }
}

export function requestLoad(){
    return (dispatch,store) => {
        getID().then((userID) => {
            localhost = getIpAddress()
            request.post(localhost + '/api/topup')
                .send({
                    userID,
                    email: store().profile.email,
                    value: store().profile.paymentValue,
                })
                .finish((error,res) => {
                    if(!error){
                        Alert.alert('Successfully requested','Please check your email for instruction');
                        dispatch({
                            type: SET_MODAL_PAYMENT,
                            isVisible: false
                        })
                    }
                })
        })
    }
}

export function getPoints(){
    return (dispatch) => {
        getID().then((userID) => {
            localhost = getIpAddress()
            request.get(localhost + '/api/points/' + userID)
                .finish((error,res) => {
                    if(!error){
                        dispatch({
                            type: GET_POINTS,
                            points: res.body
                        })
                    }
                })
        })
    }
}
//=======================
// Action Handler
//=======================
function handleGetProfile(state,action){
    return update(state,{
        name:{
            firstName: {
                $set: action.profile.firstName
            },
            middleName:{
                $set: action.profile.middleName
            },
            lastName:{
                $set: action.profile.lastName
            }                
        },
        address:{
            houseNo: {                
                $set: action.profile.houseNo
            },
            street: {                
                $set: action.profile.street
            },
            barangay: {                
                $set: action.profile.barangay
            },
            city: {                
                $set: action.profile.city
            }
        },
        birthDay:{
            $set: action.profile.birthDay
        },
        birthDate:{
            $set: action.profile.birthDate
        },
        gender:{
            $set: action.profile.gender
        },
        email:{
            $set: action.profile.email
        },
        contact:{
            $set: action.profile.contact
        },
        password:{
            $set: action.profile.password
        },
        type:{
            $set: action.profile.Type
        },
        profilePicture:{
            $set: action.profile.profilepicture
        },
        verifiedFlag: {
            $set: action.profile.verifiedFlag
        },
        contactPerson:{
            emergencyPerson:{
                $set: action.profile.emergencyPerson
            },
            emergencyNumber:{
                $set: action.profile.emergencyNumber
            },
            emergencyRelationship:{
                $set: action.profile.emergencyRelationship
            }
        }
    })
}

function handleSetModalPayment(state,action){
    return update(state,{
        isModalVisible:{
            $set: action.isVisible
        }
    })
}

function handleSetPaymentValue(state,action){
    return update(state,{
        paymentValue:{
            $set: action.value
        },
        selectedIndex: {
            $set: action.index
        }
    })
}

function handleGetPoint(state,action){
    return update(state,{
        points:{
            $set: action.points.points
        }
    })
}

function handleSaveEdit(state,action){
    return update(state,{
        [action.editType]: {
            $set: action.storeData
        },
    });
}

function handleDeleteState(state,action){
    return state = initialState;
}

const ACTION_HANDLERS = {
    GET_PROFILE: handleGetProfile,
    SAVE_EDIT: handleSaveEdit,
    SET_MODAL_PAYMENT: handleSetModalPayment,
    SET_PAYMENT_VALUE: handleSetPaymentValue,
    SET_OTHER_PAYMENT_VALUE: handleSetPaymentValue,
    GET_POINTS: handleGetPoint,
    DELETE_ALL_STATE: handleDeleteState,
};

const initialState = {
    name: {
        firstName: '',
        middleName: '',
        lastName: '',
    },
    address: {
        houseNo: '',
        street: '',
        barangay: '',
        city: ''
    },
    birthDate: '',
    birthDay: '',
    gender: {
        male: '',
        female: '',
    },
    email: '',
    contact: '',    
    password: '', 
    type: '',   
    profilePicture: '',
    contactPerson:{
        emergencyPerson: '',
        emergencyNumber: '',
        emergencyRelationship:''
    },
    isModalVisible: false,
    paymentValue: 0,
    selectedIndex: -1,
    points: 0,
};

export function ProfileReducer(state = initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    
    return handler? handler(state,action) : state;
}