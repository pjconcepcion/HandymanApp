import React from 'react';
import {View} from 'react-native';
import HeaderContainer from './HeaderContainer';
import ProfileContainer from './ProfileContainer';
import ModalPaymentContainer from './ModalPaymentContainer';
import Loading from '../../../components/Loading';

class Profile extends React.Component{
    constructor(props){
       super(props);
       this.state = {
           isLoading: true,
       }        
    }

    componentWillMount(){
        this.props.getProfile();
        setTimeout(() => {
            this.setState({isLoading: false});
            if(this.props.type && this.props.type == 2){
                this.props.getPoints();
            }
        },2000)
    }
    
    render(){
        return(
            <View style = {{flex: 1, backgroundColor: '#0288D1'}}>
                <Loading isLoading = {this.state.isLoading}/>
                <HeaderContainer 
                    name = {this.props.name} 
                    profilePicture = {this.props.profilePicture}
                    type = {this.props.type}
                    setModalPayment = {this.props.setModalPayment}
                    points = {this.props.points}
                />  
                {this.props.isModalVisible && 
                    <ModalPaymentContainer 
                        isModalVisible = {this.props.isModalVisible}
                        setModalPayment = {this.props.setModalPayment}
                        setValue = {this.props.setValue}
                        paymentValue = {this.props.paymentValue}
                        selectedIndex = {this.props.selectedIndex}
                        requestLoad = {this.props.requestLoad}
                    />
                }
                <ProfileContainer 
                    address = {this.props.address}
                    birthDay = {this.props.birthDay}
                    gender = {this.props.gender}
                    email = {this.props.email} 
                    contact = {this.props.contact}
                />              
            </View>
        );
    }
}

export default Profile;