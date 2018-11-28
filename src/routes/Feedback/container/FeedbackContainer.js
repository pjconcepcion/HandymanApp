import {connect} from 'react-redux';
import Feedback from '../Components/Feedback';
import {
    setRating,
    setFeedBackComment,
    setModalReportVisible,
    getReportType,
    setReportType,
    setReportComment,
    getBookingDetails,
    submitReport,
    submitFeedback,
    checkPaidPenalty,
    resetState,
    markAsPaid
} from '../modules/Feedback';

const mapStateToProps = (state) => ({
    rate: state.feedback.rate || 2.5,
    feedbackComment: state.feedback.feedbackComment || '',
    modalReportVisible: state.feedback.modalReportVisible || false,
    reportType: state.feedback.reportType || {},
    setDescription: state.feedback.setDescription || '',
    bookingDetails: state.feedback.bookingDetails || {},
    userType: state.feedback.userType || '',
    paidPenalty: state.feedback.paidPenalty || false,
    isPaid: state.feedback.isPaid || false,
})

const mapActionCreators = {
    setRating,
    setFeedBackComment,
    setModalReportVisible,
    getReportType,
    setReportType,
    setReportComment,
    getBookingDetails,
    submitReport,
    submitFeedback,
    checkPaidPenalty,
    resetState,
    markAsPaid
};

export default connect(mapStateToProps,mapActionCreators)(Feedback);