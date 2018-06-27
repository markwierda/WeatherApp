import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Home from './Pages/Home';
import Settings from './Pages/Settings';

export default class App extends Component {
  render() {
    return (
        <Router>
            <Scene key="root" tabs={true} tabBarStyle={{backgroundColor:"white"}}>
                <Scene key="Home" component={Home} title="Home" onEnter={ () => { Actions.refs.Home.Reload() }} />
                <Scene key="Settings" component={Settings} title="Settings" />
            </Scene>
        </Router>
    );
  }
}
