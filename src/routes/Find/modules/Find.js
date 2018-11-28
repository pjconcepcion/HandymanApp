import update from 'react-addons-update';
import {Alert,Dimensions} from 'react-native'
import constants from './ActionConstants';
import request from '../../../util/request';
import localhosts,{getIpAddress} from '../../../util/localhost';
import {getID} from '../../../../Auth/auth';
//=======================
// Constants 
//=======================
const {
    GET_HANDYMAN_CURRENT_LOCATION,
    SET_FIND_MODAL_VISIBLE,
    GET_HANDYMAN_SERVICE,
    SET_HANDYMAN_SERVICE,
    TRACK_HANDYMAN_LOCATION,
    DELETE_ALL_STATE,
    GET_POINTS
} = constants;

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
//=======================
// Actions
//=======================

export function getCurrentLocation(){
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: GET_HANDYMAN_CURRENT_LOCATION,
                    position: position,
                })
            },
            (error) => {Alert.alert('Location', error.message,[
                {text: 'Retry', onPress:getCurrentLocation()}
            ])},
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
    }
}

export function getHandymanService(){
    return (dispatch) => {
        getID().then((userID) => {
            localhost = getIpAddress()
            request.get(localhost + '/api/services/' + userID)
            .finish((error,res)=> {  
                if(!error){  
                    console.log(res.body)
                    dispatch({
                        type: GET_HANDYMAN_SERVICE,
                        services: res.body,                        
                    })
                }else{
                    console.log(error);
                }
            })
        });
    }
}

export function setModalVisible(isVisible){
    return (dispatch) => {
        dispatch({
            type: SET_FIND_MODAL_VISIBLE,
            isVisible
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

export function setService(index){
    return (dispatch,store) => {
        dispatch({
            type: SET_HANDYMAN_SERVICE,
            selected: !store().find.services[index].isSelected,
            index,
        })
    }
}

//=======================
// Action Handler
//=======================
function handleGetCurrentLocation(state,action){
    return update(state,{
        region: {
            latitude: {
                $set: action.position.coords.latitude
            },
            longitude:{
                $set: action.position.coords.longitude
            },
            latitudeDelta:{
                $set: LATITUDE_DELTA
            },
            longitudeDelta:{
                $set: LONGITUDE_DELTA
            }
        },
    })
}

function handleSetFindModalVisible(state,action){
    return update(state,{
        modalVisible: {
            $set: action.isVisible
        }
    })
}

function handleGetHandymanService(state,action){    
    const {services} = action;
    for(var ctr = 0;ctr<services.length;ctr++){
        services[ctr] = {
            name: services[ctr].name,
            isSelected: false
        }
    }
    return update(state,{
        services: { 
            $set: services
        }
    })
}

function handleSetService(state,action){
    return update(state,{
        services:{
            [action.index]: {
                isSelected :{
                    $set: action.selected
                }
            }
        },
    })
}

function handleGetPoint(state,action){
    return update(state,{
        points:{
            $set: action.points.points
        }
    })
}

function handleDeleteState(state,action){
    return state = initialState;
}

const ACTION_HANDLERS = {
    GET_HANDYMAN_CURRENT_LOCATION: handleGetCurrentLocation,
    SET_FIND_MODAL_VISIBLE: handleSetFindModalVisible,
    GET_HANDYMAN_SERVICE: handleGetHandymanService,
    SET_HANDYMAN_SERVICE: handleSetService,
    TRACK_HANDYMAN_LOCATION: handleGetCurrentLocation,
    DELETE_ALL_STATE: handleDeleteState
};

const initialState = {
    region: {},
    modalVisible: false,
    services: [],
    points: 0,
};

export function FindReducer(state = initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    return handler? handler(state,action) : state;
}
