import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Router} from "react-native-router-flux";
import {Provider} from 'react-redux';
import scenes from '../routes/scenes';
import AppNavigation from './AppNavigation';

export default class AppContainer extends Component{

    static propTypes = {
		store: PropTypes.object.isRequired
    }
    
    render(){
        return(
            <Provider store = {this.props.store}>
                <AppNavigation>
                    <Router scenes = {scenes} />
                </AppNavigation>
            </Provider>
        );
    }
}