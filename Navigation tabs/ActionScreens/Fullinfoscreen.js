import * as React from 'react';
import { Text, View,StyleSheet,TextInput,TouchableOpacity,Button,FlatList} from 'react-native';

import { ScrollView,Dimensions } from 'react-native';
import { useState } from 'react/cjs/react.development';
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
var db=SQLite.openDatabase({name:"mainDB.sqlite3", createFromLocation:1,location:"default"},
()=>{},
(error)=>{alert(error)})





const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'black',
    },
  });

export default function Fullinfoscreen(props) {

    let name,des,tag,time;
    let arr=[];


    db.transaction(async(tx)=>{
        await tx.executeSql("select * from TASK where id=?",
        [props.id],
        (tx,results)=>{
            name=results.rows.item(0).name;
            des=results.rows.item(0).description;
            tag=results.rows.item(0).tag;
            time=results.rows.item(0).endtime;

          
        },
        error=>{console.log(error)}
        )    
    })
    db.transaction(async(tx)=>{
        await tx.executeSql("select * from miniTASK where idmaintask=?",
        [props.id],
        (tx,results)=>{
            let len=results.rows.length;
            if(len>0){
                for(let i=0;i<len;i++)
                {
                    arr.push(results.rows.item(i).name);
                }
            } 
        },
        error=>{console.log(error)}
        )  

    })

    return(
    <ScrollView style={{flex:1}}>
        <Text style={{flex:1,fontSize:30,alignSelf:"center"}}>Thông tin cụ thể</Text>
        <View style={{flex:6}}>
            <Text style={{fontSize:20,marginLeft:10}}>{name}</Text>
            <ScrollView style={{borderWidth:1,borderColor:"black",marginTop:5,marginLeft:10,marginRight:10,height:60}}>
                <Text style={{margin:5}}>{des}</Text>
            </ScrollView>
            <View style={{height:10,borderRadius:5,borderWidth:1,borderColor:"black",marginLeft:10}}>
                <Text style={{alignSelf:"center"}}>{tag}</Text>
            </View>
            <Text style={{marginLeft:10}}>{"Thời gian: "+time}</Text>
            <FlatList data={arr}
            renderItem={({item})=>(
                <Text style={{borderRadius:10,height:25,alignSelf:"center"}}>{item}</Text>
            )}/>
            <Customsavebutton Text="Xong" onPress={props.onPress}/>
        </View>


    </ScrollView>
    )

}

