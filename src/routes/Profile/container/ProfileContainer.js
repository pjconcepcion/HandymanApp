import {connect} from 'react-redux';
import Profile from '../components/Profile';
import {
    getProfile,
    setModalPayment,
    setValue,
    requestLoad,
    getPoints,
} from '../modules/Profile';

const mapStateToProps = (state) => ({ 
    name: state.profile.name || {},
    address: state.profile.address || {},
    birthDate: state.profile.birthDate || '',
    birthDay: state.profile.birthDay || '',
    gender: state.profile.gender || '',
    email: state.profile.email || '',
    contact: state.profile.contact || '',
    password: state.profile.password || '',
    profilePicture: state.profile.profilePicture || '',
    type: state.profile.type || '',
    isModalVisible: state.profile.isModalVisible || false,
    paymentValue: state.profile.paymentValue || 0,
    selectedIndex: state.profile.selectedIndex || -1,
    points: state.profile.points || 0,
})

const mapActionCreators = {
    getProfile,
    setModalPayment,
    setValue,
    requestLoad,
    getPoints
};

export default connect(mapStateToProps,mapActionCreators)(Profile);