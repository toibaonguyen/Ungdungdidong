
import Tabs from './Tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Addtodo from './Navigation tabs/ActionScreens/Addtodo';

import * as React from 'react';
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
    
   
  );
}

