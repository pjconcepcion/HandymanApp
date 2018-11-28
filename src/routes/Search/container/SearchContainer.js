import {connect} from 'react-redux';
import Search from '../components/Search';
import {
    getCurrentLocation,
    getNearbyHandyman,
    setReferral,
    searchPlace,
    setAddress
} from '../modules/Search';

const mapStateToProps = (state) => ({
    region: state.search.region,
    nearbyHandyman: state.search.nearbyHandyman || [],
    verifiedFlag: state.profile.verifiedFlag || '',
    isReferring: state.search.isReferring || false,
    referAddress: state.search.referAddress || '',
    referrable: state.search.referrable || false
})

const mapActionCreators = {
    getCurrentLocation,
    setReferral,
    searchPlace,
    setAddress
};

export default connect(mapStateToProps,mapActionCreators)(Search);