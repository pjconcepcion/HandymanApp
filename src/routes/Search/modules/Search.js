import update from 'react-addons-update';
import {Dimensions,Alert} from 'react-native';
import constants from './ActionConstants';
import request from '../../../util/request';
import localhosts,{getIpAddress} from '../../../util/localhost';
import {socketAction} from '../../../Socket/socket';
import {getID} from '../../../../Auth/auth';
import { Actions } from 'react-native-router-flux';

//=======================
// Constants 
//=======================
const {
    GET_CURRENT_LOCATION,
    GET_NEARBY_HANDYMAN,
    REMOVE_HANDYMAN,
    RESET_BOTH_STATE,
    SET_REFERRAL,
    SEARCH_PLACE,
    SET_REFER_ADDRESS
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
                    type: GET_CURRENT_LOCATION,
                    position: position,
                })
            },
            (error) => {Alert.alert('Location', error.message,[
                {text: 'Retry', onPress:getCurrentLocation()}
            ])},
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        )
    }
}

export function setReferral(isReferring){

    return (dispatch) => {
        dispatch({
            type: SET_REFERRAL,
            isReferring
        })
    }
}

export function searchPlace(text){
    return (dispatch) => {
        request.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyBBM_YuplPZYOEEl6BI3W_h53bjeE2PItM&input=' + text + '&inputtype=textquery&fields=geometry')
            .finish((error,res) => {
                dispatch({
                    type: SEARCH_PLACE,
                    results: res.body,
                    referAddress: text
                })
            })
    }
}

export function setAddress(text){
    return (dispatch) => {
        dispatch({
            type: SET_REFER_ADDRESS,
            text
        })
    }
}
//=======================
// Action Handler
//=======================
function handleGetCurrentLocation(state,action){
    return update(state,{
        region:{
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

function handleGetNearbyHandyman(state,action){
    const {newData} = action;
    var handymanLat = newData.region.latitude;
    var handymanLong = newData.region.longitude;
    var customerLat = state.region.latitude;
    var customerLong = state.region.longitude;
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

    if(distance < 500){
        newData.distance = distance;
        return update(state,{
            nearbyHandyman:{
                $push: [action.newData]
            }
        })
    }else{
        return state;
    }
}

function handleRemoveHandyman(state,action){
    var handymanCtr = state.nearbyHandyman.length;
    var newHandyman = [];
    for(var ctr = 0; ctr < handymanCtr; ctr++){
        if(state.nearbyHandyman[ctr].socket != action.socket){
            newHandyman.push(state.nearbyHandyman);
        }
    }
    return update(state,{
        nearbyHandyman:{
            $set: newHandyman
        }
    })
}

function handleSetReferral(state,action){
    return update(state,{
        isReferring: {
            $set: action.isReferring
        },
        referrable:{
            $set: false
        }
    })
}

function handleSearchPlace(state,action){
    var lat, long, refer,address;
    if(action.results.status == 'OK'){
        lat = action.results.candidates[0].geometry.location.lat;
        long = action.results.candidates[0].geometry.location.lng;
        refer = true;
        address = action.referAddress
    }else{
        lat = state.region.latitude;
        long = state.region.longitude;
        refer = false;
    }
    return update(state,{
        region:{
            latitude: {
                $set: lat
            },
            longitude: {
                $set: long
            },
            latitudeDelta:{
                $set: LATITUDE_DELTA
            },
            longitudeDelta:{
                $set: LONGITUDE_DELTA
            }
        },
        referrable:{
            $set: refer
        },
        referAddress:{
            $set: refer? address: ''
        }
    })
}

function handleSetAddress(state,action){
    return update(state,{
        referAddress:{
            $set: action.text
        }
    })
}

function handleResetCustomerState(state,action){
    return state = initialState;
}

const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    GET_NEARBY_HANDYMAN: handleGetNearbyHandyman,
    REMOVE_HANDYMAN: handleRemoveHandyman,
    RESET_BOTH_STATE: handleResetCustomerState,
    SET_REFERRAL: handleSetReferral,
    SEARCH_PLACE: handleSearchPlace,
    SET_REFER_ADDRESS: handleSetAddress
};

const initialState = {
    region: {},
    nearbyHandyman: [],
    isReferring: false,
    referAddress: '',
    referrable: false,
};

export function SearchReducer(state = initialState,action){
    const handler = ACTION_HANDLERS[action.type];

    return handler? handler(state,action) : state;
}