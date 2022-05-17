//import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Timeline from './Navigation tabs/Timeline';
import Outline from './Navigation tabs/Outline';
import Table from './Navigation tabs/Table';
import Workplace from './Navigation tabs/Workplace';
import {StyleSheet} from "react-native"

import * as React from 'react';


const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
   
      <Tab.Navigator  
      screenOptions={{tabBarActiveBackgroundColor:'#3F3F3F',
      tabBarInactiveBackgroundColor:'#3F3F3F',
      headerStyle:{
        backgroundColor: '#1C1C1C', 
      },
      
      
      
      
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }} >
        <Tab.Screen name="timeline" component={Timeline} 
        options={{title:"Việc cần làm"}}
        />
        <Tab.Screen name="table" component={Table}
        options={{title:"Bảng"}}
        />
        <Tab.Screen name="outline" component={Outline}
        options={{title:"Việc chưa lên kế hoạch"}}
        />
        <Tab.Screen name="workplace" component={Workplace}
        options={{title:"Gian làm việc"}}
        />
      </Tab.Navigator>
  );

}






