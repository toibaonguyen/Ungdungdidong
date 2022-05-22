import * as React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import ButtonUI from '../Navigation tabs/ActionScreens/Custom/UIbutton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../App';
import Modal from "react-native-modal";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Addtodo from './ActionScreens/Addtodo';



import SQLite from 'react-native-sqlite-storage';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
var db = SQLite.openDatabase({ name: "mainDB", location: "Library" },
    () => { console.log("vcasdasdasdfwvdagv") },
    (error) => { alert(error) })




export default function Workplace() {
    const [modalVisible, setmodalVisible] = useState(false);
    const [modalVisible1, setmodalVisible1] = useState(false);
    const [modalVisible2, setmodalVisible2] = useState(false);
    const [modalVisible3, setmodalVisible3] = useState(false);
    const [modalVisible4, setmodalVisible4] = useState(false);
    const [modalVisible5, setmodalVisible5] = useState(false);
    const [modalAddTag, setmodalAddTag] = useState(false);
    const [modalDailyVisible1, setmodalDailyVisible1] = useState(false);
    const[count,Setcount]=useState()
    const [tag, setTag] = useState("")
    const [tags, setTags] = useState([])
    const addTag = () => {
        if (!tag) {
            console.log('1')
            return false;
        }

        db.transaction(txn => {
            txn.executeSql('INSERT INTO TAG (tagname) VALUES (?)', [tag],
                () => {
                    console.log(tag + ' tag đã thêm')
                    getTag()
                    setTag("")
                    setmodalAddTag(!modalAddTag)
                }

                , () => { alert('chưa thêm được') })
        })
    }
    
    const getTag = () => {
        db.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM tag',
                [],
                (txn, res) => {
                    console.log('lay du lieu thanh cong')
                    let len = res.rows.length;
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ tagname: item.tagname })
                            console.log(results.length)
                        }
                        Setcount(results.length)
                setTags(results)


                    }
                },
                error => { console.log('loi khong lay duoc du lieu') }
            )
        })
    }

    useEffect(async () => {
        await getTag()
    }, [])


    function deleteTag(tagname){
        db.transaction(tx=>{
            tx.executeSql('DELETE FROM TAG WHERE tagname=?',[tagname],
            ()=>{console.log('xoa that bai')},
            error=>{console.log('xoa thanh cong')})
        }

        )
        setTags(tags.filter(i=>i.tagname!==tagname))
    }



    const renderTag = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderColor: "#ddd" ,flexDirection:"row"}}>
                <View style={{flex:90}}>
                <Text>{item.tagname}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>{deleteTag(item.tagname)
                          
                    }}>
                        <Image source={require("../images/icons/delete.png")} style={{ height: 20, width: 20 }}>

                         </Image>
                    </TouchableOpacity>
                    
                </View>
                
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>


            <TouchableOpacity style={{ height: 170, borderWidth: 1, borderColor: '#a9a9a9', borderRadius: 5, marginHorizontal: 5, marginVertical: 10 }}>
                <Text style={{ color: 'black', marginStart: 20, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>
                    Nhiệm vụ đã hoàn thành
                </Text>
            </TouchableOpacity>


            <Modal animationType="slide"
                transparent={false}
                visible={modalVisible3}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setmodalVisible3(!modalVisible3);
                }}>
                <View>
                    <TouchableOpacity onPress={() => setmodalVisible3(!modalVisible3)}>
                        <Image source={require("../images/icons/back.png")} style={{ height: 60, width: 60, }}>

                        </Image>
                    </TouchableOpacity>
                    <Text>
                        dang bơ vơ :)))
                    </Text>
                </View>

            </Modal>
            <TouchableOpacity style={{
                borderColor: '#a9a9a9',
                borderWidth: 1,
                height: 60,
                justifyContent: 'center',
            }} onPress={() => setmodalVisible3(true)}>
                <Text style={{
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginStart: 50,
                }}>
                    Mẫu
                </Text>
                <Image source={require('../images/icons/sample.png'
                )} style={{
                    width: 30, height: 30,
                    position: 'absolute', left: 10, top: 15

                }}>

                </Image>
            </TouchableOpacity>

            <Modal animationType="slide"
                transparent={false}
                visible={modalVisible4}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setmodalVisible4(!modalVisible4);
                }}>

                <View style={{ flex: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderWidth: 1, borderColor: '#777', width: '95%', height: 40, flexDirection: 'row' }}>
                        <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../images/icons/find.png')}
                                style={{
                                    width: '70%',
                                    height: '70%',
                                }}>

                            </Image>

                        </View>
                        <View style={{ flex: 90 }}>
                            <TextInput placeholder='Tên thẻ' style={{ flex: 1 }}>

                            </TextInput>
                            
                           
                        </View>
                    </View>
                </View >
                <View style={{ flex: 70 }}>
              {
                  count>0?
                  ( (  <FlatList
                    data={tags}
                    renderItem={renderTag}
                    key={cat => cat.id}
                />))
                 :
                 (<View style={{flex:1}}>
                    <View style={{
                        flex: 30, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../images/Tag.png')}
                            style={{
                                width: 200,
                                height: 200,
                            }}>

                        </Image>
                    </View>
                    <View style={{
                        flex: 20,
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                            Chưa có thẻ nào. Bạn có muốn tạo một
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                            cái không?
                        </Text>
                        <Text />
                        
                        <TouchableOpacity style={{
                            backgroundColor: 'black',
                            height: 40,
                            width: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8
                        }} onPress={() => setmodalAddTag(true)}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                                Tạo thẻ
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
                )
                
              }
                </View>
                <Modal animationType="slide"
                            transparent={false}
                            visible={modalAddTag}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setmodalAddTag(!modalAddTag);
                            }}>

                            <View style={{ flex: 15, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ borderWidth: 1, borderColor: '#777', width: '95%', height: 40, flexDirection: 'row' }}>
                                    <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../images/icons/add.png')}
                                            style={{
                                                width: '70%',
                                                height: '70%',
                                            }}>
                                        </Image>
                                    </View>
                                    <View style={{ flex: 90 }}>
                                        <TextInput placeholder='Nhập tên thẻ' style={{ flex: 1 }} value={tag} onChangeText={setTag}>

                                        </TextInput>
                                    </View>
                                </View>
                            </View >
                            <View style={{ flex: 30, flexDirection: 'row' }}>
                                <View style={{ flex: 100 }} />
                                <View style={{ flex: 20 }}>
                                    <TouchableOpacity onPress={addTag}>
                                        <Image source={require('../images/icons/addbut.png')}
                                            style={{
                                                width: 50, height: 50
                                            }}>
                                        </Image>
                                    </TouchableOpacity>

                                </View>

                            </View>

                            <View style={{
                                flex: 30, justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            </View>



                        </Modal>

                <View style={{ flex: 15, flexDirection: 'row' }}>
                    <View style={{ flex: 20 }}>
                        <TouchableOpacity onPress={() => setmodalVisible4(!modalVisible4)}>
                            <Image source={require("../images/icons/back.png")} style={{ height: 60, width: 60 }}>

                            </Image>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 80 }} ></View>
                    <View style={{ flex: 20, flexDirection: "row" }}>

                        <TouchableOpacity style={{
                            backgroundColor: 'black',
                            height: 60,
                            width: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100
                        }} onPress={() =>{setmodalAddTag(true)}}>
                            <Text style={{
                                color: 'white',
                                fontSize: 45,
                            }}>
                                +
                            </Text>
                        </TouchableOpacity>



                    </View>

                </View>
            </Modal>
            <TouchableOpacity style={{
                borderColor: '#a9a9a9',
                borderWidth: 1,
                height: 60,
                justifyContent: 'center',
            }} onPress={() => setmodalVisible4(true)}>
                <Text style={{
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginStart: 50,
                }}>
                    Thẻ
                </Text>
                <Image source={require('../images/icons/tag.png'
                )} style={{
                    width: 30, height: 30,
                    position: 'absolute', left: 10, top: 15

                }}>

                </Image>
            </TouchableOpacity>

            <Modal animationType="slide"
                transparent={false}
                visible={modalVisible5}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setmodalVisible5(!modalVisible5);
                }}>
                <View>
                    <TouchableOpacity onPress={() => setmodalVisible5(!modalVisible5)}>
                        <Image source={require("../images/icons/back.png")} style={{ height: 60, width: 60 }}>

                        </Image>
                    </TouchableOpacity>
                    <Text>
                        SOS cứu bé với
                    </Text>
                </View>

            </Modal>
            <TouchableOpacity style={{
                borderColor: '#a9a9a9',
                borderWidth: 1,
                height: 60,
                justifyContent: 'center',
            }} onPress={() => setmodalVisible5(true)}>
                <Text style={{
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginStart: 50,
                }}>
                    Số liệu thống kê
                </Text>
                <Image source={require('../images/icons/analys.png'
                )} style={{
                    width: 30, height: 30,
                    position: 'absolute', left: 10, top: 15

                }}>

                </Image>
            </TouchableOpacity>



        </View>

    );
}


