
import { StatusBar } from 'expo-status-bar';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

// Stylings
import { StyleSheet, View } from 'react-native';
import CreateNote from './screens/CreateNote';
import Notes from './screens/Notes';

const { Navigator, Screen } = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title='Notes'/>
    <BottomNavigationTab title='Create Note'/>
    <BottomNavigationTab title='Note'/>
  </BottomNavigation>
)

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Notes' component={Notes} />
    <Screen name='Create Note' component={CreateNote} />
    <Screen name='Note' component={CreateNote} />
  </Navigator>
)

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
