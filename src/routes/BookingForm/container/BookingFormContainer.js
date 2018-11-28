import {connect} from 'react-redux';
import BookingForm from '../components/BookingForm';
import {
    getServices,
    setLoading,
    setService,
    setCheckbox,
    setRadioButton,
    setDropdown,
    setText,
    setRemarks,
    validateBook,
    getPenalty,
    setTextboxCheck,
    setTextboxRadio,
    setAddress
} from '../modules/BookingForm';

const mapStateToProps = (state) => ({
    services: state.bookingform.services || [],
    isLoading: state.bookingform.isLoading || false,
    selectedService: state.bookingform.selectedService || '',
    form: state.bookingform.form || {},
    remarks: state.bookingform.remarks || '',
    fare: state.bookingform.fare || 0,
    penalty: state.bookingform.penalty || 0,
})

const mapActionCreators = {
    getServices,
    setLoading,
    setService,
    setCheckbox,
    setRadioButton,
    setDropdown,
    setText,
    setRemarks,
    validateBook,
    getPenalty,
    setTextboxCheck,
    setTextboxRadio,
    setAddress
};

export default connect(mapStateToProps,mapActionCreators)(BookingForm);