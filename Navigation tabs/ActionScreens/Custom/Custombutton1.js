import * as React from 'react';
import { Text, TouchableOpacity,View} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons'
import { useState } from 'react/cjs/react.development';
import SQLite from 'react-native-sqlite-storage';

var db=SQLite.openDatabase({name:"mainDB.sqlite3", createFromLocation:1,location:"Library"},
()=>{},
(error)=>{alert(error)})

export default function Custombutton1(props) {
  
    


    const [btncolor,setbtncolor]=useState("#0C0C0C")
    const [isdone,setisdone]=useState(props.isfinished)

    const deletei= async() => {
      await db.transaction(async (tx)=>{
       
          await tx.executeSql("delete from miniTASK where idmaintask = ?",
            [props.id],
            (tx,results)=>{console.log("delete successful minitask")},
            error=>{alert("lỗi r ông cháu ơi")}
            )   
        })
      await db.transaction(async (tx)=>{
       
          await tx.executeSql("delete from TASK where ID = ?",
            [props.id],
            (tx,results)=>{console.log("delete successful task")},
            error=>{alert("lỗi r ông cháu ơi")}
            )   
      })
        
    }

    const setfinish=async ()=>{
      setisdone(!isdone);
      await db.transaction(async (tx) => {
        if(isdone==true)
        {
          await tx.executeSql("update TASK set finished = 1 where ID = ?",
            [props.id],
            (tx,results)=>{console.log("update 1 success")},
            error=>{alert("lỗi r ông cháu ơi")}
            )   
        }
        else
        {
          await tx.executeSql("update TASK set finished = 0 where ID = ?",
            [props.id],
            (tx,results)=>{console.log("update 0 success")},
            error=>{alert("lỗi r ông cháu ơi")}
            ) 
        }
        


      }

      )




    }

    return(
        <View
            style={{backgroundColor:btncolor,height:50,flexDirection:"row",flex:1}}
            >
            <View style={{flex:5,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{setfinish}} style={{alignItems:"center",justifyContent:"center"}}>
            {
              isdone?(<Icon name = "check-circle-fill" size={20} color="white"/>):(<Icon name = "circle" size={20} color="blue"/>)     
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPress}>
              <Text style={{color:'white',fontSize:20}}>{props.Text}</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity 
            style={{flex:1,backgroundColor: "red"}} 
            onPress={deletei}
            />

            
            
        </View>
            
            

    )
}
/*
const styles = StyleSheet.create({
    Icon: {
      fontSize: 20,
      height: 22,
      color: 'black',
    },
  });
  */