import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Artists from './Artists';
import Home from './Home';
import Messages from './Messages';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          let iconSize = size * 1.6

          if (route.name === 'GIGS') {
            iconSource = focused
              ? require('../assets/nav-icons/icons8-disco-ball-100.png')
              : require('../assets/nav-icons/icons8-disco-ball-100.png');
          } else if (route.name === 'ARTISTS') {
            iconSource = focused
              ? require('../assets/nav-icons/icons8-concert-100.png')
              : require('../assets/nav-icons/icons8-concert-100.png');
          } else if (route.name === 'MESSAGES') {
            iconSource = focused
              ? require('../assets/nav-icons/icons8-messaging-100.png')
              : require('../assets/nav-icons/icons8-messaging-100.png');
          } else if (route.name === 'PROFILE') {
            iconSource = focused
              ? require('../assets/nav-icons/icons8-dancer-100.png')
              : require('../assets/nav-icons/icons8-dancer-100.png');
          }

          return <Image source={iconSource} style={{ width: iconSize, height: iconSize, tintColor: color }} />;
        },
        tabBarActiveTintColor: '#fc038c',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: { backgroundColor: 'black', height: 90 },
        tabBarLabelStyle: {fontSize: 12, marginTop: 10},
        tabBarIconStyle: {marginTop: 15}
      })}
    >
      <Tab.Screen name="GIGS" options={{ headerShown: false }} component={Home} />
      <Tab.Screen name="ARTISTS" options={{ headerShown: false }} component={Artists} />
      <Tab.Screen name="MESSAGES" component={Messages} />
      <Tab.Screen name="PROFILE" component={Profile} />
    </Tab.Navigator>
  );
};

export default NavBar;