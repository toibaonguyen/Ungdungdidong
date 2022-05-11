import * as React from 'react';
import { Text, StyleSheet,TouchableOpacity,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react/cjs/react.development';


export default function Custompicktimeview(props){
    const [btncolor,setbtncolor]=useState("#0C0C0C")
    const [btncolor1,setbtncolor1]=useState("#0C0C0C")
    return(
<View style={{backgroundColor:"#0C0C0C",height:50,alignItems:'center',flexDirection:"row"}}>
    <Icon name="calendar" color="white" size={20} style={{}}/>
    <TouchableOpacity style={{height:40,justifyContent:'center',borderRadius:20,backgroundColor:btncolor,alignItems:"center",borderColor:"white",borderWidth:1,marginLeft:30}} 
    onPress={props.pickdate}
    onPressOut={()=>{setbtncolor("#0C0C0C")}}
    onPressIn={()=>{setbtncolor("gray")}}
    >
        <Text style={{color:'white',padding:10}}>{props.date}</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={{height:40,justifyContent:'center',borderRadius:20,backgroundColor:btncolor1,alignItems:"center",borderColor:"white",borderWidth:1,marginLeft:10}} 
    onPress={props.picktime}
    onPressOut={()=>{setbtncolor1("#0C0C0C")}}
    onPressIn={()=>{setbtncolor1("gray")}}
    >
        <Text style={{color:'white',padding:10}}>{props.time}</Text>
    </TouchableOpacity>



 
</View>

    )






}
