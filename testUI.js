import * as React from 'react';
import { Text, View, Image, TouchableOpacity, Button, TextInput, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import ButtonUI from './Navigation tabs/ActionScreens/Custom/UIbutton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modal from "react-native-modal";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import defineLazyObjectProperty from 'react-native/Libraries/Utilities/defineLazyObjectProperty';


export default function testUi()
{

return(
<View style={{ flex: 1, backgroundColor: "white", borderRadius: 10, borderColor: "black", borderWidth: 1 }}>
<View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderBottomColor: "black", borderBottomWidth: 1, backgroundColor: "black" }}>

    <TextInput style={{ borderRadius: 10, borderColor: "black", borderWidth: 1, width: "80%", backgroundColor: "white" }}
        placeholder="Nhập tên mẫu..."
        maxLength={40}
        />
</View>
<View style={{ flex: 1, alignItems: "center", flexDirection: "row", borderBottomColor: "black", borderBottomWidth: 1, backgroundColor: "black" }}>
    <TextInput style={{ borderRadius: 10, marginLeft: 10, marginRight: 10, borderColor: "black", borderWidth: 1, width: "75%", backgroundColor: "white" }}
        placeholder="Nhập việc cần làm..."
        maxLength={40}
        />
    <Button title='Thêm' style={{borderRadius: 50}}  onPress={() => {
                                 alert("Chưa nhập tên mẫu")
                                
                            }} />
   
</View>
<View style={{ flex: 5 }}>
    <FlatList 
    />
    

</View>
</View>
)}

