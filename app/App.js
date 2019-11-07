import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/Home'
import GetCurrentLocationScreen from './screens/GetCurrentLocation'

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  GetCurrentLocation: { screen: GetCurrentLocationScreen }
});

const App = createAppContainer(MainNavigator);
export default App;