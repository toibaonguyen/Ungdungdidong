//import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Timeline from './Navigation tabs/Timeline';
import Outline from './Navigation tabs/Outline';
import Table from './Navigation tabs/Table';
import Workplace from './Navigation tabs/Workplace';
import {StyleSheet,Image} from "react-native"

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
    }} 
    
    >
        <Tab.Screen name="timeline" component={Timeline} 
        options={{title:"Việc cần làm",tabBarIcon:({focused})=>(
          <View>
              <Image source={require("./images/icons/table.png")}
              resizeMode="contain"
              style={{width:25,height:25,tintColor:'white'}}>

              </Image>
              
          </View>
        )}}
        />
        <Tab.Screen name="table" component={Table}
        options={{ title:"Bảng",tabBarIcon:({focused})=>(
          <View>
              <Image source={require("./images/icons/timeline.png")}
              resizeMode="contain"
              style={{width:25,height:25,tintColor:'white'}}>

              </Image>
              
          </View>
        )}}
        />
        <Tab.Screen name="outline" component={Outline}
        options={{title:"Việc làm ngoài kế hoạch",tabBarIcon:({focused})=>(
          <View>
              <Image source={require("./images/icons/outline.png")}
              resizeMode="contain"
              style={{width:25,height:25,tintColor:'white'}}>

              </Image>
              
          </View>
        )}}
        />
        <Tab.Screen name="workplace" component={Workplace}
        options={{title:"Gian làm việc",tabBarIcon:({focused})=>(
          <View>
              <Image source={require("./images/icons/work.png")}
              resizeMode="contain"
              style={{width:25,height:25,tintColor:'white'}}>

              </Image>
              
          </View>
        )}}
        />
      </Tab.Navigator>
  );

}






