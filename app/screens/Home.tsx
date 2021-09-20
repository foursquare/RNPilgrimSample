import React, {Component} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from 'react-native';
import RNLocation from 'react-native-location';
import PilgrimSdk from '@foursquare/pilgrim-sdk-react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

interface HomeState {
  installId: string;
}

type HomePropsProps = StackScreenProps<RootStackParamList, 'Home'>;

export default class HomeScreen extends Component<HomePropsProps, HomeState> {
  state: HomeState = {
    installId: '-',
  };

  componentDidMount() {
    this.requestLocationPermission();
    this.setInstallId();
  }

  private async requestLocationPermission() {
    const granted = await RNLocation.requestPermission({
      ios: 'always',
      android: {
        detail: 'fine',
      },
    });
    if (!granted) {
      Alert.alert(
        'Pilgrim SDK',
        'Location permission is required please enable in Settings',
      );
    }
  }

  private async setInstallId() {
    const installId = await PilgrimSdk.getInstallId();
    this.setState({installId: installId});
  }

  private async fireTestVisit() {
    try {
      const location = await RNLocation.getLatestLocation();
      if (!location) {
        return;
      }
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
  }

  private async startPilgrim() {
    PilgrimSdk.start();
    Alert.alert('Pilrim SDK', 'Pilgrim started');
  }

  private async stopPilgrim() {
    PilgrimSdk.stop();
    Alert.alert('Pilrim SDK', 'Pilgrim stopped');
  }

  private async showDebugScreen() {
    PilgrimSdk.showDebugScreen();
  }

  render(): JSX.Element {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={styles.container}>
          <Button
            title="Get Current Location"
            onPress={() => {
              this.props.navigation.navigate('GetCurrentLocation');
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
