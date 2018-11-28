import {connect} from 'react-redux';
import Notification from '../components/Notification';
import {
    getNotification,
    setNotification,
    setModalVisible,
} from '../modules/Notification';

const mapStateToProps = (state) => ({
    notification: state.notification.notification || [],
    modalVisible: state.notification.modalVisible,
    notificationData: state.notification.notificationData || {},
})

const mapActionCreators = {
    getNotification,
    setNotification,
    setModalVisible
};

export default connect(mapStateToProps,mapActionCreators)(Notification);