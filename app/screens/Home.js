import React, {Component} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from 'react-native';
import RNLocation from 'react-native-location';
import PilgrimSdk from '@foursquare/pilgrim-sdk-react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pilgrim React Native Sample',
  };

  state = {
    installId: '-',
  };

  componentDidMount() {
    RNLocation.requestPermission({
      ios: 'always',
      android: {
        detail: 'fine',
      },
    }).then(granted => {
      if (!granted) {
        Alert.alert(
          'Pilgrim SDK',
          'Location permission is required please enable in Settings',
        );
      }
    });
    PilgrimSdk.getInstallId().then(installId => {
      this.setState({installId: installId});
    });
  }

  fireTestVisit = async function() {
    try {
      const location = await RNLocation.getLatestLocation();
      const latitude = location.latitude;
      const longitude = location.longitude;
      PilgrimSdk.fireTestVisit(latitude, longitude);
      Alert.alert(
        'Pilgrim SDK',
        `Sent test visit with location: (${latitude},${longitude})`,
      );
    } catch (e) {
      Alert.alert('Pilgrim SDK', `${e.message}`);
    }
  };

  startPilgrim = async function() {
    const canEnable = await PilgrimSdk.canEnable();
    const isSupportedDevice = await PilgrimSdk.isSupportedDevice();
    if (canEnable && isSupportedDevice) {
      PilgrimSdk.start();
      Alert.alert('Pilrim SDK', 'Pilgrim started');
    } else {
      Alert.alert('Pilrim SDK', 'Error starting');
    }
  };

  stopPilgrim = function() {
    PilgrimSdk.stop();
    Alert.alert('Pilrim SDK', 'Pilgrim stopped');
  };

  showDebugScreen = function() {
    PilgrimSdk.showDebugScreen();
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={styles.container}>
          <Button
            title="Get Current Location"
            onPress={() => {
              navigate('GetCurrentLocation');
            }}
          />
          <View style={styles.separator} />
          <Button
            title="Fire Test Visit"
            onPress={() => {
              this.fireTestVisit();
            }}
          />
          <View style={styles.separator} />
          <Button
            title="Start"
            onPress={() => {
              this.startPilgrim();
            }}
          />
          <View style={styles.separator} />
          <Button
            title="Stop"
            onPress={() => {
              this.stopPilgrim();
            }}
          />
          <View style={styles.separator} />
          <Button
            title="Show Debug Screen"
            onPress={() => {
              this.showDebugScreen();
            }}
          />
          <View style={styles.separator} />
          <Text style={styles.installId}>
            Install ID: {this.state.installId}
          </Text>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  installId: {
    textAlign: 'center',
    padding: 20,
    fontSize: 13,
  },
  separator: {
    height: 20,
  },
});
