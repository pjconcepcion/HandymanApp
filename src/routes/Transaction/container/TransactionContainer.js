import {connect} from 'react-redux';
import Transaction from '../components/Transaction';
import {
    getTransaction,
    setTransaction,
    setModalVisible,
} from '../modules/Transaction';

const mapStateToProps = (state) => ({
    transaction: state.transaction.transaction || [],
    modalVisible: state.transaction.modalVisible,
    transactionData: state.transaction.transactionData || {},
})

const mapActionCreators = {
    getTransaction,
    setTransaction,
    setModalVisible,
};

export default connect(mapStateToProps,mapActionCreators)(Transaction);