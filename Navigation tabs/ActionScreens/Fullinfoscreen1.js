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

export default function Fullinfoscreen1(props) {

    
    const [stateww,setstateww]=useState({n1:"",d1:"",t1:"",ti1:"",l1:[],p1:"Không"});
    const [checkforfun,setcheckforfun]=useState(0)
    const [idf,setidf]=useState(props.id)
    

    
   
    useEffect(()=>{
        let nam1="",des1="",pri1="",ta1="",time1=""
        let arr=[]
        db.transaction(tx=>{
          tx.executeSql("SELECT name ,description,priority,tag,time from loopTASK where ID=?",
         [idf],
         (tx,results)=>{
            console.log("here")
            console.log(idf)
            console.log(results.rows.item(0).name)

            nam1=results.rows.item(0).name;
            des1=results.rows.item(0).description;
            pri1=results.rows.item(0).priority;
            ta1=results.rows.item(0).tag;
            time1=results.rows.item(0).time;
            setstateww({n1:nam1,d1:des1,t1:ta1,ti1:time1,l1:arr,p1:pri1})
      
            
   
            
           
            
          
         },
         error=>{console.log(error)}
         )
       })
       db.transaction(tx=>{
        tx.executeSql("SELECT name from loopminiTASK where idmaintask=?",
       [idf],
       (tx,results)=>{

        if(results.rows.length>0)
        {
            
            for(let i=0;i<results.rows.length;i++)
            {
                arr.push(results.rows.item(i).name);
            }
            setstateww({n1:nam1,d1:des1,t1:ta1,ti1:time1,l1:arr,p1:pri1})
            
        }
          
         
          
        
       },
       error=>{console.log(error)}
       )
     })
     setstateww({n1:nam1,d1:des1,t1:ta1,ti1:time1,l1:arr,p1:pri1})

  
      },[])
      
   


    return(
    <View style={{backgroundColor:"white",width:Dimensions.get("window").width-10,height:Dimensions.get("window").height-20}}>
    <ScrollView style={{flex:1}}>
        <Text style={{flex:1,fontSize:30,alignSelf:"center"}}>Thông tin</Text>
        <View style={{flex:6}}>
            
            <ScrollView style={{borderWidth:1,borderColor:"black",marginTop:5,marginLeft:10,marginRight:10,height:120}}>
                <Text style={{margin:5}}>{stateww.d1.length>0?stateww.d1:"Không có mô tả chi tiết nào"}</Text>
            </ScrollView>
            {
                stateww.l1.map(i=>(<Text style={{borderRadius:10,height:25,alignSelf:"center"}}>{i}</Text>))
            }
            <Customsavebutton text="Xong" onPress={props.onPress}/>
        </View>


    </ScrollView>
    </View>
    )

}

