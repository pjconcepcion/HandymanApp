import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import {List,ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ListContainerStyles'
import {onLogout} from '../../../../../Auth/auth';

const ListContainer = ({setModal,profileType,deleteAllState}) => {

    function openModal(type){
        setModal(type,true);
    }

    function logout(){
        deleteAllState();
        onLogout().then(() => Actions.reset('root'))
    }

    return(            
        <ScrollView containerStyle = {styles.container}>
            <View style = {styles.titleMenu}>
                <MaterialIcons name = {'person'} size = {30} color = {'white'}/>
                <Text style = {styles.txtTitle}> Profile </Text>
            </View>
                <ListItem 
                    leftIcon = {{name: 'account-circle', size: 30,color: 'white'}}
                    title = {'Name'}
                    titleStyle = {styles.txtMenu}
                    onPress = {openModal.bind(this,'Name')}
                />
                <ListItem 
                    leftIcon = {{name: 'home', size: 30,color: 'white'}}
                    title = {'Address'}
                    titleStyle = {styles.txtMenu}
                    onPress = {openModal.bind(this,'Address')}
                />
                <ListItem 
                    leftIcon = {{name: 'cake', size: 30,color: 'white'}}
                    title = {'Birthdate'}
                    titleStyle = {styles.txtMenu}
                    onPress = {openModal.bind(this,'Birthdate')}
                />
                <ListItem 
                    leftIcon = {{name: 'accessibility', size: 30,color: 'white'}}
                    title = {'Gender'}
                    titleStyle = {styles.txtMenu}
                    onPress = {openModal.bind(this,'Gender')}
                />
            <View style = {styles.titleMenu}>
                <MaterialIcons name = {'mail-outline'} size = {30} color = {'white'}/>
                <Text style = {styles.txtTitle}> Contact </Text>
            </View>
                <ListItem 
                    leftIcon = {{name: 'email', size: 30,color: 'white'}}
                    title = {'Email Address'}
                    titleStyle = {styles.txtMenu}
                    onPress = {openModal.bind(this,'Email Address')}
                />
                <ListItem 
                    leftIcon = {{name: 'phone', size: 30,color: 'white'}}
                    title = {'Contact'}
                    titleStyle = {styles.txtMenu}
                    onPress = {openModal.bind(this,'Contact')}
                />
                <ListItem 
                    leftIcon = {{name: 'contact-phone', size: 30,color: 'white'}}
                    title = {'Contact Person'}
                    titleStyle = {styles.txtMenu}
                    onPress = {openModal.bind(this,'Contact Person')}
                />
            <View style = {styles.titleMenu}>
                <MaterialIcons name = {'security'} size = {30} color = {'white'}/>
                <Text style = {styles.txtTitle}> Account </Text>
            </View>          
                <ListItem 
                    leftIcon = {{name: 'lock', size: 30,color: 'white'}}
                    title = {'Password'}
                    titleStyle = {styles.txtMenu}
                    onPress = {openModal.bind(this,'Password')}
                />
                <ListItem 
                    leftIcon = {{name: 'help-outline', size: 30,color: 'white'}}
                    title = {'Security Question'}
                    titleStyle = {styles.txtMenu}
                    onPress = {openModal.bind(this,'Security Question')}
                />
                <ListItem 
                    leftIcon = {{name: 'exit-to-app', size: 30,color: 'white'}}
                    title = {'Logout'}
                    titleStyle = {styles.txtMenu}
                    onPress = {logout.bind(this)}
                    hideChevron
                />
        </ScrollView>  
    );
}

export default ListContainer;   