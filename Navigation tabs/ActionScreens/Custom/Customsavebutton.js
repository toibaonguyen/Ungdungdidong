import * as React from 'react';
import { Text, StyleSheet,TouchableOpacity,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react/cjs/react.development';


export default function Customsavebutton(props){

    const [btncolor1,setbtncolor1]=useState("#3498db");

    return(

        <TouchableOpacity style={{height:40,justifyContent:'center',borderRadius:20,backgroundColor:btncolor1,
        alignItems:"center",borderColor:"white",borderWidth:1,marginTop:props.mgtop,borderColor:"black"
}} 
        onPress={props.onPress}
        onPressOut={()=>{setbtncolor1("#3498db")}}
        onPressIn={()=>{setbtncolor1("#48A1DE")}}
        >
            <Text style={{color:'white',padding:10}}>{props.text}</Text>
        </TouchableOpacity>
    


    )


}