import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import Style from '../Style';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: {
                temperature: null
            },
            weather: {
                city: null,
                temperature: null,
                icon: null,
                wind: {
                    direction: null,
                    speed: null
                }
            }
        }
    }

    async componentWillMount() {
        if (this.state.weather.city !== null) {
            await AsyncStorage.setItem('@WeatherApp:city', this.state.weather.city);
        } else {
            await AsyncStorage.setItem('@WeatherApp:city', 'Hoogeveen');
        }

        await this.GetTemperatureSetting();
        await this.GetTemperature();
    }

    async GetTemperatureSetting() {
        try {
            const temperature = await AsyncStorage.getItem('@WeatherApp:temperature');

            if (temperature !== null) {
                this.setState({
                    settings: {
                        temperature: temperature
                    }
                });
            }  else {
                await AsyncStorage.setItem('@WeatherApp:temperature', 'metric')
            }
        } catch (err) {
            console.log('err: ' + err);
        }
    }

    async GetTemperature() {
        if (this.state.settings.temperature !== null) {
            let url = null,
                lang = 'nl',
                city = await AsyncStorage.getItem('@WeatherApp:city');

            if (city !== 'Location') {
                if (city !== 'Hoogeveen' && city !== 'Meppel' && city !== "Zwolle") {
                    lang = 'usa'
                }

                switch (this.state.settings.temperature) {
                    case 'metric':
                        url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + lang + '&appid=5563d55f4a20e1410333dabc5ecd411f&units=metric'
                    break;
                    case 'imperial':
                        url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + lang + '&appid=5563d55f4a20e1410333dabc5ecd411f&units=imperial'
                        break;
                    default:
                        url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + lang + '&appid=5563d55f4a20e1410333dabc5ecd411f&units=metric'
                        break;
                }

                fetch(url)
                .then( res => res.json() )
                .then( json => {
                    this.setState({
                        weather: {
                            city: json.name,
                            temperature: json.main.temp,
                            icon: json.weather[0].icon,
                            wind: {
                                direction: this.ToTextualDescription(json.wind.deg),
                                speed: this.WindSpeed(json.wind.speed)
                            }
                        }
                    });
                })
            } else {
                navigator.geolocation.getCurrentPosition( position => {
                    switch (this.state.settings.temperature) {
                        case 'metric':
                            url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=5563d55f4a20e1410333dabc5ecd411f&units=metric'
                            break;
                        case 'imperial':
                            url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=5563d55f4a20e1410333dabc5ecd411f&units=imperial'
                            break;
                        default:
                            url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=5563d55f4a20e1410333dabc5ecd411f&units=metric'
                            break;
                    }
    
                    fetch(url)
                        .then( res => res.json() )
                        .then( json => {
                            this.setState({
                                weather: {
                                    city: json.name,
                                    temperature: json.main.temp,
                                    icon: json.weather[0].icon,
                                    wind: {
                                        direction: this.ToTextualDescription(json.wind.deg),
                                        speed: this.WindSpeed(json.wind.speed)
                                    }
                                }
                            });
                        })
                });
            }
        }
    }

    ToTextualDescription(degree){
        if (degree>337.5) return 'Northerly';
        if (degree>292.5) return 'North Westerly';
        if(degree>247.5) return 'Westerly';
        if(degree>202.5) return 'South Westerly';
        if(degree>157.5) return 'Southerly';
        if(degree>122.5) return 'South Easterly';
        if(degree>67.5) return 'Easterly';
        if(degree>22.5){return 'North Easterly';}
        return 'Northerly';
    }

    WindSpeed(speed) {
        switch (this.state.settings.temperature) {
            case 'metric':
                console.log( (speed * 3.6).toFixed(2) );
                return (speed * 3.6).toFixed(2) + ' km/h';
            case 'imperial':
                return speed + ' mp/h';
        }
    }

    async Reload() {
        await this.GetTemperatureSetting();
        await this.GetTemperature();
    }

    render() {
        return (
            <View style={Style.container}>
                <Image style={Style.Image} source={{uri: 'https://openweathermap.org/img/w/' + this.state.weather.icon + '.png' }} />
                <Text style={Style.Text}>{ this.state.weather.city }, { this.state.settings.temperature === 'metric' ? this.state.weather.temperature + ' \u0020\u2103' : this.state.weather.temperature + ' \u0020\u2109' }</Text>
                <Text style={Style.Text}>{ this.state.weather.wind.direction } Wind, { this.state.weather.wind.speed }</Text>
            </View>
        )
    }
}
