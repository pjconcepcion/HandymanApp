import React from 'react';
import {Actions, Scene, Tabs, Router,Stack} from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from './Login/Login';
import SearchContainer from './Search/container/SearchContainer';
import BookingForm from './BookingForm/container/BookingFormContainer'
import FindContainer from './Find/container/FindContainer';
import ProfileContainer from './Profile/container/ProfileContainer';
import SettingsContainer from './Settings/container/SettingsContainer';
import NotificationContainer from './Notification/container/NotificationContainer';
import TransactionContainer from './Transaction/container/TransactionContainer';
import Searching from './Searching/Searching';
import Form from './SignUp/Form';
import ForgotAccount from './ForgotAccount/ForgotAccount';
import BookingRequest from './BookingRequest/BookingRequest';
import TrackHandyman from './TrackHandyman/container/TrackHandyman';
import ServiceStart from './ServiceStart/ServiceStart';
import FeedbackContainer from './Feedback/container/FeedbackContainer';

const searchIcon = ({title,focused}) => {
    let color = focused? '#0288D1' : 'black';
    switch(title){
        case 'Search':{
            return (<MaterialIcons name = {'search'} size = {30} color = {color} />);
        }   
        case 'BookingForm':{
            return (<MaterialIcons name = {'search'} size = {30} color = {color} />);
        }     
        case 'Find':{
            return (<MaterialIcons name = {'search'} size = {30} color = {color} />);
        }
        case 'Profile':{
            return (<MaterialIcons name = {'person'} size = {30} color = {color} />);
        }
        case 'Settings':{
            return (<MaterialIcons name = {'settings'} size = {30} color = {color} />);
        }
        case 'List':{
            return (<MaterialIcons name = {'menu'} size = {30} color = {color} />);
        }
    }
} 

const styles = {
    tabBarStyle:{
        paddingTop: 25,
        backgroundColor: 'white',
    },
    txtLabel:{
        fontSize: 18
    },
    indicatorStyle:{
        backgroundColor: '#0288D1'
    }
}
const scenes = Actions.create(
    <Router>
        <Stack key = 'root' hideNavBar> 
            <Scene key = 'login' component = {Login} initial/>            
            <Scene key = 'customerUI' tabs tabBarPosition = 'bottom' showLabel = {false}>            
                <Stack key = 'searchroot' hideNavBar > 
                    <Scene                     
                        hideNavBar 
                        key = 'search' 
                        component = {SearchContainer} 
                        title = 'Search' 
                        icon = {searchIcon}
                    />
                    <Scene 
                        hideNavBar 
                        key = 'bookingform' 
                        component = {BookingForm} 
                        title = 'BookingForm'    
                        icon = {searchIcon}             
                    />
                </Stack>
                <Scene initial           
                    key = 'profile' 
                    hideNavBar
                    component = {ProfileContainer}  
                    title = 'Profile'                   
                    icon = {searchIcon}
                />
                <Scene 
                    key = 'list' 
                    tabs 
                    tabBarPosition = 'top'
                    showLabel = {true}  
                    title = 'List'                          
                    icon = {searchIcon}
                    tabStyle = {styles.tabBarStyle} 
                    labelStyle = {styles.txtLabel}
                    activeTintColor = {'#0288D1'}
                    inactiveTintColor = {'#7f8c8d'}
                    indicatorStyle = {styles.indicatorStyle}
                >
                        <Scene                                         
                            key = 'notification' 
                            hideNavBar
                            component = {NotificationContainer}  
                            title = 'Notification'  
                        />
                        <Scene                     
                            key = 'transaction' 
                            hideNavBar
                            component = {TransactionContainer}  
                            title = 'Transaction'    
                        />
                </Scene>
                <Scene                     
                    key = 'settings' 
                    hideNavBar
                    component = {SettingsContainer}  
                    title = 'Settings'                   
                    icon = {searchIcon}
                />
            </Scene>
            <Scene key = 'handymanUI' tabs tabBarPosition = 'bottom' showLabel = {false}>
                <Scene                      
                    hideNavBar
                    key = 'find' 
                    component = {FindContainer} 
                    title = 'Find' 
                    icon = {searchIcon}
                />
                <Scene initial         
                    key = 'profile' 
                    hideNavBar
                    component = {ProfileContainer}  
                    title = 'Profile'                   
                    icon = {searchIcon}
                />
                <Scene 
                    key = 'list' 
                    tabs 
                    tabBarPosition = 'top'
                    showLabel = {true}  
                    title = 'List'                          
                    icon = {searchIcon}
                    tabStyle = {styles.tabBarStyle} 
                    labelStyle = {styles.txtLabel}
                    activeTintColor = {'#0288D1'}
                    inactiveTintColor = {'#7f8c8d'}
                    indicatorStyle = {styles.indicatorStyle}
                >
                        <Scene                                         
                            key = 'notification' 
                            hideNavBar
                            component = {NotificationContainer}  
                            title = 'Notification'  
                        />
                        <Scene                     
                            key = 'transaction' 
                            hideNavBar
                            component = {TransactionContainer}  
                            title = 'Transaction'    
                        />
                </Scene>
                <Scene                     
                    key = 'settings' 
                    hideNavBar
                    component = {SettingsContainer}  
                    title = 'Settings'                   
                    icon = {searchIcon}
                />
            </Scene>  
            <Scene     
                key = 'searching' 
                hideNavBar
                component = {Searching}  
                title = 'Searching'    
            />   
            <Scene                       
                key = 'signupform' 
                hideNavBar
                component = {Form}  
                title = 'signupform'    
            />    
            <Scene                       
                key = 'forgotaccount' 
                hideNavBar
                component = {ForgotAccount}  
                title = 'forgotaccount'    
            />    
            <Scene                       
                key = 'bookingrequest' 
                hideNavBar
                component = {BookingRequest}  
                title = 'bookingrequest'    
            />   
            <Scene                        
                key = 'trackhandyman' 
                hideNavBar
                component = {TrackHandyman}  
                title = 'trackhandyman'    
            />   
            <Scene                          
                key = 'servicestart' 
                hideNavBar
                component = {ServiceStart}  
                title = 'servicestart'    
            />    
            <Scene                         
                key = 'feedback' 
                hideNavBar
                component = {FeedbackContainer}  
                title = 'feedback'    
            />                   
        </Stack>
    </Router>
);

export default scenes;