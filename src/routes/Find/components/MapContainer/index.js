import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import styles from './MapContainerStyles';
import SearchContainer from '../SearchContainer';
import FindContainer from '../FindContainer';

export const MapContainer = ({region,modalVisible,setModalVisible,services,setService,serviceCount,points}) => {   
    return(
        <View style = {styles.container}>
            <MapView
                style = {styles.map}
                initialRegion = {region}
            >
                <MapView.Marker
                    coordinate = {region}
                    pinColor = {'red'}
                />
            </MapView>   
            {!modalVisible && 
                <SearchContainer setModalVisible = {setModalVisible} />                
            }
            <FindContainer 
                modalVisible = {modalVisible}
                setModalVisible = {setModalVisible}
                services = {services}
                setService = {setService}
                serviceCount = {serviceCount}
                region = {region}
                points = {points}
            />
        </View>
    );
}

export default MapContainer;