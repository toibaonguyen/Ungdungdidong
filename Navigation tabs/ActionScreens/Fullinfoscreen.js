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
var db=SQLite.openDatabase({name:"mainDB",location:"Library"},
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
    var dk;
    const [checkforfun,setcheckforfun]=useState(0)
    

    
   
    useEffect(()=>{

        db.transaction(tx=>{
          tx.executeSql("SELECT TASK.name as n1,description,priority,tag,endtime,miniTASK.name as n2 from TASK LEFT JOIN miniTASK on TASK.ID=miniTASK.idmaintask and ID=?",
         [props.id],
         (tx,results)=>{
            console.log("here")

            let nam=results.rows.item(0).n1;
            let des=results.rows.item(0).description;
            let pri=results.rows.item(0).priority;
            let ta=results.rows.item(0).tag;
            let time=results.rows.item(0).endtime;
            let arr=[];
            let len=results.rows.length;
            if(len>0&&results.rows.item(0).n2!=null)
            {
                for(let ketao=0;ketao<len;ketao++)
                {
                    arr.push(results.rows.item(ketao).n2);

                }
            }
            setstateww({n:nam,d:des,t:ta,ti:time,l:arr,p:pri})
            dk=stateww.t.length>0
            console.log(props.id)
           
            
          
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
                <Text style={{margin:5}}>{stateww.d.length>0?stateww.d:"Không có mô tả chi tiết nào"}</Text>
            </ScrollView>
            {
            dk &&
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

