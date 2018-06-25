import React, { Component } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import Home from './Pages/Home';

const Settings = () => (
  <Button
    title="Home"
    onPress={() => Actions.push('Home')}
    style={styles.container}
  />
);

export default class App extends Component {
  render() {
    return (
      <Router>
        <Stack>
          <Scene key="Home" component={Home} />
          <Scene key="Settings" component={Settings} />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    backgroundColor: '#ecf0f1',
  },
});
