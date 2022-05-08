import * as React from 'react';
import { Text, View,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import { Dimensions} from 'react-native'
import { ScrollView } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Custombutton from './Custom/Custombutton';

export default function Addtodo() {
    // 2 dòng code dưới ko đc đụng!!
    const [height,setheight]=useState(0)   
    const [height1,setheight1]=useState(0)
    


    return(
        
            
        <ScrollView style={{backgroundColor:'#0C0C0C',flex:1,marginTop:24}}>
            <TextInput 
            multiline 
            placeholder='Tên việc cần làm' 
            placeholderTextColor='gray' 
            style={{height: Math.max(40,height),marginTop:20,color:'white',borderWidth:1,borderBottomColor:'gray',fontSize:25}}
            maxLength={Dimensions.get("screen").width-24}
            onContentSizeChange={(event) => {
                setheight(event.nativeEvent.contentSize.height)
            }}/>
            <TextInput 
            multiline 
            placeholder='Bạn có muốn thêm chi tiết không?' 
            placeholderTextColor='gray' 
            style={{height: Math.max(40,height1),color:'white',fontSize:20}}
            maxLength={Dimensions.get("screen").width-24}
            onContentSizeChange={(event) => {
                setheight1(event.nativeEvent.contentSize.height)
            }}/>
            <Custombutton Text="Độ ưu tiên"/>           
            
            <Custombutton Text="Danh sách việc" />
            <Custombutton Text="Mẫu" />



           


            
            


          
        </ScrollView>



    )
}

