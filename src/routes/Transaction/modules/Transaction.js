import update from 'react-addons-update';
import constants from './ActionConstants';
import request from '../../../util/request';
import localhosts,{getIpAddress} from '../../../util/localhost';
import {getID} from '../../../../Auth/auth';
//=======================
// Constants 
//=======================
const {
    GET_TRANSACTION,
    SET_TRANSACTION_MODAL_VISIBLE,
} = constants;

//=======================
// Actions
//=======================

export function getTransaction(){
    return (dispatch,store) => {
        getID().then((userID) => {
            var type = store().profile.type == 2? 'handymanID' : 'customerID';
            localhost = getIpAddress()
            request.get(localhost + '/api/transaction/'+ type +'/'+ userID)
                .finish((error,res) => {
                    dispatch({
                        type: GET_TRANSACTION,
                        transaction: res.body,
                    });
                })
        });
    }
}

export function setModalVisible(transactionID,isVisible){
    return (dispatch,store) => {
        
        getID().then((userID) => {
            var type = store().profile.type == 2? 'handymanID' : 'customerID';
            localhost = getIpAddress()
            request.get(localhost + '/api/transaction/'+ type +'/'+ userID + '/'+ transactionID)
                .finish((error,res) => {
                    dispatch({
                        type: SET_TRANSACTION_MODAL_VISIBLE,
                        data: res.body,
                        isVisible
                    })
                })
        })
    }
}

//=======================
// Action Handler
//=======================
function handleGetTransaction(state,action){
    const {transaction} = action;
    var transact = {};
    return update(state,{
        transaction: {
            $set: action.transaction
        },   
    })
}


function handleSetModalVisible(state,action){
    const {isVisible,data} = action;
    var choices = {};
    var transactionData = [];
    var firstName,middleName,lastName,date,service,amount,remarks,comment,rating;
    for(var ctr = 0;ctr<data.length;ctr++){
        firstName = data[ctr].firstName;
        middleName = data[ctr].middleName;
        lastName = data[ctr].lastName;
        date = data[ctr].date;
        service = data[ctr].service;
        amount = data[ctr].amount;
        remarks = data[ctr].remarks;
        comment = data[ctr].comment;
        rating = data[ctr].rating;
        var title = data[ctr].title;
        if(!choices[title]){
            choices[title] = [];
        }
        if(title == 'Measurement'){
            var measurement = data[ctr].measurement;
            var unit = measurement +' '+  data[ctr].description;
            choices[title].push({value: unit,amount: data[ctr].formAmount});
        }else{            
            choices[title].push({value: data[ctr].description,amount: data[ctr].formAmount});
        }
    }

    transactionData = {
        userProfile:{firstName,middleName,lastName},
        date,
        service,
        amount,
        remarks,
        comment,
        rating,
        choices: []
    }
    for(var title in choices){
        transactionData.choices.push({
            title,
            choices: choices[title],
        })
    }

    return update(state,{
        modalVisible: {
            $set: isVisible
        },
        transactionData: {
            $set: transactionData
        }
    })
}

function handleDeleteState(state,action){
    return state = initialState;
}

const ACTION_HANDLERS = {
    GET_TRANSACTION: handleGetTransaction,
    SET_TRANSACTION_MODAL_VISIBLE: handleSetModalVisible,
    DELETE_ALL_STATE: handleDeleteState
};


const initialState = {
    transaction: {},
    modalVisible: false,
    transactionData: {},
};

export function TransactionReducer(state = initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    return handler? handler(state,action) : state;
}
