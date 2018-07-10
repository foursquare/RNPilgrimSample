/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Alert,
  AsyncStorage,
  Button,
  NativeEventEmitter
} from 'react-native';

import {
  ActionSheet,
  Content,
  Container,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Root,
  Text
 } from 'native-base';

 import {
  createStackNavigator,
  createBottomTabNavigator
 } from 'react-navigation';

import PilgrimSdk from 'pilgrim-sdk-react-native';
const PilgrimEventEmitter = new NativeEventEmitter(PilgrimSdk);

class VisitsScreen extends Component {
  static navigationOptions = {
    title: 'Visits',
    headerRight: (
      <Button
        onPress={() => 
          ActionSheet.show(
            {
              options: ["Arrival", "Departure", "Cancel"],
              cancelButtonIndex: 2,
              title: "Select Visit Type"
            },
            buttonIndex => {
              if (buttonIndex == 0) {
                PilgrimSdk.testVenueVisit(false);
              } else if (buttonIndex == 1) {
                PilgrimSdk.testVenueVisit(true);
              }
            }
          )}
        title="Test Visit"
      />
    ),
  };

  constructor(props) {
    super(props)

    this.state = {
      visits: []
    };
  }

  componentWillMount() {
    PilgrimEventEmitter.addListener(PilgrimSdk.AuthorizedEvent, (authorized) => {
      if (authorized) {
        PilgrimSdk.start();
      } else {
        Alert.alert(
          'Location Permission Required',
          'Sample app requires location'
        );
      }
    });
    PilgrimSdk.requestAuthorization();

    PilgrimEventEmitter.addListener(PilgrimSdk.DidVisitEvent, (visit) => {
      this.saveVisits(visit);
    });

    this.loadVisits()
  }
  
  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={this.state.visits}
            renderRow={(visit) => 
              <ListItem noIndent onPress={() => this.props.navigation.navigate('VisitDetails', {'visit':visit})}>
                <Left>
                  <Text>{visit.isArrival ? "Arrival @ " : "Departure @ "}{visit.venue.name}</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
          }/>
        </Content>
      </Container>
    )
  }

  async loadVisits() {
    let visits = await AsyncStorage.getItem('visits');
    if (visits === null) {
      visits = [];
    } else {
      visits = JSON.parse(visits);
    }
    this.setState({visits: visits});
  }

  async saveVisits(visit) {
    let visits = await AsyncStorage.getItem('visits');
    if (visits === null) {
      visits = [];
    } else {
      visits = JSON.parse(visits);
    }
    visits.push(visit);
    await AsyncStorage.setItem('visits', JSON.stringify(visits));
    this.setState({visits: visits});
  }
}

class VisitDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('visit', null).venue.name,
    };
  };

  render() {
    var visit = this.props.navigation.getParam('visit', null);
    var location = visit.venue.location;
    var addressComponent = <Text>No Address Info</Text>
    if (location.address != null) {
      addressComponent = <Text>{location.address} {location.city}, {location.state} {location.postalCode}</Text>
    }
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              {addressComponent}
            </ListItem>
            <ListItem>
              <Text>Lat: {location.lat} Lng: {location.lng}</Text>
            </ListItem>
          </List>
        </Content>
      </Container> 
    )
  }
}

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Text></Text>
            </ListItem>
          </List>
        </Content>
      </Container> 
    )
  }
}

const VisitsNavigator = createStackNavigator(
  {
    Visits: VisitsScreen,
    VisitDetails: VisitDetailsScreen,
  },
  {
    initialRouteName: 'Visits',
  }
);

const SettingsNavigator = createStackNavigator(
  {
    Settings: SettingsScreen
  }
);

const TabNavigator = createBottomTabNavigator({
  Visits: VisitsNavigator,
  Settings: SettingsNavigator
});

export default () =>
  <Root>
    <TabNavigator />
  </Root>;
