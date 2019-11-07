import React, { Component } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import PilgrimSdk from 'pilgrim-sdk-react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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

  getCurrentLocation = async function () {
    try {
      const currentLocation = await PilgrimSdk.getCurrentLocation();
      Alert.alert("Pilgrim SDK", `${currentLocation.currentPlace.venue.name}`);
    } catch (e) {
      Alert.alert("Pilgrim SDK", `${e}`);
    }
  }

  fireTestVisit = function () {
    Geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      PilgrimSdk.fireTestVisit(latitude, longitude);
      Alert.alert("Pilgrim SDK", `Sent test visit with location: (${latitude},${longitude})`);
    }, error => {
      Alert.alert("Pilgrim SDK", `${error.message}`);
    });
  }

  startPilgrim = async function () {
    const canEnable = await PilgrimSdk.canEnable();
    const isSupportedDevice = await PilgrimSdk.isSupportedDevice();
    if (canEnable && isSupportedDevice) {
      PilgrimSdk.start();
      Alert.alert("Pilrim SDK", "Pilgrim started");
    } else {
      Alert.alert("Pilrim SDK", "Error starting");
    }
  }

  stopPilgrim = function () {
    PilgrimSdk.stop();
    Alert.alert("Pilrim SDK", "Pilgrim stopped");
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <Button title="Get Current Location" onPress={() => { this.getCurrentLocation(); }} />
            <View style={styles.separator} />
            <Button title="Fire Test Visit" onPress={() => { this.fireTestVisit(); }} />
            <View style={styles.separator} />
            <Button title="Start" onPress={() => { this.startPilgrim(); }} />
            <View style={styles.separator} />
            <Button title="Stop" onPress={() => { this.stopPilgrim(); }} />
            <View style={styles.separator} />
            <Text style={styles.label}>Install ID: {this.state.installId}</Text>
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
  label: {
    textAlign: "center",
    padding: 20,
    fontSize: 13
  },
  separator: {
    height: 20
  }
});
