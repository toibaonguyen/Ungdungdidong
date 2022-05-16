import * as React from 'react';
import { Text, View,Image,TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import ButtonUI from '../Navigation tabs/ActionScreens/Custom/UIbutton';
export default function Workplace({ Navigation }) {
    const [buttonTypes, setbuttonTypes] = useState([
        { name: 'Việc định kỳ' },
        { name: 'Nhắc nhở' },
        { name: 'Ghi chú' },
        { name: 'Thẻ' },
        { name: 'Mẫu' },
        { name: 'Số liệu thống kê' },

    ])
    return (
        <View style={{ flex: 1 }}>


            <TouchableOpacity style={{ height: 170, borderWidth: 1, borderColor: '#a9a9a9', borderRadius: 5, marginHorizontal: 5, marginVertical: 10 }}>
                <Text style={{ color: 'black', marginStart: 20, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>
                    Nhiệm vụ đã hoàn thành
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                borderColor: '#a9a9a9',
                borderWidth: 1,
                height: 60,
                justifyContent:'center',
            }}>
                <Image source={require('../images/icons/daily.png'
                 )} style={{
                     width:30, height:30,
                     position:'absolute', left:10,top:15
            
                 }}>

                </Image>
                <Text style={{
                    color:'black',
                    fontSize:14,
                    fontWeight:'bold',
                    marginStart:50,   
                }}>
                Việc định kỳ
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                borderColor: '#a9a9a9',
                borderWidth: 1,
                height: 60,
                justifyContent:'center',
            }}>
                <Text style={{
                    color:'black',
                    fontSize:14,
                    fontWeight:'bold',
                    marginStart:50,   
                }}>
                Nhắc nhở
                </Text>
                <Image source={require('../images/icons/alert.png'
                 )} style={{
                     width:30, height:30,
                     position:'absolute', left:10,top:15
            
                 }}>

                </Image>
            </TouchableOpacity>

            <TouchableOpacity style={{
                borderColor: '#a9a9a9',
                borderWidth: 1,
                height: 60,
                justifyContent:'center',
            }}>
                <Text style={{
                    color:'black',
                    fontSize:14,
                    fontWeight:'bold',
                    marginStart:50,   
                }}>
                Ghi chú
                </Text>
                <Image source={require('../images/icons/note.png'
                 )} style={{
                     width:30, height:30,
                     position:'absolute', left:10,top:15
            
                 }}>

                </Image>
            </TouchableOpacity>

            <TouchableOpacity style={{
                borderColor: '#a9a9a9',
                borderWidth: 1,
                height: 60,
                justifyContent:'center',
            }}>
                <Text style={{
                    color:'black',
                    fontSize:14,
                    fontWeight:'bold',
                    marginStart:50,   
                }}>
                Mẫu
                </Text>
                <Image source={require('../images/icons/sample.png'
                 )} style={{
                     width:30, height:30,
                     position:'absolute', left:10,top:15
            
                 }}>

                </Image>
            </TouchableOpacity>

            <TouchableOpacity style={{
                borderColor: '#a9a9a9',
                borderWidth: 1,
                height: 60,
                justifyContent:'center',
            }}>
                <Text style={{
                    color:'black',
                    fontSize:14,
                    fontWeight:'bold',
                    marginStart:50,   
                }}>
                Thẻ
                </Text>
                <Image source={require('../images/icons/tag.png'
                 )} style={{
                     width:30, height:30,
                     position:'absolute', left:10,top:15
            
                 }}>

                </Image>
            </TouchableOpacity>

            <TouchableOpacity style={{
                borderColor: '#a9a9a9',
                borderWidth: 1,
                height: 60,
                justifyContent:'center',
            }}>
                <Text style={{
                    color:'black',
                    fontSize:14,
                    fontWeight:'bold',
                    marginStart:50,   
                }}>
                Số liệu thống kê
                </Text>
                <Image source={require('../images/icons/analys.png'
                 )} style={{
                     width:30, height:30,
                     position:'absolute', left:10,top:15
            
                 }}>

                </Image>
            </TouchableOpacity>

            

        </View>

    );
}