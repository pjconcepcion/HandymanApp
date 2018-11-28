import update from 'react-addons-update';
import constants from './ActionConstants';
import request from '../../../util/request';
import localhosts,{getIpAddress} from '../../../util/localhost';
import {getID} from '../../../../Auth/auth';
//=======================
// Constants 
//=======================
const {
    GET_NOTIFICATION,
    SET_NOTIFICATION,
    SET_NOTIFICATION_MODAL_VISIBLE,
    DELETE_ALL_STATE
} = constants;

//=======================
// Actions
//=======================

export function getNotification(){
    return (dispatch) => {
        getID().then((userID) => {
            localhost = getIpAddress()
            request.get(localhost + '/api/notification/'+ userID)
                .finish((error,res) => {
                    dispatch({
                        type: GET_NOTIFICATION,
                        notification: res.body
                    });
                })
        });
    }
}

export function setModalVisible(isVisible){
    return (dispatch) => {
        dispatch({
            type: SET_NOTIFICATION_MODAL_VISIBLE,
            isVisible
        })
    }
}

export function setNotification(index,isVisible,notificationID){
    return (dispatch) => {
        localhost = getIpAddress()
        request.post(localhost + '/api/notification')
            .send({notificationID})
            .finish((error,res) => {
                dispatch({
                    type: SET_NOTIFICATION,
                    index,
                });
                dispatch({
                    type: SET_NOTIFICATION_MODAL_VISIBLE,
                    isVisible,
                    index
                })
            })
    }
}

//=======================
// Action Handler
//=======================
function handleGetNotification(state,action){
    return update(state,{
        notification: {
            $set: action.notification
        }
    })
}


function handleSetNotification(state,action){
    return update(state,{
        notification: {
            [action.index]:{
                readFlag: {
                    $set: 1
                }
            }
        },
    })
}

function handleSetModalVisible(state,action){
    return update(state,{
        modalVisible: {
            $set: action.isVisible
        },
        notificationData: {
            $set: state.notification[action.index]
        }
    })
}

function handleDeleteState(state,action){
    return state = initialState
}

const ACTION_HANDLERS = {
    GET_NOTIFICATION: handleGetNotification,
    SET_NOTIFICATION: handleSetNotification,
    SET_NOTIFICATION_MODAL_VISIBLE: handleSetModalVisible,
    DELETE_ALL_STATE: handleDeleteState
};


const initialState = {
    notification: {},
    modalVisible: false,
    notificationData: {},
};

export function NotificationReducer(state = initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    return handler? handler(state,action) : state;
}
