import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Artists from './Artists';
import Home from './Home'
import Messages from './Messages'
import Profile from './Profile'
import SingleGig from './SingleGig';

const Tab = createBottomTabNavigator();


const NavBar = () => {
  return (

    
      <Tab.Navigator>
        <Tab.Screen name="GIGS" options={{ headerShown: false }} component={Home} />
        <Tab.Screen name="ARTISTS" options={{ headerShown: false }} component={Artists} />
        <Tab.Screen name="MESSAGES" component={Messages} />
        <Tab.Screen name="PROFILE" component={Profile} />
      </Tab.Navigator>
    
  )
}

export default NavBar

