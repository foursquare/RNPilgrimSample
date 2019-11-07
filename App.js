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
import MapView from 'react-native-maps';

class GetCurrentLocationScreen extends Component {
  static navigationOptions = {
    title: 'Get Current Location'
  };

  state = {
    latitude: 0.0,
    longitude: 0.0
  };

  getCurrentLocation = async function () {
    try {
      const currentLocation = await PilgrimSdk.getCurrentLocation();
      this.setState({
        latitude: currentLocation.currentPlace.location.latitude,
        longitude: currentLocation.currentPlace.location.longitude
      });
    } catch (e) {
      Alert.alert("Pilgrim SDK", `${e}`);
    }
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <MapView style={{ flex: 1 }} region={{ latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }} />
          <View style={{ flex: 1 }} >

          </View>
        </SafeAreaView>
      </>
    );
  }
}

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pilgrim React Native Sample'
  };

  state = {
    installId: "-",
  };

  componentDidMount() {
    Geolocation.requestAuthorization();
    PilgrimSdk.getInstallId().then(installId => {
      this.setState({ installId: installId });
    });
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
    const { navigate } = this.props.navigation;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <Button title="Get Current Location" onPress={() => { navigate('GetCurrentLocation') }} />
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
  Home: { screen: HomeScreen },
  GetCurrentLocation: { screen: GetCurrentLocationScreen }
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
