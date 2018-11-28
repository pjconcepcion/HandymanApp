import React from 'react';
import {
    View,
    Text,
    AsyncStorage,
} from 'react-native';
import {getUserType} from '../../../../Auth/auth';
import MapContainer from './MapContainer';

const handymanMarker = require('../../../assets/handyman.png');
class Search extends React.Component{
    
    componentDidMount(){
        this.props.getCurrentLocation();
    }

    render(){
        return(            
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {this.props.region.latitude && 
                    <MapContainer 
                        region = {this.props.region} 
                        nearbyHandyman = {this.props.nearbyHandyman}
                        handymanMarker = {handymanMarker}
                        verifiedFlag = {this.props.verifiedFlag}
                        isReferring = {this.props.isReferring}
                        setReferral = {this.props.setReferral}
                        searchPlace = {this.props.searchPlace}
                        setAddress = {this.props.setAddress}
                        referAddress = {this.props.referAddress}
                        referrable = {this.props.referrable}
                        getCurrentLocation = {this.props.getCurrentLocation}
                    />
                }                
            </View>
        );
    }
}

export default Search;