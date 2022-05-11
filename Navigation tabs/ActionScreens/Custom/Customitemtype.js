import * as React from 'react';
import { Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react/cjs/react.development';

export default function Customitemtype(props) {
    


    const [btncolor,setbtncolor]=useState("#E5EBEF ")

    return(
        <TouchableOpacity
            style={{backgroundColor:"#E5EBEF ",height:50,alignItems:'center',flexDirection:"row",justifyContent:"center",borderRadius:10,marginLeft:10,marginRight:10}}
            onPress={props.onPress}
            
          
            >           
        <Text style={{color:props.color,fontSize:30}}>{props.Text} </Text>
        </TouchableOpacity>

    )
}