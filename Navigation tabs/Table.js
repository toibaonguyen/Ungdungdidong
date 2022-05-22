import * as React from 'react';
import { Text, View,TouchableOpacity,Dimensions,ScrollView,StyleSheet,Image } from 'react-native';
import Modal from "react-native-modal";
import ActionButton from 'react-native-action-button';
import Addtodo1 from './ActionScreens/Addtodo1';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useState,useEffect} from 'react'

import Fullinfoscreen1 from './ActionScreens/Fullinfoscreen1';
import Homnaymetvailon from './ActionScreens/Custom/Homnaymetvailon';
import SQLite from 'react-native-sqlite-storage';
let db=SQLite.openDatabase({name:"mainDB",location:"Library"},
()=>{},
(error)=>{console.log("loimeroi")})




export default function Table({Navigation}) {
    const [isvimodal1,setisvimodal1]=useState(false);


    const [isvimodal3,setisvimodal3]=useState(false);
    const [list,setlist]= useState([]);
    const colorarr=["#3B8CC2","#C27F3B","#C23B89","#913BC2","#C2C23B","#50C23B"]
    const [isvimodal2,setisvimodal2]=useState(false)
    const [qq,setqq]=useState()
    const randomco=()=>{
        let ku=Math.floor(Math.random() * 6);
        return colorarr[ku]
    }
    function openinfo(i){
        setqq(i);
        setisvimodal2(true);
    }
    function concainit(id){
        setqq(id);
        setisvimodal3(true);
  
    }
    function deleteitem(){
        db.transaction(tx=>{
          tx.executeSql("delete from loopminitask where idmaintask=?",
          [qq],
          ()=>{console.log("delete complete")},
          error=>console.log(error))
  
  
        })
        db.transaction(tx=>{
          tx.executeSql("delete from loopTASK where id=?",
          [qq],
          ()=>{console.log("delete complete 1")},
          error=>console.log(error))
  
  
        })
        setlist(list.filter(i=>i.id!==qq))
        setisvimodal3(false);
  
      }

 

    function metvai(){
        
        db.transaction(tx=>{
            tx.executeSql("select * from loopTASK",
           [],
           (tx,results)=>{

             let len=results.rows.length;  
             if(len>0)
             {

               
               let newarrqq=[];
               
               for(let i=0;i<len;i++)
               {
                   let ko=new Date(results.rows.item(i).time);
                   let timee=ko.toUTCString()
                 
                   newarrqq.push({id: results.rows.item(i).ID,name: results.rows.item(i).name,time:timee,tag:results.rows.item(i).tag,pr:results.rows.item(i).priority});
               
               }
               setlist(newarrqq);
      

             }
           },
           error=>{console.log(error)}
           )
         })
    }

    useEffect(()=>{
        metvai()
    },[])
    
    useEffect(()=>{
        metvai()
    },[isvimodal1])









    return(
     <View style={{flex:1}}>
       <Modal isVisible={isvimodal2} 
        style={{alignSelf:"center",margin:0}}
        >
          <Fullinfoscreen1 onPress={()=>setisvimodal2(false)} id={qq}/>
    </Modal> 
    <Modal isVisible={isvimodal1} 
        style={{alignSelf:"center",margin:0}}
        >
          <Addtodo1 onPress={()=>setisvimodal1(false)}/>
    </Modal> 
    <Modal isVisible={isvimodal3} 
        style={{alignSelf:"center",margin:0}}
        >
          <Homnaymetvailon delete={()=>{deleteitem()}} notdelete={()=>setisvimodal3(false)}/>
    </Modal>
      {
        list.length>0?
      (<ScrollView style={{flex:1}}>
         {
            list.map(i=>(
            <TouchableOpacity style={{borderRadius:10,width:Dimensions.get("window").width-10,backgroundColor:randomco(),marginTop:5,alignSelf:"center"}} 
            onPress={()=>{openinfo(i.id)}}
            activeOpacity={0.6}
            onLongPress={()=>{concainit(i.id)}}
            >
                <Text style={{marginTop:10,marginLeft:10,fontSize:40,color:"white"}} >
                    {i.name}

                </Text>
                <Text style={{marginTop:5,marginLeft:10,marginBottom:10,color:"white"}}>
                    {"Mức độ khẩn cấp: "+i.pr}
                </Text>
                {i.tag.length>0&&
                <Text style={{marginTop:5,marginLeft:10,alignSelf:"center",borderWidth:1,color:"white"}}>
                    {i.tag}
                </Text>
                }
                <Text style={{marginTop:5,marginLeft:10,marginBottom:10,color:"white"}}>
                    {i.time}
                </Text>
            </TouchableOpacity>))





         }

        

     </ScrollView>
      )
        :
        (<View style={{alignItems:"center",justifyContent:"center",flex:1}}>
        <Image source={require('../images/calendar.png')}
        style={{
          width: 150,
          height: 150,
      }}/>
      <Text>Hiện không có sự kiện nào cần quan tâm.</Text>

      </View>)
}
    <ActionButton buttonColor="rgba(0,0,0,1)" position="center">
      <ActionButton.Item buttonColor='#3498db' title="Bảng sự kiện" onPress={() => {setisvimodal1(true)}}>
        <Icon name="loop" style={styles.actionButtonIcon} />
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