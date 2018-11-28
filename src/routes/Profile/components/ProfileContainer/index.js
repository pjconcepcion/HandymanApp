import React from 'react';
import {
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { List,ListItem } from 'react-native-elements';
import styles from './ProfileContainerStyles';

const HeaderContainer = ({address,birthDay,gender,email,contact}) => {  
    var address = address.houseNo? 
        (address.houseNo + ' ' + address.street + ' ' + address.barangay + ', '+ address.city) : '';  
         
    if(gender == 1){
        gender = 'Male';
    }
    else if(gender == 0){
        gender = 'Female';
    }else{
        gender = '';
    }

    var profileList = [
        {
            title: address,
            subtitle: 'Address',
            icon: 'home',
        },{            
            title: birthDay,
            subtitle: 'Birthdate',
            icon: 'cake',
        },{            
            title: gender,
            subtitle: 'Gender',
            icon: 'accessibility',
        },{            
            title: email,
            subtitle: 'Email',
            icon: 'email',
        },{            
            title: contact,
            subtitle: 'Contact',
            icon: 'phone',
        }
    ]
    
    return(
        <ScrollView style = {styles.container}>
            <List containerStyle = {styles.listContainer}>
                {
                    profileList.map((item,index) => (
                        <ListItem 
                            key = {index}
                            leftIcon = {{name: item.icon, size: 30}}
                            title = {item.title}
                            subtitle = {item.subtitle}
                            hideChevron
                            titleStyle = {styles.txtTitle}
                            subtitleStyle = {styles.txtSubtitle}
                            containerStyle = {styles.listContainer}
                        />
                    ))
                }
            </List>
        </ScrollView>
    );
}

export default HeaderContainer