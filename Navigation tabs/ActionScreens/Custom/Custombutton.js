import * as React from 'react';
import { Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react/cjs/react.development';

export default function Custombutton(props) {
    


    const [btncolor,setbtncolor]=useState("#0C0C0C")

    return(
        <TouchableOpacity
            style={{backgroundColor:btncolor,height:50,alignItems:'center',flexDirection:"row"}}
            onPress={props.onPress}
            onPressOut={()=>{setbtncolor("#0C0C0C")}}
            onPressIn={()=>{setbtncolor("gray")}}
            >
            <Icon name = {props.icon} size={20} color="white"/>
            <Text style={{color:'white',fontSize:20}}>{props.Text}</Text>
        </TouchableOpacity>

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