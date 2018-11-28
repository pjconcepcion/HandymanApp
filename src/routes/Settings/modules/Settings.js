import update from 'react-addons-update';
import constants from './ActionConstants';
import request from '../../../util/request';
import localhosts,{getIpAddress} from '../../../util/localhost';
import {getID} from '../../../../Auth/auth';
//=======================
// Constants 
//=======================
const {
    SET_SETTINGS_MODAL,
    SET_NAME,
    SET_ADDRESS,
    SET_EMAIL,
    SET_PASSWORD,
    SET_CONTACT,
    SAVE_EDIT,
    SET_BIRTHDATE,
    SET_GENDER,
    RESET_SETTINGS,
    GET_PROFILE,
    GET_MY_QUESTION,
    GET_QUESTION,
    SET_QUESTION,
    SET_ANSWER,
    SET_IMAGE,
    SET_EMERGENCY,
    DELETE_ALL_STATE
} = constants;

//=======================
// Actions
//=======================

export function setModal(settingsModal,isVisible){
    return (dispatch) => {
        dispatch({
            type: SET_SETTINGS_MODAL,
            modalType: settingsModal,
            isVisible: isVisible
        });
    }
}
export function setEmergency(type,text){
    return (dispatch,store) => {
        var contactPerson = type == 'contactPerson'? text : store().settings.editProfile.editEmergency.contactPerson;
        var contactNumber = type == 'contactNumber'? text : store().settings.editProfile.editEmergency.contactNumber;
        var relationship = type == 'relationship'? text : store().settings.editProfile.editEmergency.relationship;

        dispatch({
            type: SET_EMERGENCY,
            edit:{
                contactPerson,
                contactNumber,
                relationship
            }
        })
    }
}
export function setName(type,text){
    return (dispatch,store) => {
        var firstName = type == 'firstName'? text : store().settings.editProfile.editName.firstName;
        var middleName = type == 'middleName'? text : store().settings.editProfile.editName.middleName;
        var lastName = type == 'lastName'? text : store().settings.editProfile.editName.lastName;

        dispatch({
            type: SET_NAME,
            edit:{
                firstName,
                middleName,
                lastName
            }
        })
    }
}

export function setAddress(type,text){
    return (dispatch,store) => {
        var houseNo = type == 'houseNo'? text : store().settings.editProfile.editAddress.houseNo;
        var street = type == 'street'? text : store().settings.editProfile.editAddress.street;
        var barangay = type == 'barangay'? text : store().settings.editProfile.editAddress.barangay;
        var city = type == 'city'? text : store().settings.editProfile.editAddress.city;

        dispatch({
            type: SET_ADDRESS,
            edit:{
                houseNo,
                street,
                barangay,
                city
            }
        })
    }
}

export function setEmail(text){
    return (dispatch) => {
        dispatch({
            type: SET_EMAIL,
            edit: {
                email: text
            }
        })
    }
}

export function setContact(text){
    return (dispatch) => {
        dispatch({
            type: SET_CONTACT,
            edit: {
                contact: text
            }
        })
    }
}

export function setPassword(type,text){
    return (dispatch,store) => {
        var currentPassword = type == 'currentPassword'? text : store().settings.editProfile.editPassword.currentPassword;
        var newPassword = type == 'newPassword'? text : store().settings.editProfile.editPassword.newPassword;
        var reNewPassword = type == 'reNewPassword'? text : store().settings.editProfile.editPassword.reNewPassword;
        dispatch({
            type: SET_PASSWORD,
            edit: {
                currentPassword,
                newPassword,
                reNewPassword
            }
        })
    }
}

export function setBirthDate(date){
    return (dispatch) => {
        dispatch({
            type: SET_BIRTHDATE,
            edit:{
                birthDate: date
            }
        })
    }
}

export function setGender(gender){
    return (dispatch) => {
        dispatch({
            type: SET_GENDER,
            edit:{
                gender:{
                    male: gender,
                    female: !gender,
                }
            }
        })
    }
}

export function setQuestion(index){
    return (dispatch,store) => {
        dispatch({
            type: SET_QUESTION,
            question: store().settings.questions[index]
        })
    }
}

export function setAnswer(type,text){
    return (dispatch,store) => {
        var currentAnswer = type == 'currentAnswer'? text : store().settings.editProfile.editQuestion.currentAnswer;
        var newAnswer = type == 'newAnswer'? text : store().settings.editProfile.editQuestion.newAnswer;
        var reNewAnswer = type == 'reNewAnswer'? text : store().settings.editProfile.editQuestion.reNewAnswer;
        dispatch({
            type: SET_ANSWER,
            currentAnswer,
            newAnswer,
            reNewAnswer
        })
    }
}

export function saveEdit(type){
    return (dispatch,store) => {
        var storeData = {};
        var editType = '';
        if(type == 'Name'){
            storeData.firstName = store().settings.editProfile.editName.firstName == null?
                store().profile.name.firstName : store().settings.editProfile.editName.firstName;    
            storeData.middleName = store().settings.editProfile.editName.middleName == null?
                store().profile.name.middleName : store().settings.editProfile.editName.middleName;            
            storeData.lastName = store().settings.editProfile.editName.lastName == null?
                store().profile.name.lastName : store().settings.editProfile.editName.lastName;                                  
            editType = 'name';
        }
        else if(type == 'Address'){
            storeData.houseNo = store().settings.editProfile.editAddress.houseNo == null?
                store().profile.address.houseNo : store().settings.editProfile.editAddress.houseNo;
            storeData.street = store().settings.editProfile.editAddress.street == null?
                store().profile.address.street : store().settings.editProfile.editAddress.street;
            storeData.barangay = store().settings.editProfile.editAddress.barangay == null?
                store().profile.address.barangay : store().settings.editProfile.editAddress.barangay;
            storeData.city = store().settings.editProfile.editAddress.city == null?
                store().profile.address.city : store().settings.editProfile.editAddress.city;
            editType = 'address';   
        }
        else if(type == 'Birthdate'){
            storeData = store().settings.editProfile.editBirthDate;
            editType = 'birthDate';
        }
        else if(type == 'Gender'){
            storeData = store().settings.editProfile.editGender.male? 1 : 0;
            editType = 'gender';
        }
        else if(type == 'Email Address'){
            storeData = store().settings.editProfile.editEmail;
            editType = 'email';
        }
        else if(type == 'Contact'){
            storeData = store().settings.editProfile.editContact;
            editType = 'contact';
        }
        else if(type == 'Password'){
            storeData = store().settings.editProfile.editPassword.newPassword;
            editType = 'password';
        }
        else if(type == 'Security Question'){
            storeData.question = store().settings.editProfile.editQuestion.question == null? 
                store().settings.securityQuestion.questionID : store().settings.editProfile.editQuestion.question.questionID;
            storeData.answer = store().settings.editProfile.editQuestion.newAnswer == null? 
                store().settings.securityQuestion.answer : store().settings.editProfile.editQuestion.newAnswer;
            editType = 'securityQuestion';
        }
        else if(type == 'Profile picture'){
            storeData =  store().settings.editProfile.editImage;
            editType = 'profilepicture';
        }
        else if(type == 'Contact Person'){
            storeData.emergencyPerson = store().settings.editProfile.editEmergency.contactPerson == null?
                store().profile.contactPerson.emergencyPerson : store().settings.editProfile.editEmergency.contactPerson;    
            storeData.emergencyNumber = store().settings.editProfile.editEmergency.contactNumber == null?
                store().profile.contactPerson.emergencyNumber : store().settings.editProfile.editEmergency.contactNumber;            
            storeData.emergencyRelationship = store().settings.editProfile.editEmergency.relationship == null?
                store().profile.contactPerson.emergencyRelationship : store().settings.editProfile.editEmergency.relationship;                                  
            editType = 'contactPerson';
        }

        getID().then((userID) => {
            var url = '';
            localhost = getIpAddress()
            if(type == 'Security Question'){
                url = localhost + '/api/questions/'+ userID;
            }
            else{
                url = localhost + '/api/profile/'+ userID;
            }

            if(type == 'Profile picture'){
                    var data = new FormData();
                    data.append("image", storeData);
                    data.append("album", "fjqQFiE");
                    fetch('https://api.imgur.com/3/image/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Client-ID bc0b038c2f990f3',
                            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                        },
                        body: data,
                        })
                        .then((res) => console.log(res));
                    /*var xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;

                    xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            console.log(this.responseText);
                        }
                    });

                    xhr.open("POST", "https://api.imgur.com/3/image");
                    xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW");
                    xhr.setRequestHeader("Authorization", "Client-ID bc0b038c2f990f3");
                    xhr.setRequestHeader("Cache-Control", "no-cache");
                    xhr.setRequestHeader("Postman-Token", "dd18d3b2-db84-4c6a-a25e-6af109fa40ca");

                    xhr.send(data); */
            }else{
                request.post(url)
                .send({type: editType,value: storeData})
                .finish((error,res)=> { 
                    if(!error){
                        alert('Successfully saved!');
                    }else{
                        console.log(error);
                    }
                    dispatch({
                        type: SET_SETTINGS_MODAL,                    
                        modalType: '',
                        isVisible: false
                    })  
                    if(type != 'Security Question'){                        
                        dispatch({
                            type: SAVE_EDIT,
                            editType,
                            storeData             
                        }) 
                    }else{
                        dispatch({
                            type: GET_MY_QUESTION,
                            securityQuestion: {
                                question: storeData.question.value,
                                questionID: storeData.question.questionID,
                                answer: storeData.answer
                            }
                        })
                    }
                    dispatch({
                        type: RESET_SETTINGS
                    })
                })
            }
        });
    }
}

export function resetSettings(){
    return (dispatch) => {
        dispatch({
            type: RESET_SETTINGS
        })
    }
}

export function getProfile(){
    return (dispatch) => {
        getID().then((userID) => {
        localhost = getIpAddress()
        request.get(localhost + '/api/profile/' + userID)
            .finish((error,res)=> {  
                if(!error){  
                    dispatch({
                        type: GET_PROFILE,
                        profile: res.body
                    })
                }else{
                    console.log(error);
                }
            })
        });
    }
}

export function getMyQuestion(){
    return (dispatch) => {
        getID().then((userID) => {
            localhost = getIpAddress()
            request.get(localhost + '/api/questions/' + userID)
                .finish((error,res) => {
                    if(!error){
                        dispatch({
                            type: GET_MY_QUESTION,
                            securityQuestion: res.body
                        })
                    }
                })
        });
    }   
}

export function getQuestions(){
    return (dispatch) => {
        localhost = getIpAddress()
        request.get(localhost + '/api/questions')
            .finish((error,res) => {
                if(!error){   
                    dispatch({
                        type: GET_QUESTION,
                        questions: res.body
                    })
                }
            })
    }
}

export function setImage(base64){
    return (dispatch) => {
        dispatch({
            type: SET_IMAGE,
            image: base64,
        })
    }
}

export function deleteAllState(){
    return (dispatch) => {
        dispatch({
            type: DELETE_ALL_STATE,
        })
    }
}


//=======================
// Action Handler
//=======================
function handleSetModal(state,action){
    return update(state,{
        modalSettings:{
            modalType:{
                $set: action.modalType
            },
            isVisible:{
                $set: action.isVisible
            }
        },        
    })
}

function handleSetName(state,action){
    return update(state,{
        editProfile:{
            editName:{
                firstName:{
                    $set: action.edit.firstName
                },
                middleName:{
                    $set: action.edit.middleName
                },
                lastName:{
                    $set: action.edit.lastName
                }
            }
        }
    })
}

function handleSetAddress(state,action){
    return update(state,{
        editProfile:{
            editAddress:{
                houseNo:{
                    $set: action.edit.houseNo
                },
                street:{
                    $set: action.edit.street
                },
                barangay:{
                    $set: action.edit.barangay
                },
                city:{
                    $set: action.edit.city
                }
            }
        }
    })
}

function handleSetEmail(state,action){
    return update(state,{
        editProfile:{
            editEmail:{
                $set: action.edit.email
            }
        }
    })
}

function handleSetContact(state,action){
    return update(state,{
        editProfile:{
            editContact:{
                $set: action.edit.contact
            }
        }
    })
}

function handleSetPassword(state,action){
    return update(state,{
        editProfile:{
            editPassword:{
                currentPassword:{
                    $set: action.edit.currentPassword
                },
                newPassword:{
                    $set: action.edit.newPassword
                },
                reNewPassword:{
                    $set: action.edit.reNewPassword
                },
            }
        }
    })
}

function handleSetBirthDate(state,action){
    return update(state,{
        editProfile:{
            editBirthDate: {
                $set: action.edit.birthDate
            }
        }
    })
}

function handleSetGender(state,action){
    return update(state,{
        editProfile:{
            editGender: {
                male: {
                    $set: action.edit.gender.male
                },
                female: {
                    $set: action.edit.gender.female
                }
            }
        }
    })
}

function handleResetSettings(state,action){
    return update(state,{
        editProfile:{
            $set: initialState.editProfile
        }
    })
}

function handleGetMyQuestion(state,action){
    return update(state,{
        securityQuestion:{
            question:{
                $set: action.securityQuestion.question
            },
            answer:{
                $set: action.securityQuestion.answer
            },
            questionID:{
                $set: action.securityQuestion.questionID
            }
        }
    })
}

function handleGetQuestions(state,action){
    return update(state,{
        questions:{
            $set: action.questions
        }
    })
}

function handleSetQuestion(state,action){
    return update(state,{
        editProfile:{
            editQuestion:{
                question:{
                    $set: action.question
                }
            }
        }
    })
}

function handleSetAnswer(state,action){
    return update(state,{
        editProfile:{
            editQuestion:{
                currentAnswer:{
                    $set: action.currentAnswer
                },
                newAnswer:{
                    $set: action.newAnswer
                },
                reNewAnswer:{
                    $set: action.reNewAnswer
                }
            }
        }
    })
}

function handleSetImage(state,action){
    return update(state,{
        editProfile:{
            editImage:{
                $set: action.image
            }
        }
    })
}

function handleSetEmergency(state,action){
    return update(state,{
        editProfile:{
            editEmergency:{
                contactPerson:{
                    $set: action.edit.contactPerson
                },
                contactNumber:{
                    $set: action.edit.contactNumber
                },
                relationship:{
                    $set: action.edit.relationship
                }
            }
        }
    })
}

function handleDeleteState(state,action){
    return state = initialState;
}

const ACTION_HANDLERS = {
    SET_SETTINGS_MODAL: handleSetModal,
    SET_NAME: handleSetName,
    SET_ADDRESS: handleSetAddress,
    SET_EMAIL: handleSetEmail,
    SET_CONTACT: handleSetContact,
    SET_PASSWORD: handleSetPassword,
    SET_BIRTHDATE: handleSetBirthDate,
    SET_GENDER: handleSetGender,
    RESET_SETTINGS: handleResetSettings,
    GET_MY_QUESTION: handleGetMyQuestion,
    GET_QUESTION: handleGetQuestions,
    SET_QUESTION: handleSetQuestion,
    SET_ANSWER: handleSetAnswer,
    SET_IMAGE: handleSetImage,
    SET_EMERGENCY: handleSetEmergency,
    DELETE_ALL_STATE: handleDeleteState
};


const initialState = {
    modalSettings: {},   
    editProfile: {
        editName:{
            firstName: null,
            middleName: null,
            lastName: null
        },
        editAddress: {
            houseNo: null,
            street: null,
            barangay: null,
            city: null,
        },
        editGender: {
            male: '',
            female:'',
        },
        editBirthDate: '',
        editEmail: null,
        editContact: null,
        editPassword: {
            currentPassword: '',
            newPassword: '',
            reNewPassword: '',
        },
        editQuestion: {
            question: null,
            currentAnswer: null,
            newAnswer: null,
            reNewAnswer: null,
        },
        editEmergency:{
            contactPerson: null,
            contactNumber: null,
            relationship: null
        }
    },
    questions: {},
    securityQuestion: {},
};

export function SettingsReducer(state = initialState,action){
    const handler = ACTION_HANDLERS[action.type];
    return handler? handler(state,action) : state;
}
