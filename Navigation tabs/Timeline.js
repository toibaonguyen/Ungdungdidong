
import * as React from 'react';
import { Text, View,StyleSheet,Dimensions,ScrollView,FlatList,Button,TouchableOpacity,Image} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationContainer } from '@react-navigation/native';
import Modal from "react-native-modal";
import { useEffect,useState } from 'react'
import Addtodo from './ActionScreens/Addtodo';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Addtodo1 from './ActionScreens/Addtodo1';

import Custombutton from './ActionScreens/Custom/Custombutton';
import Custombutton1 from './ActionScreens/Custom/Custombutton1';
import Fullinfoscreen from './ActionScreens/Fullinfoscreen';




import SQLite from 'react-native-sqlite-storage';
import Ditmemetvaicac from './ActionScreens/Custom/Ditmemetvaicac';
import Homnaymetvailon from './ActionScreens/Custom/Homnaymetvailon';
const db=SQLite.openDatabase({name:"mainDB",location:"Library"},
()=>{console.log("wtf")},
(error)=>{console.log("loimeroi")})


export default function Timeline({Navigation}) {
    const [isvimodal,setisvimodal]=useState(false);
    const [isvimodal1,setisvimodal1]=useState(false);
    const [isvimodal2,setisvimodal2]=useState(false);
    
    const [isvimodal3,setisvimodal3]=useState(false);
    const [itemlist,setitemlist]=useState([]);
    const [fullyviewitemwithid,setfullyviewitemwithid]=useState()
    const [check,setcheck]=useState(0)
    const [dk,setdk]=useState(false)
    const [idn,setidn]=useState()
    const [rf,setrf]=useState(0)


    function concainit(id){
      setidn(id);
      setisvimodal3(true);

    }
    
    function deleteitem(){
      db.transaction(tx=>{
        tx.executeSql("delete from minitask where idmaintask=?",
        [idn],
        ()=>{console.log("delete complete")},
        error=>console.log(error))


      })
      db.transaction(tx=>{
        tx.executeSql("delete from TASK where id=?",
        [idn],
        ()=>{console.log("delete complete 1")},
        error=>console.log(error))


      })
      setitemlist(itemlist.filter(i=>i.id!==idn))
      setisvimodal3(false);

    }
    
   
    const seemore=(id)=>{
      setfullyviewitemwithid(id)
      setisvimodal2(true)

    }
    useEffect(()=>{
      db.transaction((tx)=>{
        tx.executeSql("select * from TASK",
       [],
       (tx,results)=>{
         
         const len=results.rows.length;  
         if(len>0)
         {
           
           let newarrqq=[];
           
           for(let i=0;i<len;i++)
           {
             let now=new Date();
             let timetocompare=new Date(results.rows.item(i).endtime)
             if(now.getTime()<=timetocompare.getTime())
             {
             newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
             }
           }
           setitemlist(newarrqq);
           console.log(itemlist);
           console.log(newarrqq);
           console.log(len);
           

           setdk(itemlist.length>0);
           console.log(dk)
         }
       },
       error=>{console.log(error)}
       )
     })

    },[])
  
    

       
      
     

    
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
        <Modal isVisible={isvimodal3} 
        style={{alignSelf:"center",margin:0}}
        >
          <Homnaymetvailon delete={()=>{deleteitem()}} notdelete={()=>setisvimodal3(false)}/>
        </Modal> 
        
        {
          itemlist.length>0
          ?
          <FlatList style={{marginTop:5}}
          data={itemlist}
          keyExtractor={item=>item.id}
          renderItem={({item})=>(
            <View key={item.id}>
              <Ditmemetvaicac name={item.name} id={item.id} time={item.time} isdone={item.isdone} 
              onPress={()=>{seemore(item.id)}}
              onLongPress={()=>{concainit(item.id)}}
              
              
              />
            </View>
          )
        }
          />:<View style={{alignItems:"center",justifyContent:"center",flex:1}}>
            <Image source={require('../images/reading.png')}
            style={{
              width: 150,
              height: 150,
          }}/>
          <Text>Không có công việc nào cần làm!</Text>

          </View>
         
          
   
        }
        <ActionButton buttonColor="rgba(0,0,0,1)" position="center">
          
          <ActionButton.Item buttonColor='#3498db' title="Việc cần làm" onPress={() => {setisvimodal(true)}}>
            <Icon name="calendar-today" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        
     
        

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