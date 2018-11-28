import {connect} from 'react-redux';
import Find from '../components/Find';
import {
    getCurrentLocation,
    setModalVisible,
    getHandymanService,
    setService,
    trackLocation,
    getPoints
} from '../modules/Find';

const mapStateToProps = (state) => ({
    region: state.find.region || {},
    modalVisible: state.find.modalVisible,
    services: state.find.services || {},
    watchID: state.find.watchID || '',
    points: state.profile.points || '',
})

const mapActionCreators = {
    getCurrentLocation,
    setModalVisible,
    getHandymanService,
    setService,
    trackLocation,
    getPoints
};

export default connect(mapStateToProps,mapActionCreators)(Find);