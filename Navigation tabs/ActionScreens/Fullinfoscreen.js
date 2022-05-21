import * as React from 'react';
import { Text, View,StyleSheet,TextInput,TouchableOpacity,Button,FlatList} from 'react-native';

import { ScrollView,Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Custombutton from './Custom/Custombutton';
import Custompicktimeview from './Custom/Custompicktimeview';
import Customsavebutton from './Custom/Customsavebutton';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import Customitemtype from './Custom/Customitemtype';
import ActionButton from 'react-native-action-button';
//database right here

import SQLite from 'react-native-sqlite-storage';
const db=SQLite.openDatabase({name:"mainDB",location:"Library"},
()=>{},
(error)=>{console.log(error)})





const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'black',
    },
  });

export default function Fullinfoscreen(props) {

    
    const [stateww,setstateww]=useState({n:"",d:"",t:"",ti:"",l:[],p:"Không"});
    var dk,dk1;
    const [checkforfun,setcheckforfun]=useState(0)
    const [ko,setko]=useState(props.id)
    let nam
        let des
        let pri
        let ta
        let time
        let arr=[];
        let len
    

    
   
    useEffect(()=>{
        db.transaction(tx=>{
          tx.executeSql("SELECT name,description,priority,tag,endtime from TASK where ID=?",
         [ko],
         (tx,results)=>{
            console.log("here")

            nam=results.rows.item(0).name;
            des=results.rows.item(0).description;
            pri=results.rows.item(0).priority;
            ta=results.rows.item(0).tag;
            time=results.rows.item(0).endtime;
            
            
            setstateww({n:nam,d:des,t:ta,ti:time,l:arr,p:pri})
          
        
           
            
          
         },
         error=>{console.log(error)}
         )
       })
       db.transaction(tx=>{
        tx.executeSql("SELECT name from miniTASK where idmaintask=?",
       [ko],
       (tx,results)=>{
          console.log("here")

        
          
          len=results.rows.length;
          if(len>0)
          {
              for(let ketao=0;ketao<len;ketao++)
              {
                  arr.push(results.rows.item(ketao).name);
              }
              setstateww({n:nam,d:des,t:ta,ti:time,l:arr,p:pri})
          }
          
          dk=stateww.d.length>0
          dk1=stateww.t.length>0
       },
       error=>{console.log(error)}
       )
     })
  
      },[])
      
   


    return(
    <View style={{backgroundColor:"white"}}>
    <ScrollView style={{flex:1}}>
        <Text style={{flex:1,fontSize:30,alignSelf:"center"}}>Thông tin cụ thể</Text>
        <View style={{flex:6}}>
            <Text style={{fontSize:20,marginLeft:10}}>{stateww.n}</Text>
            <Text style={{marginLeft:10,marginTop:10}}>{stateww.p}</Text>
            <ScrollView style={{borderWidth:1,borderColor:"black",marginTop:5,marginLeft:10,marginRight:10,height:120}}>
                <Text style={{margin:5}}>{ stateww.d.length>0 ? stateww.d : "Không có mô tả chi tiết nào"}</Text>
            </ScrollView>
            {
            stateww.t.length>0 &&
            <View style={{height:30,borderRadius:5,borderWidth:1,borderColor:"black",marginLeft:10,width:60}}>
                <Text style={{alignSelf:"center"}}>{stateww.t}</Text>
            </View>
            }
            <Text style={{marginLeft:10}}>{"Thời gian: "+stateww.ti}</Text>
            {
                stateww.l.map(i=>(<Text style={{borderRadius:10,height:25,alignSelf:"center"}}>{i}</Text>))
            }
            <Customsavebutton text="Xong" onPress={props.onPress}/>
        </View>


    </ScrollView>
    </View>
    )

}

