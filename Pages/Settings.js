import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import RadioGroup from 'react-native-radio-buttons-group';
import Style from '../Style';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttons: null
        }
    }

    componentWillMount() {
        this.setState({
            buttons: [{
                label: 'Pieter',
                value: 'Pieter',
                selected: true
            },
            {
                label: 'Brouwer',
                value: 'Brouwer',
                selected: false
            }]
        });
    }

    ChangeTemperature = buttons => {
        for (let i=0; i<buttons.length; i++) {
            if (buttons[i].selected) {
                console.log(buttons[i].value)
            }
        }
    }

    render() {
        return (
            <View>
                <RadioGroup radioButtons={this.state.buttons} onPress={this.ChangeTemperature} flexDirection='row' />
            </View>
        )
    }
}
