import HomeScreen from './screens/Home';
import GetCurrentLocationScreen from './screens/GetCurrentLocation';

import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  GetCurrentLocation: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Pilgrim React Native Sample'}}
          />
          <RootStack.Screen
            name="GetCurrentLocation"
            component={GetCurrentLocationScreen}
            options={{title: 'Get Current Location'}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
