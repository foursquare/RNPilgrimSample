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
  Header as HeaderNativeBase,
  List,
  ListItem,
  Text,
  Title
 } from 'native-base';

import PilgrimSdk from 'pilgrim-sdk-react-native';
const PilgrimEventEmitter = new NativeEventEmitter(PilgrimSdk);

class Header extends Component {
  render() {
    return (
      <HeaderNativeBase>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
      </HeaderNativeBase>
    )
  }
}

class Visits extends Component {
  render() {
    return (
      <List
        dataArray={this.props.visits}
        renderRow={(visit) => 
          <ListItem>
            <Content>
              <Text>{visit.info}</Text>
            </Content>
          </ListItem>
        }/>
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
      <List>
        <ListItem>
          <Text></Text>
        </ListItem>
      </List>
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
          <Button active={this.props.selectedTab==1} onPress={() => this.props.onTabClick(1)}>
            <Text>Logs</Text>
          </Button>
          <Button active={this.props.selectedTab==2} onPress={() => this.props.onTabClick(2)}>
            <Text>Settings</Text>
          </Button>
        </FooterTab>
      </FooterNativeBase>
    )
  }
}

export default class App extends Component {
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
    let title = null;
    let component = null;
    if (this.state.selectedIndex == 0) {
      title = "Visits";
      component = <Visits visits={this.state.visits} />
    } else if (this.state.selectedIndex == 1) {
      title = "Logs";
      component = <Logs />
    } else {
      title = "Settings";
      component = <Settings />
    }
    return (
      <Container style={{flex: 1}}>
        <Header title={title} />
        <Content>{component}</Content>
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
