/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AsyncStorage,
  NativeEventEmitter
} from 'react-native';

import {
  Body,
  Button,
  Content,
  Container,
  Footer as FooterNativeBase,
  FooterTab,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Root,
  Text,
  Title
 } from 'native-base';

 import {
  StackNavigator
 } from 'react-navigation';

import PilgrimSdk from 'pilgrim-sdk-react-native';
const PilgrimEventEmitter = new NativeEventEmitter(PilgrimSdk);

class Visits extends Component {
  render() {
    return (
      <Container>
        {/* <Header>
          <Left />
          <Body>
            <Title>Visits</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {
              PilgrimSdk.testArrivalVisit();
            }}>
              <Icon name='add' />
            </Button>
          </Right>
        </Header> */}
        <Content>
          <List
            dataArray={this.props.visits}
            renderRow={(visit) => 
              <ListItem noIndent onPress={() => this.props.onVisitPress(visit)}>
                <Left>
                  <Text>{visit.venue.name}</Text>
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
}

class Logs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      debugLogs: []
    };
  }

  componentWillMount() {
    this.loadDebugLogs();
  }

  render() {
    return (
      <Container>
        {/* <Header>
          <Left />
          <Body>
            <Title>Logs</Title>
          </Body>
          <Right />
        </Header> */}
        <Content>
          <List
          dataArray={this.state.debugLogs}
          renderRow={(debugLog) => 
            <ListItem>
              <Content>
                <Text>{debugLog.eventDescription}</Text>
                <Text>{new Date(debugLog.timestamp).toLocaleString()}</Text>
              </Content>
            </ListItem>
          }/>
        </Content>
      </Container>
    )
  }

  async loadDebugLogs() {
    const debugLogs = await PilgrimSdk.getDebugLogs();
    this.setState({debugLogs: debugLogs});
  }
}

class Settings extends Component {
  render() {
    return (
      <Container>
        {/* <Header>
          <Left />
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header> */}
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

class VisitDetailsScreen extends Component {
  render() {
    var visit = this.props.navigation.getParam('visit', null);
    var location = visit.venue.location;
    console.log(visit);
    return (
      <Container>
        {/* <Header>
          <Left />
          <Body>
            <Title>Visit Details</Title>
          </Body>
          <Right />
        </Header> */}
        <Content>
          <List>
            <ListItem>
              <Text>{visit.venue.name}</Text>
            </ListItem>
            <ListItem>
              <Text>{location.address} {location.city}, {location.state} {location.postalCode}</Text>
            </ListItem>
          </List>
        </Content>
      </Container> 
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <FooterNativeBase>
        <FooterTab>
          <Button active={this.props.selectedTab==0} onPress={() => this.props.onTabClick(0)}>
            <Text>Visits</Text>
          </Button>
          {/* <Button active={this.props.selectedTab==1} onPress={() => this.props.onTabClick(1)}>
            <Text>Logs</Text>
          </Button> */}
          {/* <Button active={this.props.selectedTab==2} onPress={() => this.props.onTabClick(2)}>
            <Text>Settings</Text>
          </Button> */}
        </FooterTab>
      </FooterNativeBase>
    )
  }
}

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0,
      visits: []
    };

    PilgrimSdk.setDebugLoggingEnabled(true);
  }

  componentWillMount() {
    PilgrimEventEmitter.addListener(PilgrimSdk.AuthorizedEvent, () => {
      PilgrimSdk.start();
    });
    PilgrimSdk.requestAuthorization();

    PilgrimEventEmitter.addListener(PilgrimSdk.DidVisitEvent, (visit) => {
      this.saveVisits(visit);
    });

    this.loadVisits()
  }

  render() {
    let component = null;
    if (this.state.selectedIndex == 0) {
      component = <Visits visits={this.state.visits} onVisitPress={(visit) => {
        this.props.navigation.navigate('VisitDetails', {'visit':visit})
      }} />
    } else if (this.state.selectedIndex == 1) {
      component = <Logs />
    } else {
      component = <Settings />
    }
    return (
      <Container style={{flex: 1}}>
        {component}
        <Footer selectedTab={this.state.selectedIndex} onTabClick={(index) => {
          if (index == 0) {
            this.loadVisits()
          }
          this.setState({selectedIndex: index})
        }} />
      </Container>
    );
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

const AppNavigator = StackNavigator(
  {
    Home: HomeScreen,
    VisitDetails: VisitDetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
