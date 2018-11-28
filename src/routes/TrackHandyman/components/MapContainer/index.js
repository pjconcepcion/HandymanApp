import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import styles from './MapContainerStyles';

export const MapContainer = ({customerRegion,handymanRegion}) => {   
    return(
        <View style = {styles.container}>
            <MapView
                style = {styles.map}
                initialRegion = {customerRegion}
            >
                <MapView.Marker
                    coordinate = {customerRegion}
                    pinColor = {'red'}
                />
                <MapView.Marker
                    coordinate = {handymanRegion}
                    pinColor = {'green'}
                />
            </MapView>
        </View>
    );
}

export default MapContainer;