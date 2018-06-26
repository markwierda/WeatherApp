import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import Style from '../Style';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {
                city: null,
                temperature: null,
                description: null,
                icon: null,
                wind: {
                    direction: null,
                    speed: null
                }
            }
        }
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition( res => {
            fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + res.coords.latitude + '&lon=' + res.coords.longitude + '&appid=f0ebdcf69e4c89a02da69a9e847b198a&units=metric&lang=nl')
                .then( res => res.json() )
                .then( json => {
                    this.setState({
                        weather: {
                            city: json.name,
                            temperature: json.main.temp,
                            description: json.weather[0].description,
                            icon: json.weather[0].icon,
                            wind: {
                                direction: json.wind.deg,
                                speed: json.wind.speed
                            }
                        }
                    });
                })
                .catch((error) => {
                    console.error("err: " + error);
                });
        });

        this.GetTemperatureSetting();
    }

    async GetTemperatureSetting() {
        try {
            const value = await AsyncStorage.getItem('@WeatherApp:temperature');
            if (value !== null) {
              console.log(value);
            }
        } catch (error) {
            console.log(value);
        }
    }

    render() {
        return (
            <View>
                <Button title="Settings" onPress={ () => { Actions.push('Settings') }} style={Style.container} />
                <Text>{ this.state.weather.city }</Text>
                <Text>{ this.state.weather.temperature }</Text>
                <Text>{ this.state.weather.description }</Text>
                <Text>{ this.state.weather.icon }</Text>
                <Text>{ this.state.weather.wind.direction }</Text>
                <Text>{ this.state.weather.wind.speed }</Text>
            </View>
        )
    }
}
