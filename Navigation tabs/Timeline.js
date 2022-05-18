
import * as React from 'react';
import { Text, View,StyleSheet,Dimensions,ScrollView,FlatList,Button} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationContainer } from '@react-navigation/native';
import Modal from "react-native-modal";
import { useEffect,useState } from 'react'
import Addtodo from './ActionScreens/Addtodo';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Addtodo1 from './ActionScreens/Addtodo1';
import SQLite from 'react-native-sqlite-storage';
import Custombutton from './ActionScreens/Custom/Custombutton';
import Custombutton1 from './ActionScreens/Custom/Custombutton1';
import Fullinfoscreen from './ActionScreens/Fullinfoscreen';
import { TouchableOpacity } from 'react-native-gesture-handler';




var db=SQLite.openDatabase({name:"mainDB.sqlite3", createFromLocation:1,location:"Library"},
()=>{console.log("perfect")},
(error)=>{alert(error)})

export default function Timeline({Navigation}) {
    const [isvimodal,setisvimodal]=useState(false);
    const [isvimodal1,setisvimodal1]=useState(false);
    const [isvimodal2,setisvimodal2]=useState(false);
    const [itemlist,setitemlist]=useState([]);
    const [fullyviewitemwithid,setfullyviewitemwithid]=useState(-1)
    const [check,setcheck]=useState(0)
    const [dk,setdk]=useState(false)
   
    const seemore=(id)=>{
      setfullyviewitemwithid(id)
      setisvimodal2(true)

    }

    function getdata(){
      db.transaction(tx=>{
        tx.executeSql("select * from TASK",
        [],
        (tx,results)=>{
          
          const len=results.rows.length;  
          if(len>0)
          {
            
            let newarrqq=[];
            
            for(let i=0;i<len;i++)
            {
              newarrqq.push({id: results.rows.item(i).ID,name: results.rows.item(i).name,time:new Date(results.rows.item(i).endtime).toLocaleString(),isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag})
            
              //setitemlist(itemlist=>([...itemlist,{id: results.rows.item(i).ID,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag}]))
            }

            
            setitemlist(newarrqq)
            console.log(itemlist);
            console.log(newarrqq);
            console.log(len);
            

            setdk(itemlist.length>0);
            console.log(dk)
          }
        },
        error=>{console.log(error)}
        )})}

     useEffect(()=>{
       getdata();
      
     },[isvimodal])
  

    
    return(
     <View style={{flex:1,alignItems:"center"}}>
        <Modal isVisible={isvimodal} 
        style={{alignSelf:"center",margin:0}}
        >
          <Addtodo onPress={()=>setisvimodal(false)}/>
        </Modal> 
        <Modal isVisible={isvimodal1} 
        style={{alignSelf:"center",margin:0}}
        >
          <Addtodo1 onPress={()=>setisvimodal1(false)}/>
        </Modal> 
        <Modal isVisible={isvimodal2} 
        style={{alignSelf:"center",margin:0}}
        >
          <Fullinfoscreen onPress={()=>setisvimodal2(false)} id={fullyviewitemwithid}/>
        </Modal> 
        <ActionButton buttonColor="rgba(0,0,0,1)" >
          <ActionButton.Item buttonColor='#3498db' title="Việc định kì" onPress={() => {setisvimodal1(true)}}>
            <Icon name="loop" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Việc cần làm" onPress={() => {setisvimodal(true)}}>
            <Icon name="calendar-today" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        {
          dk&&
          <FlatList data={itemlist}
          style={{marginTop:5}}
          key={item=>item.id}
          renderItem={({item})=>(
            <View style={{borderWidth:1,borderColor:"black",height:70,width:Dimensions.get("window").width-10,flexDirection:"row",flex:1,alignItems:"center"}}>
              <View style={{marginLeft:10,flex:1}}>
              <TouchableOpacity style={{height:20,width:20,borderRadius:10,borderColor:"black",borderWidth:2,backgroundColor:item.isdone?"blue":"white"}}
               onPress={()=>{}}/>
              </View>
              <View style={{flex:6}}>
              <Text style={{marginLeft:5,fontSize:20}}>{item.name}</Text>
              <Text style={{marginLeft:5}}>{item.time}</Text>
              </View>
              <View style={{flex:2,justifyContent:"center"}}>
              <TouchableOpacity 
              style={{height:30,width:80,borderWidth:1,backgroundColor:"#338ECC",justifyContent:"center"}}
              onPress={alert("testnn")}
              >
                <Text style={{alignSelf:"center"}}>Chi tiết</Text>
              </TouchableOpacity>
              </View>
              
              

            </View>
          )}
          />
        }
        
     
        

     </View>

    );

}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'black',
  },
});