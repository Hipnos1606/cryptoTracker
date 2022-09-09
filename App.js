/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from 'cryptoTracker/src/components/coins/CoinsStack';
import FavoritesStack from './src/components/favorites/FavoritesStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from 'cryptoTracker/src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Tabs.Navigator 
          screenOptions={{
            tabBarInactiveTintColor: "#fefefe",
            tabBarStyle: {
              backgroundColor: Colors.nightBlue,
              borderWidth: 0,
            },
            headerShown: false,
          }}>
          <Tabs.Screen 
            name="coins"
            component={CoinsStack}
            options={{
              tabBarIcon: ({size, color}) => (
                <Image 
                  style={{ tintColor: color, width: size, height: size}}
                  source={require('cryptoTracker/src/assets/bank.png')} />
              )
            }}
          />
		  <Tabs.Screen 
            name="favorites"
            component={FavoritesStack}
            options={{
              tabBarIcon: ({size, color}) => (
                <Image 
                  style={{ tintColor: color, width: size, height: size}}
                  source={require('cryptoTracker/src/assets/star.png')} />
              )
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    );
};

export default App;
