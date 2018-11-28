import React from 'react';
import {
    View, 
} from 'react-native';
import Footer from './Footer';
import MapContainer from './MapContainer';
import ModalProfile from './ModalProfile';
import ModalConfirm from './ModalConfirm';

class TrackHandyman extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            timeInterval: '',
        }
    }
    componentWillMount(){
        this.props.getUserProfile(this.props.data.userType,this.props.data.userID,this.props.data.data.fare);
        this.props.setDistance(this.props.data.data);

        if(this.props.data.userType == 1){
            var timer = setInterval(()=>{
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.props.setHandymanRegion(position);
                    },
                    (error) => {alert(error.message)},
                    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
                );
                this.props.getDistance();
                if(this.props.distance < 10){
                    clearInterval(this.state.timeInterval);
                }
            },5000);
            this.setState({timeInterval: timer});
        }else{
            var timer = setInterval( () => {
                this.props.getCurrentLocation();
                this.props.getDistance();
                if(this.props.distance < 10){
                    clearInterval(this.state.timeInterval);
                }

            },5000);
            this.setState({timeInterval: timer});
        }
    }

    render(){ 
        return(
            <View style = {{flex: 1}}>  
                {this.props.customerRegion.latitude && this.props.handymanRegion.latitude &&
                    <MapContainer 
                        customerRegion = {this.props.customerRegion} 
                        handymanRegion = {this.props.handymanRegion} 
                    />
                }
                <Footer 
                    setTrackModalVisible = {this.props.setTrackModalVisible}
                    setConfirmModalVisible = {this.props.setConfirmModalVisible}
                    distance = {this.props.distance}
                    profile = {this.props.profile}
                    message = {this.props.message}
                    setMessage = {this.props.setMessage}
                    isMessageRead = {this.props.isMessageRead}
                    roomSocket = {this.props.roomSocket}
                    userType = {this.props.data.userType}
                />    
                {this.props.trackModalVisible && 
                    <ModalProfile 
                        setTrackModalVisible = {this.props.setTrackModalVisible}
                        trackModalVisible = {this.props.trackModalVisible}
                        profile = {this.props.profile}
                    />
                }
                {this.props.confirmModalVisible &&
                    <ModalConfirm                         
                        setConfirmModalVisible = {this.props.setConfirmModalVisible}
                        confirmModalVisible = {this.props.confirmModalVisible}
                        confirmType = {this.props.confirmType}
                        roomSocket = {this.props.roomSocket}
                        bookingID = {this.props.bookingID}
                        userType = {this.props.data.userType}
                        userID = {this.props.data.userID}
                        reasonBoxMessage = {this.props.reasonBoxMessage}
                        setReasonBoxMessage = {this.props.setReasonBoxMessage}
                        customerSocket = {this.props.customerSocket}
                        handymanSocket = {this.props.handymanSocket}
                        cancelTransaction = {this.props.cancelTransaction}
                        timeInterval = {this.state.timeInterval}
                    />
                }
            </View>
        );
    }
}

export default TrackHandyman;