import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import styles from './ModalProfileStyles'
import Modal from 'react-native-modal';
import {Avatar,Rating,ListItem} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { setConfirmModalVisible } from '../../modules/TrackHandyman';

export const ModalProfile = ({trackModalVisible,setTrackModalVisible,setConfirmModalVisible,profile}) => {

    var profileList = [
        {
            title: profile.name,
            subtitle: 'Name',
            icon: 'person',
        },{
            title: profile.address,
            subtitle: 'Address',
            icon: 'home',
        },{            
            title: profile.birthDay +'('+ profile.age +' years old)',
            subtitle: 'Birthdate',
            icon: 'cake',
        },{            
            title: profile.gender,
            subtitle: 'Gender',
            icon: 'accessibility',
        },{            
            title: profile.email,
            subtitle: 'Email',
            icon: 'email',
        },{            
            title: profile.contact,
            subtitle: 'Contact',
            icon: 'phone',
        }
    ]

    function closeTrackModalVisible(){
        setTrackModalVisible(false);
    }
    
    return(
        <Modal
            isVisible = {trackModalVisible}
            onBackButtonPress = {() => closeTrackModalVisible()}
        >
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <View style = {styles.avatarContainer}>
                        <Avatar 
                            large
                            rounded
                            source = {require('../../../../assets/profile1.png')}
                        />
                        {profile.rating > -1?
                            <Rating
                                imageSize = {30}
                                style = {{paddingHorizontal: 10}}
                                type = {'star_modal'}             
                                readonly = {true}
                                ratingColor = {'#FFC107'}
                                startingValue = {profile.rating}
                            /> : null
                        }
                    </View>
                    <View style = {styles.btnCloseContainer}>
                        <TouchableOpacity onPress = {() => closeTrackModalVisible()}>
                            <MaterialIcons name = {'close'} size = {30} color = {'white'}/>
                        </TouchableOpacity>
                    </View>                    
                </View>
                <ScrollView style = {styles.contentContainer} showsHorizontalScrollIndicator>     
                {
                    profileList.map((item,index) =>                        
                        <ListItem
                            key = {index}
                            title = {item.title}
                            subtitle = {item.subtitle}
                            leftIcon = {{name: item.icon, size: 30,color: 'white'}}
                            titleStyle = {styles.txtTitle}
                            subtitleStyle = {styles.txtSubtitle}
                            hideChevron
                        />    
                    )   
                }    
                </ScrollView>                
                <View style = {styles.btnContainer}>
                    <TouchableOpacity 
                        style = {styles.btnClose}
                        onPress = {() => closeTrackModalVisible()}
                    >
                        <Text> Close </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default ModalProfile;