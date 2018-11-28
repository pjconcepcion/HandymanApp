import React from 'react';
import {View,Text} from 'react-native';
import MapView from 'react-native-maps';
import styles from './MapContainerStyles';
import SearchContainer from '../SearchContainer';
import PlaceContainer from '../PlaceContainer';

export const MapContainer = ({
        region,
        nearbyHandyman,
        handymanMarker,
        verifiedFlag,
        isReferring,
        setReferral,
        searchPlace,
        setAddress,
        referAddress,
        referrable,
        getCurrentLocation
    }) => {  

    return(
        <View style = {styles.container}>
            <MapView
                style = {styles.map}
                initialRegion = {region}
                region = {region}
            >
                <MapView.Marker
                    coordinate = {region}
                    pinColor = {'red'}
                />                
                {nearbyHandyman && nearbyHandyman.map((item,index) => 
                    <MapView.Marker
                        key = {index}
                        coordinate = {{latitude: item.region.latitude, longitude: item.region.longitude}}
                        pinColor = {'green'}
                    />  
                )}
            </MapView>          
            <SearchContainer 
                verifiedFlag = {verifiedFlag}
                setReferral = {setReferral}
                isReferring = {isReferring}
            />
            {isReferring &&
                <PlaceContainer
                    setReferral = {setReferral}
                    searchPlace = {searchPlace}
                    setAddress = {setAddress}
                    referAddress = {referAddress}
                    referrable = {referrable}
                    getCurrentLocation = {getCurrentLocation}
                />
            }
        </View>
    );
}

export default MapContainer;