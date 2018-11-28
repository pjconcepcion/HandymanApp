import {connect} from 'react-redux';
import Settings from '../components/Settings';
import {
    setModal,
    saveEdit,
    setName,
    setAddress,
    setEmail,
    setContact,
    setPassword,
    setBirthDate,
    setGender,
    resetSettings,
    getProfile,
    getQuestions,
    getMyQuestion,
    setQuestion,
    setAnswer,
    setEmergency,
    deleteAllState
} from '../modules/Settings';

const mapStateToProps = (state) => ({
    modalSettings: state.settings.modalSettings || {},
    editProfile: state.settings.editProfile || {},
    profileData: state.profile || {},
    questions: state.settings.questions || {},
    securityQuestion: state.settings.securityQuestion || {}    
})

const mapActionCreators = {
    setModal,
    saveEdit,
    setName,
    setAddress,
    setEmail,
    setContact,
    setPassword,
    setBirthDate,
    setGender,
    resetSettings,
    getProfile,
    getQuestions,
    getMyQuestion,    
    setQuestion,
    setAnswer,  
    setEmergency,
    deleteAllState
};

export default connect(mapStateToProps,mapActionCreators)(Settings);