import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import PilgrimSdk from '@foursquare/pilgrim-sdk-react-native';
import MapView, { Marker } from 'react-native-maps';

function Item({ geofenceEvent }) {
    const venue = geofenceEvent.venue;
    if (venue !== undefined) {
        const locationInformation = venue.locationInformation;
        const category = venue.categories[0];
        const icon = category.icon.prefix + "88" + category.icon.suffix;
        return (
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Image style={{ width: 25, height: 25, backgroundColor: "#CCC", marginRight: 5 }} source={{ uri: icon }} />
                    <Text style={styles.geofenceTitle}>{geofenceEvent.name}</Text>
                </View>
                <Text style={styles.geofenceData}>{locationInformation.address}</Text>
                <Text style={styles.geofenceData}>{locationInformation.city}, {locationInformation.state} {locationInformation.postalCode}</Text>
            </View>
        );
    } else {
        return (
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.geofenceTitle}>{geofenceEvent.name}</Text>
                </View>
            </View>
        );
    }
}

export default class GetCurrentLocationScreen extends Component {
    static navigationOptions = {
        title: 'Get Current Location'
    };

    state = {
        currentLocation: null
    };

    getCurrentLocation = async function () {
        try {
            const currentLocation = await PilgrimSdk.getCurrentLocation();
            this.setState({ currentLocation: currentLocation });
        } catch (e) {
            Alert.alert("Pilgrim SDK", `${e}`);
        }
    }

    confidenceString = function (confidence) {
        switch (confidence) {
            case 0: return "None";
            case 1: return "Low";
            case 2: return "Medium";
            case 3: return "High";
        }
    }

    locationTypeString = function (locationType) {
        switch (locationType) {
            case 0: return "Unknown";
            case 1: return "Home";
            case 2: return "Work";
            case 3: return "Venue";
        }
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    render() {
        const currentLocation = this.state.currentLocation;
        let currentLocationMapView;
        let currentLocationDataView;

        if (currentLocation != null) {
            const visit = currentLocation.currentPlace;
            const venue = visit.venue;
            const matchedGeofences = currentLocation.matchedGeofences;

            currentLocationMapView = (
                <MapView style={{ flex: 1 }} region={{ latitude: visit.location.latitude, longitude: visit.location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
                    <Marker coordinate={visit.location} />
                </MapView>
            );

            if (venue != undefined) {
                const locationInformation = venue.locationInformation;
                const category = venue.categories[0];
                const icon = category.icon.prefix + "88" + category.icon.suffix;
                currentLocationDataView = (
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingVertical: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={{ width: 50, height: 50, backgroundColor: "#CCC", marginRight: 10 }} source={{ uri: icon }} />
                                <Text style={styles.title}>{venue.name || "Unknown Venue"}</Text>
                            </View>
                            <Text style={styles.venueData}>{locationInformation.address}</Text>
                            <Text style={styles.venueData}>{locationInformation.city}, {locationInformation.state} {locationInformation.postalCode}</Text>
                            <Text style={styles.venueData}>Confidence: {this.confidenceString(visit.confidence)}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>Matched Geofences:</Text>
                            <FlatList
                                data={matchedGeofences}
                                renderItem={({ item }) => <Item geofenceEvent={item} />}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                );
            } else {
                currentLocationDataView = (
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingVertical: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.title}>{this.locationTypeString(visit.locationType)}</Text>
                            </View>
                            <Text style={styles.venueData}>Confidence: {this.confidenceString(visit.confidence)}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>Matched Geofences:</Text>
                            <FlatList
                                data={matchedGeofences}
                                renderItem={({ item }) => <Item geofenceEvent={item} />}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                );
            }

        } else {
            currentLocationMapView = (
                <MapView style={{ flex: 1 }} />
            );
            currentLocationDataView = (
                <View style={{ flex: 1 }} />
            );
        }

        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.mapSection}>{currentLocationMapView}</View>
                    <View style={styles.dataSection}>{currentLocationDataView}</View>
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapSection: {
        flex: 1
    },
    dataSection: {
        flex: 1,
        padding: 20
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 25,
        lineHeight: 50
    },
    venueData: {
        fontSize: 18,
    },
    geofenceTitle: {
        fontSize: 15,
        lineHeight: 25
    },
    geofenceData: {
        fontSize: 15,
    }
});