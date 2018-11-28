import {connect} from 'react-redux';
import TrackHandyman from '../components/TrackHandyman';
import {
    setTrackModalVisible,
    setHandymanRegion,
    setConfirmModalVisible,
    getCurrentLocation,
    getUserProfile,
    getDistance,
    setMessage,
    setReasonBoxMessage,
    cancelTransaction,
    setDistance
} from '../modules/TrackHandyman';

const mapStateToProps = (state) => ({
    trackModalVisible: state.track.trackModalVisible || false,
    confirmModalVisible: state.track.confirmModalVisible || false,
    region: state.track.region || {},
    profile: state.track.profile || {},
    handymanRegion: state.track.handymanRegion || {},
    customerRegion: state.track.customerRegion || {},
    bookingID: state.track.bookingID || {},
    distance: state.track.distance || '',
    estimatedTime: state.track.estimatedTime || '',
    message: state.track.message || '',
    isMessageRead: state.track.isMessageRead || false,
    roomSocket: state.track.roomSocket || '',
    confirmType: state.track.confirmType || '',
    reasonBoxMessage: state.track.reasonBoxMessage || '',  
    customerSocket: state.track.customerSocket || '',
    handymanSocket: state.track.handymanSocket || '',
})

const mapActionCreators = {
    setTrackModalVisible,
    setConfirmModalVisible,
    setHandymanRegion,
    getCurrentLocation,
    getUserProfile,
    getDistance,
    setMessage,
    setReasonBoxMessage,
    cancelTransaction,
    setDistance
};

export default connect(mapStateToProps,mapActionCreators)(TrackHandyman);