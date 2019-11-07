import React, { Component } from 'react';
import {
    Alert,
    SafeAreaView,
    StatusBar,
    View
} from 'react-native';
import PilgrimSdk from 'pilgrim-sdk-react-native';
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
export default GetCurrentLocationScreen;