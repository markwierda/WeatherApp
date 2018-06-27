import React, { Component } from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import Style from '../Style';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttons: null,
            cities: null
        }
    }

    async componentWillMount() {
        await this.setState({
            buttons: [
                { label: 'Celsius', value: 'metric', selected: true },
                { label: 'Fahrenheit', value: 'imperial', selected: false }
            ],
            cities: [
                { label: 'My location', value: 'Location', selected: true },
                { label: 'Hoogeveen', value: 'Hoogeveen', selected: false },
                { label: 'Meppel', value: 'Meppel', selected: false },
                { label: 'Zwolle', value: 'Zwolle', selected: false },
                { label: 'San Francisco', value: 'San%20Francisco', selected: false },
                { label: 'Las Vegas', value: 'Las%20Vegas', selected: false }
            ]
        });

        this.SetActiveButton(this.state.buttons);
        this.SetActiveCity(this.state.cities);
    }

    async ChangeTemperature(buttons) {
        for (let i=0; i<buttons.length; i++) {
            if (buttons[i].selected) {
                await AsyncStorage.removeItem('@WeatherApp:temperature');
                await AsyncStorage.setItem('@WeatherApp:temperature', buttons[i].value);
            }
        }
    }

    async ChangeCity(cities) {
        for (let i=0; i<cities.length; i++) {
            if (cities[i].selected) {
                await AsyncStorage.removeItem('@WeatherApp:city');
                await AsyncStorage.setItem('@WeatherApp:city', cities[i].value);
            }
        }
    }

    async SetActiveButton(buttons) {
        const temperature = await AsyncStorage.getItem('@WeatherApp:temperature');

        for (let i=0; i<buttons.length; i++) {
            if (buttons[i].value === temperature) {
                buttons[i].selected = true;
            } else {
                buttons[i].selected = false;
            }
        }

        this.setState({
            buttons: buttons
        });
    }

    async SetActiveCity(cities) {
        const city = await AsyncStorage.getItem('@WeatherApp:city');

        console.log(city);

        for (let i=0; i<cities.length; i++) {
            if (cities[i].value === city) {
                cities[i].selected = true;
            } else {
                cities[i].selected = false;
            }
        }

        this.setState({
            cities: cities
        });
    }

    render() {
        return (
            <View>
                <Text style={Style.Text}>Temperature:</Text>
                <RadioGroup radioButtons={this.state.buttons} onPress={this.ChangeTemperature} flexDirection='column' />
                <Text style={Style.Text}>City:</Text>
                <RadioGroup radioButtons={this.state.cities} onPress={this.ChangeCity} flexDirection='column' />
            </View>
        )
    }
}
