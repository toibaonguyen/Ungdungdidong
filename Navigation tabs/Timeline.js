
import * as React from 'react';
import { Text, View,StyleSheet,Dimensions,ScrollView,FlatList} from 'react-native';

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
var db=SQLite.openDatabase({name:"mainDB.sqlite3", createFromLocation:1,location:"default"},
()=>{console.log("perfect")},
(error)=>{alert(error)})

export default function Timeline({Navigation}) {
    const [isvimodal,setisvimodal]=useState(false);
    const [isvimodal1,setisvimodal1]=useState(false);
    const [isvimodal2,setisvimodal2]=useState(false);
    const [itemlist,setitemlist]=useState([]);
    const [fullyviewitemwithid,setfullyviewitemwithid]=useState(-1)
    const [check,setcheck]=useState(0)
    let newarrqq=[];

    let dk;
    const seemore=(id)=>{
      setfullyviewitemwithid(id)
      setisvimodal2(true)

    }
    const ok=async ()=>{
      
    }

      useEffect(()=>{db.transaction((tx)=>{
        tx.executeSql("select * from TASK",
        [],
        (tx,results)=>{
          const len=results.rows.length;
          
          if(len>0)
          {
            
            
            for(let i=0;i<len;i++)
            {
              newarrqq.push({id: results.rows.item(i).ID,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag})
            }
            
            console.log(itemlist);
            console.log(newarrqq);
            console.log(len);

            dk=itemlist.length>0;
          }
          
          
        
        },
        error=>{console.log(error)}
        )})},[])
  

    
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
          
          dk
          ?<FlatList data={itemlist}
          key={item=>item.id}
          renderItem={({item})=>(
            <Custombutton1 Text={item.name+"\n"+item.time} id={item.id} onPress={seemore(item.id)}/>

          )}
          />
          :<Text style={{alignSelf:"center",fontSize:50}}>Không có việc nào cần làm!</Text>
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