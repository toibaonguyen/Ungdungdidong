import * as React from 'react';
import { Text, View, Image } from 'react-native';



export default function Outline({ Navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 25 }}>

            </View>

            <View style={{
                flex: 30,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../images/OutLine.png')}
                    style={{
                        width: 150,
                        height: 150,
                    }}
                >

                </Image>
            </View>

            <View style={{
                flex: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ fontWeight: 'bold',fontSize:15,color:'black' }}>
                    Bạn đã làm rất tốt! Không có nhiệm vụ
                </Text>
                <Text style={{ fontWeight: 'bold',fontSize:15,color:'black' }}>
                    ngoài kế hoạch
                </Text>
                <Text style={{marginTop:10}}>
                    Các việc chưa hoàn thành mà không kèm hạn chót
                </Text>
                <Text>
                    hay thuộc dự án nào sẽ hiển thị ở đây
                </Text>
            </View>

            <View style={{ flex: 25 }}>

            </View>

        </View>

    );
}