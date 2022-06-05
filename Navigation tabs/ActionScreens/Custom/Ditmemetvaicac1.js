

import * as React from 'react';
import { Text, TouchableOpacity,View,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react/cjs/react.development';


import SQLite from 'react-native-sqlite-storage';
const db=SQLite.openDatabase({name:"mainDB",location:"Library"},
()=>{console.log("wtf")},
(error)=>{console.log("loimeroi")})


export default function Ditmemetvaicac(props){

    const [bomaycantat,setbomaycantat]=useState(props.isdone)
    const [id1,setid1]=useState(props.id)
    function setupdate(){
      
      if(bomaycantat==1)
      {
        setbomaycantat(0);
        db.transaction((tx)=>{
          tx.executeSql("update TASK set completed=? where id=?",
         [0,id1],
         (tx,results)=>{
           console.log("update success!!")
  
           console.log(bomaycantat)
           console.log(id1)
           
         },
         error=>{console.log(error)}
         )
       })
      }
      else
      {
        setbomaycantat(1);
        
        db.transaction((tx)=>{
          tx.executeSql("update TASK set completed=? where id=?",
         [1,id1],
         (tx,results)=>{
           console.log("update success!!")
  
           console.log(bomaycantat)
           console.log(id1)
          
      })
    })
      
      
    }}

    return(
    
    <TouchableOpacity 
    key={props.id}
    onLongPress={props.onLongPress}
    activeOpacity={0.6}
    onPress={props.onPress}
            style={{borderWidth:1,borderColor:"black",height:70,width:Dimensions.get("window").width-10,flexDirection:"row",flex:1,alignItems:"center"}}>
              
            
         
             <View style={{flex:8,marginLeft:20}}>
              
                
                <Text style={{marginLeft:5,fontSize:20}}>{props.name}</Text>
                <Text style={{marginLeft:5}}>{props.time}</Text>
                  
              
             </View>
             </TouchableOpacity>
    )
}

