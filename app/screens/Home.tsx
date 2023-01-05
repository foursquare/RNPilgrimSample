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
  isEnabled: boolean;
}

type HomePropsProps = StackScreenProps<RootStackParamList, 'Home'>;

export default class HomeScreen extends Component<HomePropsProps, HomeState> {
  state: HomeState = {
    installId: '-',
    isEnabled: false,
  };

  componentDidMount() {
    this.requestLocationPermission();
    this.setInstallId();
    this.setIsEnabled();
  }

  private async requestLocationPermission() {
    function alertPermissionError() {
      Alert.alert(
        'Pilgrim SDK',
        'Location permission is required please enable in Settings',
      );
    }
    const granted = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    });
    if (granted) {
      const granted = await RNLocation.requestPermission({
        ios: 'always',
        android: {
          detail: 'fine',
        },
      });
      if (!granted) {
        alertPermissionError();
      }
    } else {
      alertPermissionError();
    }
  }

  private async setInstallId() {
    const installId = await PilgrimSdk.getInstallId();
    this.setState({installId: installId});
  }

  private async setIsEnabled() {
    const isEnabled = await PilgrimSdk.isEnabled();
    this.setState({isEnabled: isEnabled});
  }

  private getEnabledText() {
    if (this.state.isEnabled) {
      return 'Yes';
    } else {
      return 'No';
    }
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
    this.setIsEnabled();
  }

  private async stopPilgrim() {
    PilgrimSdk.stop();
    this.setIsEnabled();
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
          <Text style={styles.footer}>Install ID: {this.state.installId}</Text>
          <Text style={styles.footer}>Enabled: {this.getEnabledText()}</Text>
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
  footer: {
    textAlign: 'center',
    padding: 10,
    fontSize: 13,
    color: 'black',
  },
  separator: {
    height: 20,
  },
});
