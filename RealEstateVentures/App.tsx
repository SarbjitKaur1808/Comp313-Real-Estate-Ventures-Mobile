import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from './src/pages/Home';
import {ContactUs} from './src/pages/ContactUs';
import {Marketplace} from './src/pages/Marketplace';
import {SignIn} from './src/pages/SignIn';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarIcon: () => null,
          tabBarLabelStyle: {
            flex: 1,
            fontSize: 16,
            textAlign: 'center',
            position:'absolute',
            bottom:15,
          },
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Marketplace" component={Marketplace} />
        <Tab.Screen name="ContactUs" component={ContactUs} />
        <Tab.Screen name="SignIn" component={SignIn} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
