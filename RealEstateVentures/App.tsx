import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/pages/Home';
import {ContactUs} from './src/pages/ContactUs';
import {Marketplace} from './src/pages/Marketplace';
import {SignIn} from './src/pages/SignIn';
import {SignUp} from './src/pages/SignUp'; // Make sure to import your SignUp screen
import {ListingDetail} from './src/pages/ListingDetail';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const MarketplaceStack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        // options={{title: 'Sign Up'}} // You can customize the title as needed
      />
    </AuthStack.Navigator>
  );
}

function MarketplaceStackNavigator() {
  return (
    <MarketplaceStack.Navigator>
      <MarketplaceStack.Screen
        name="Marketplace"
        component={Marketplace}
        options={{headerShown: false}}
      />
      <MarketplaceStack.Screen name="ListingDetail" component={ListingDetail} />
    </MarketplaceStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarIcon: () => null,
            tabBarLabelStyle: {
              flex: 1,
              fontSize: 16,
              textAlign: 'center',
              position: 'absolute',
              bottom: 15,
            },
          }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen
            name="Marketplace"
            component={MarketplaceStackNavigator}
          />
          <Tab.Screen name="ContactUs" component={ContactUs} />
          <Tab.Screen name="Login" component={AuthStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
