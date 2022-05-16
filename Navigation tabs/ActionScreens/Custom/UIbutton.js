import * as React from 'react';
import { Text, StyleSheet,TouchableOpacity,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react/cjs/react.development';

export default function UIbutton(props){
    const Title =props
    return(
       <TouchableOpacity style={{
           borderColor:'#a9a9a9',
           borderWidth:1,
           height:45,
       }}>
          <Text>
              {Title}
          </Text>
       </TouchableOpacity>

    )
}