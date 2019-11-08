import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import PilgrimSdk from 'pilgrim-sdk-react-native';
import MapView from 'react-native-maps';

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default class GetCurrentLocationScreen extends Component {
    static navigationOptions = {
        title: 'Get Current Location'
    };

    state = {
        latitude: 0.0,
        longitude: 0.0,
        currentLocation: []
    }

    getCurrentLocation = async function () {
        try {
            const currentLocation = await PilgrimSdk.getCurrentLocation();
            this.setState({
                latitude: currentLocation.currentPlace.location.latitude,
                longitude: currentLocation.currentPlace.location.longitude,
                currentLocation: [{
                    title: currentLocation.currentPlace.venue.name || "Unknown Venue",
                    id: "1"
                }]
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
                <SafeAreaView style={styles.container}>
                    <MapView style={{ flex: 1 }} region={{ latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }} />
                    <FlatList style={{ flex: 1 }}
                        data={this.state.currentLocation}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 25,
    },
    subtitle: {
        fontSize: 18
    }
});