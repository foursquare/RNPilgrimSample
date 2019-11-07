import React, { Component } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import PilgrimSdk from 'pilgrim-sdk-react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

async function getCurrentLocation() {
  try {
    const venue = await PilgrimSdk.getCurrentLocation();
    console.log(venue);
  } catch (e) {
    console.log(e);
  }
}

async function fireTestVisit() {
  Geolocation.getCurrentPosition(position => {
    PilgrimSdk.fireTestVisit(position.coords.latitude, position.coords.longitude);
    console.log('Sent test visit');
  }, error => {
    console.log(e);
  });
}

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pilgrim React Native Sample'
  };

  state = {
    installId: "-"
  };

  componentDidMount() {
    Geolocation.requestAuthorization();

    PilgrimSdk.getInstallId().then(installId => {
      this.setState({ installId: installId });
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <Text style={styles.item}>{this.state.installId}</Text>
            <Button style={styles.item} title="Get Current Location" onPress={() => { getCurrentLocation(); }} />
            <Button style={styles.item} title="Fire Test Visit" onPress={() => { fireTestVisit(); }} />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen }
});

const App = createAppContainer(MainNavigator);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  item: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
