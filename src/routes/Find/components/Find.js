import React from 'react';
import {View,Text} from 'react-native';
import MapContainer from './MapContainer';

class Notification extends React.Component{   

    componentWillMount(){
        this.props.getCurrentLocation();
        this.props.getHandymanService();
        this.props.getPoints();
    }

    render(){
        return(
            <View style = {{flex: 1, backgroundColor: '#0288D1'}}>
                {this.props.region.latitude && 
                    <MapContainer 
                        region = {this.props.region}
                        setModalVisible = {this.props.setModalVisible}
                        modalVisible = {this.props.modalVisible}
                        services = {this.props.services}
                        setService = {this.props.setService}
                        serviceCount = {this.props.serviceCount}
                        points = {this.props.points}
                    />
                }
            </View>
        );
    }
}

export default Notification;