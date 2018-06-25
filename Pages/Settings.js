import React, { Component } from 'react';
import Button from 'react-native';
import Actions from 'react-native-router-flux';
import Style from '../Style';

export default class Settings extends Component {
    render() {
        return (
            <Button title="Home" onPress={() => { Actions.push('Home') }} style={Style.container} />
        )
    }
}
