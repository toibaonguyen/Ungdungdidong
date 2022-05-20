

import * as React from 'react';
import { Text, TouchableOpacity,View,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react/cjs/react.development';



export default function Ditmemetvaicac(props){

    const [bomaycantat,setbomaycantat]=useState(props.isdone)

    return(
    
    <TouchableOpacity key={props.id}
    onPress={props.onPress}
            style={{borderWidth:1,borderColor:"black",height:70,width:Dimensions.get("window").width-10,flexDirection:"row",flex:1,alignItems:"center"}}>
              
              <TouchableOpacity style={{height:20,width:20,borderRadius:10,borderColor:"black",borderWidth:2,backgroundColor: bomaycantat?"blue":"white",marginLeft:10}}
               onPress={()=>setbomaycantat(!bomaycantat)}/>
              
         
             <View style={{flex:8,marginLeft:20}}>
              
                
                <Text style={{marginLeft:5,fontSize:20}}>{props.name}</Text>
                <Text style={{marginLeft:5}}>{props.time}</Text>
                  
              
             </View>
             </TouchableOpacity>
    )
}

