
import * as React from 'react'
import {View,TouchableOpacity,Text,Dimensions} from 'react-native'







export default function Homnaymetvailon(props){


    return(
        <View style={{width:Dimensions.get("screen").width-50,height:100,backgroundColor:"white",borderWidth:1}}>
            <View style={{flex:3,justifyContent:"center",alignItems:"center"}}>
              <Text>Bạn có muốn xóa không?</Text>
            </View>
            <View style={{flex:1,flexDirection:"row"}}>
              <TouchableOpacity style={{flex:1,justifyContent:"center",alignItems:"center",borderWidth:1}}
              onPress={props.delete}>
                <Text style={{alignSelf:"center"}}>Có</Text>

              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,justifyContent:"center",alignItems:"center",borderWidth:1}}
              onPress={props.notdelete}>
                <Text style={{alignSelf:"center"}}>Không</Text>

              </TouchableOpacity>
            </View>
          </View>
    )
}