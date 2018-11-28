import update from 'react-addons-update';
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
    SET_LOADING,
    GET_SERVICES,
    GET_FORM,
    SET_SERVICE,
    SET_CHECKBOX,
    SET_RADIOBUTTON,
    SET_DROPDOWN,
    SET_TEXT,
    SET_REMARKS,
    GET_PENALTY,
    SET_BOOKING,
    SET_TEXTBOX_CHECK,
    DELETE_ALL_STATE,
    RESET_BOOKING_FORM,
    SET_TEXTBOX_RADIO,
    SET_REFER_ADDRESS
} = constants;
//=======================
// Actions
//=======================

export function getServices(){
    return (dispatch) => {
        localhost = getIpAddress()
        request.get(localhost + '/api/services')
        .finish((error,res) => {
            if(error){
                console.log(error);
            }else{
                dispatch({
                    type: GET_SERVICES,
                    services: res.body
                })
            }
        });
    }    
}

export function setLoading(isLoading){
    return (dispatch) => {
        dispatch({
            type: SET_LOADING,
            isLoading
        })
    }
}

export function setService(service,index){
    return (dispatch,store) => {
        var selectedService = store().bookingform.services[index];
        dispatch({
            type: SET_SERVICE,
            selectedService
        })
        localhost = getIpAddress()
        request.get(localhost + '/api/services/form/' + selectedService.serviceID)
            .finish((error,res) => {
                dispatch({
                    type: GET_FORM,
                    form: res.body
                })
            })
    }
}

export function setCheckbox(formIndex,index){
    return (dispatch,store) => {
        dispatch({
            type: SET_CHECKBOX,
            formIndex,
            index,
            isSelected: !store().bookingform.form[formIndex].choices[index].selected
        })
    }
}

export function setTextboxCheck(formIndex,index,value){
    return (dispatch,store) => {
        dispatch({
            type: SET_TEXTBOX_CHECK,
            formIndex,
            index,
            value,
            isSelected: value == ''? false : true
        })
    }
}

export function setRadioButton(formIndex,index,value){
    return (dispatch) => {
        dispatch({
            type: SET_RADIOBUTTON,
            formIndex,
            index,
            selected: value
        })
    }
}

export function setTextboxRadio(formIndex,index,value){
    return (dispatch) => {
        dispatch({
            type: SET_TEXTBOX_RADIO,
            formIndex,
            index,
            value,
        })
    }
}

export function setDropdown(formIndex,index,value){
    return (dispatch,store) => {
        var selected = store().bookingform.form[formIndex].choices[index];
        dispatch({
            type: SET_DROPDOWN,
            formIndex,
            index,
            selected
        })
    }
}

export function setText(formIndex,value){    
    return (dispatch,store) => {
        var id = store().bookingform.form[formIndex].choices[0].id;
        dispatch({
            type: SET_TEXT,
            formIndex,
            value:{
                id,
                value
            }
        })
    }
}

export function setRemarks(text){
    return (dispatch) => {
        dispatch({
            type: SET_REMARKS,
            text
        })
    }
}

export function validateBook(){
    return (dispatch,store) => {
        const {form,selectedService,fare,penalty,remarks} = store().bookingform;
        var formLength = form.length;
        var checker = 0;
        var choices = [];
        var groups = {};
        for(var ctr = 0;ctr< formLength;ctr++){
            var title = form[ctr].title;
            if(!groups[title]){
                groups[title] = [];
            }
            if(typeof form[ctr].selected === 'object'){
                if(Array.isArray(form[ctr].selected)){
                    if(form[ctr].selected.length > 0){                        
                        checker += 1;
                        for(var arrCtr = 0; arrCtr<form[ctr].selected.length;arrCtr++){
                            choices.push({
                                id: form[ctr].selected[arrCtr].id, 
                                value: form[ctr].selected[arrCtr].value,
                                description: form[ctr].selected[arrCtr].value + 
                                    ' '+ (form[ctr].selected[arrCtr].measurement || ''),
                            });                                
                            groups[title].push({
                                id: form[ctr].selected[arrCtr].id, 
                                value: form[ctr].selected[arrCtr].value,
                                description: form[ctr].selected[arrCtr].value +
                                    ' '+ (form[ctr].selected[arrCtr].measurement || ''),
                            });  
                        }
                    }
                }
                else if(form[ctr].title == 'Measurement'){ 
                    alert(form[ctr].selected.value);
                    if(form[ctr].selected.value.trim() != ''){
                        groups[title].push({
                            id: form[ctr].selected.id,
                            value: form[ctr].selected.value,
                            description: form[ctr].selected.value + ' ' + form[ctr].choices[0].value,
                        })
                        choices.push({
                            id: form[ctr].selected.id,
                            value: form[ctr].selected.value,
                            description: form[ctr].selected.value + ' ' + form[ctr].choices[0].value,
                        });
                        checker += 1;
                    }    
                }
                else if(form[ctr].selected.id){
                    checker += 1;
                    choices.push({
                        id: form[ctr].selected.id,
                        value: form[ctr].selected.value,
                        description: form[ctr].selected.value
                    });
                    groups[title].push({
                        id: form[ctr].selected.id,
                        value: form[ctr].selected.value,
                        description: form[ctr].selected.value
                    });
                }
            }
        }

        if(checker == formLength){
            var newForm = [];
            for(var title in groups){
                newForm.push({
                    title,
                    choices: groups[title]
                });
            }
            getID().then((userID) => {
                var bookingData = {
                    data:{
                        customerID: userID,
                        name: store().profile.name,
                        address: store().bookingform.referAddress? store().bookingform.referAddress : store().profile.address,
                        region: store().search.region,
                        service: selectedService.value,
                        serviceID: selectedService.serviceID,                        
                        fare: (fare + penalty),
                        choices,
                        newForm,
                        remarks: remarks? remarks: '',            
                    }
                };
                localhost = getIpAddress()
                request.post(localhost + '/api/bookings/')
                    .send(bookingData)
                    .finish((error,res) => {
                        if(!error){
                            bookingData.data.bookingID = res.body;
                            socketAction('book',bookingData.data);
                            Actions.push('searching');
                        }
                    })
            })
           
        }
    }
}

export function getPenalty(){
    return (dispatch) => {
        getID().then((userID) => {
            localhost = getIpAddress()
            request.get(localhost + '/api/penalty/' + userID)
                .finish((error,res) => {
                    dispatch({
                        type: GET_PENALTY,
                        penalty: res.body
                    })
                })
        })
    }
}

export function setAddress(address){
    return (dispatch) => {
        dispatch({
            type: SET_REFER_ADDRESS,
            referAddress: address
        })
    }
}
//=======================
// Action Handler
//=======================

function handleGetServices(state,action){   
    return update(state,{
        services:{
            $set: action.services
        }
    })
}

function handleSetService(state,action){
    return update(state,{
        selectedService: {
            $set: action.selectedService
        },
        fare:{
            $set: action.selectedService.amount
        }   
    })
}

function handleSetLoading(state,action){
    return update(state,{
        isLoading: {
            $set: action.isLoading
        }
    })
}

function handleGetForm(state,action){
    const {form} = action;
    var groups = {};
    var newForm = [];
    for(var ctr = 0;ctr<form.length;ctr++){
        var title = form[ctr].title;
        var component = form[ctr].component;
        if(!groups[title]){
            groups[title] = [];
        }
        if(component == 'RadioButton'){
            groups[title].push({
                id: form[ctr].ID,
                name: form[ctr].description,
                amount: form[ctr].amount,
                unit: form[ctr].unit, 
            });
        }
        else if(component == 'Checkbox'){
            groups[title].push({
                id: form[ctr].ID,
                name: form[ctr].description,
                amount: form[ctr].amount,                 
                unit: form[ctr].unit, 
                selected: false
            });
        }
        else{
            groups[title].push({
                id: form[ctr].ID,
                value: form[ctr].description,                
                amount: form[ctr].amount,
            });
        }
        groups[title]['component'] = component;
        groups[title]['selected'] = [];
    }

    for(var title in groups){
        newForm.push({
            title,
            component: groups[title].component,
            selected: groups[title].selected,
            choices: groups[title]
        });
    }

    return update(state,{
        form:{
            $set: newForm
        }
    })
}

function handleSetCheckbox(state,action){
    const {formIndex,index} = action;
    var selected = state.form[formIndex].selected;
    var fare = state.fare;
    if(action.isSelected){
        selected.push({
            id: state.form[formIndex].choices[index].id,
            value: state.form[formIndex].choices[index].name,
        })
        if(state.form[formIndex].choices[index].unit === null){
            fare += state.form[formIndex].choices[index].amount;
        }
    }else{
        selected = selected.filter(select => select.id != state.form[formIndex].choices[index].id);
        if(state.form[formIndex].choices[index].unit === null){
            fare -= state.form[formIndex].choices[index].amount;
        }
    }

    return update(state,{
        form:{
            [formIndex]:{
                choices:{                
                    [index]:{
                        selected:{
                            $set: action.isSelected
                        }
                    }
                },
                selected:{
                    $set: selected
                }
            }
        },
        fare:{
            $set: fare
        }   
    })
}


function handleSetTextboxCheck(state,action){
    const {formIndex,index,value} = action;
    var selected = state.form[formIndex].selected;
    var fare = state.fare;
    if(action.isSelected){
        if(selected.length > 0){
            prevFare = selected.filter(select => select.id == state.form[formIndex].choices[index].id);
            if(prevFare[0].amount){
                fare = fare - prevFare[0].amount;
            }
            selected = selected.filter(select => select.id != state.form[formIndex].choices[index].id);
        }
        selected.push({
            id: state.form[formIndex].choices[index].id,
            value: state.form[formIndex].choices[index].name,
            measurement: value +' '+ state.form[formIndex].choices[index].unit,
            amount: state.form[formIndex].choices[index].amount * value
        })
        fare += state.form[formIndex].choices[index].amount * value;
    }else{
        prevFare = selected.filter(select => select.id == state.form[formIndex].choices[index].id);
        selected = selected.filter(select => select.id != state.form[formIndex].choices[index].id);
        fare = fare - prevFare[0].amount;
    }

    return update(state,{
        form:{
            [formIndex]:{
                choices:{                
                    [index]:{
                        selected:{
                            $set: action.isSelected
                        }
                    }
                },
                selected:{
                    $set: selected
                }
            }
        },
        fare:{
            $set: fare
        }  
    })
}

function handleSetRadioButton(state,action){ 
    const {formIndex,index,selected} = action;
    var hasUnit = state.form[formIndex].choices[index].unit;
    var prevSelect = state.form[formIndex].selected;
    var fare = state.fare;
    if(prevSelect.amount){
        fare -= prevSelect.amount;
    }
    if(!hasUnit){
        selected.amount = state.form[formIndex].choices[index].amount;
        fare += state.form[formIndex].choices[index].amount;
    }
    return update(state,{
       form:{
           [formIndex]:{
                selected:{
                    $set: selected                   
                }
           }
       },
       fare:{
           $set: fare
       }
   })    
}

function handleSetTextboxRadio(state,action){
    const {formIndex,index,value} = action;
    var selected = state.form[formIndex].selected;
    var fare = state.fare;
    var prevSelect = state.form[formIndex].selected;
    if(prevSelect.amount){
        fare -= selected.amount;
        alert('hello');
    }
    selected.amount = state.form[formIndex].choices[index].amount * value;
    fare += state.form[formIndex].choices[index].amount * value;
    return update(state,{
        form:{
            [formIndex]:{
                selected:{
                    $set: selected
                }
            }
        },
        fare:{
            $set: fare
        }
    })
}

function handleSetDropdown(state,action){
    const {formIndex,selected,index} = action;
    var fare = state.fare;  
    var prevSelect = state.form[formIndex].selected;
    if(prevSelect.id){
        var choices = state.form[formIndex].choices;
        var prevFare = choices.filter(select => select.id == prevSelect.id);    
        fare -= prevFare[0].amount;
    }
    fare += state.form[formIndex].choices[index].amount;

    return update(state,{
        form:{
            [formIndex]:{
                 selected:{
                     $set: selected
                 }
            }
        },
        fare:{
            $set: fare
        }
    })  
}

function handleSetText(state,action){
    const {formIndex,index,value} = action;
    var fare = state.fare;  
    var prevSelect = state.form[formIndex].selected;

    if(value){
        if(prevSelect.id){
            var amount = state.form[formIndex].choices[0].amount;
            var prevFare = amount * prevSelect.value; 
            fare -= prevFare;
        }        
        fare += (state.form[formIndex].choices[0].amount * value.value);
    }else{
        if(prevSelect.id){
            var amount = state.form[formIndex].choices[0].amount;
            var prevFare = amount * prevSelect.value; 
            fare -= prevFare;
        }
    }

    return update(state,{
        form:{
            [formIndex]:{
                selected:{
                    $set: value
                }
            }
        },
        fare:{
            $set: fare
        }
    })
}

function handleSetRemarks(state,action){
    const {text} = action;
    return update(state,{
        remarks: {
            $set: text
        }
    })
}

function handleSetFare(state,action){ 
    return update(state,{
        fare: {
            $set: fare
        }
    })
}

function handleGetPenalty(state,action){
    const {penalty} = action;
    return update(state,{
        penalty: {
            $set: penalty.amount
        },
    })
}

function handleSetBooking(state,action){
    return update(state,{
        bookingID:{
            $set: action.id
        }
    })
}

function handleSetAddress(state,action){
    return update(state,{
        referAddress:{
            $set: action.referAddress
        }
    })
}

function handleResetBook(state,action){
    return state = initialState;
}

function handleDeleteState(state,action){
    return state = initialState;
}

const ACTION_HANDLERS = {
    GET_SERVICES: handleGetServices,
    GET_FORM: handleGetForm,
    SET_LOADING: handleSetLoading,
    SET_SERVICE: handleSetService,
    SET_CHECKBOX: handleSetCheckbox,
    SET_RADIOBUTTON: handleSetRadioButton,
    SET_DROPDOWN: handleSetDropdown,
    SET_TEXT: handleSetText,
    SET_REMARKS: handleSetRemarks,
    GET_PENALTY: handleGetPenalty,
    SET_BOOKING: handleSetBooking,
    SET_TEXTBOX_CHECK: handleSetTextboxCheck,
    SET_TEXTBOX_RADIO: handleSetTextboxRadio,
    DELETE_ALL_STATE: handleDeleteState,
    RESET_BOOKING_FORM: handleResetBook,
    SET_REFER_ADDRESS: handleSetAddress

};


const initialState = {
    services:[],
    form: [],
    selectedService: '',
    isLoading: false,
    fare: 0,
};

export function BookingFormReducer(state = initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    return handler? handler(state,action) : state;
}
