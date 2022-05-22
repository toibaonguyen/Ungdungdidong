import * as React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, FlatList,Dimensions } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import ButtonUI from '../Navigation tabs/ActionScreens/Custom/UIbutton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../App';
import Modal from "react-native-modal";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Addtodo from './ActionScreens/Addtodo';


import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";



import SQLite from 'react-native-sqlite-storage';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { getImageSourceProperties } from 'react-native/Libraries/Image/ImageSource';
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
    const [count, Setcount] = useState()
    const [tag, setTag] = useState("")
    const [tags, setTags] = useState([])
    const [search, setSearch] = useState()
    const [addSample, setaddSample] = useState(false)
    const [addmini, setaddmini] = useState(false)

    const [count1, Setcount1] = useState()
    const [form, setform] = useState("")
    const [forms, setforms] = useState([])

    const [count2, Setcount2] = useState()
    const [minitask, setminitask] = useState("")
    const [minitasks, setminitasks] = useState([])
    const [id, setid] = useState("")
    const [ID, setID] = useState("")




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

    const getminitask = (ID) => {
        db.transaction(txn => {

            txn.executeSql(

                "SELECT * FROM miniTASK where idmaintask='?'",
                [ID],
                (txn, res) => {
                    console.log('lay du lieu thanh cong from')
                    let len = res.rows.length;
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ tagname: item.tagname })
                            console.log(results.length)
                        }
                        Setcount2(results.length)
                        setminitasks(results)


                    }
                },
                error => { console.log(ID + 'ben du lieu ') }
            )
        })
    }

    const addminitag = () => {
        if (!minitask) {
            console.log('1')
            return false;
        }

        db.transaction(txn => {

            txn.executeSql(
                "SELECT * FROM FORM"),
                [],
                (txn, ress) => {
                    console.log('lay id duoc ne')
                    let len = ress.rows.length;
                    setid(len + 1)
                }, error => { console.log('lay id ko dc') }
            txn.executeSql('INSERT INTO miniTASK (idmaintask,name) VALUES (?,?)', [id, minitask],
                () => {
                    console.log(id)
                    setID(id)
                    getminitask(id)
                    setminitask("")

                }

                , () => { alert(id + 'hien gio') })
        })
    }




    useEffect(async () => {
        await getTag()
        await getminitask()
        await getJan()
        await getFeb()
        await getMar()
        await getApr()
        await getMay()
        await getJun()
        await getJul()
        await getAug()
        await getSep()
        await getOct()
        await getNov()
        await getDec()
        
    }, [])


    function deleteTag(tagname) {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM TAG WHERE tagname=?', [tagname],
                () => { console.log('xoa that bai') },
                error => { console.log('xoa thanh cong') })
        }

        )
        setTags(tags.filter(i => i.tagname !== tagname))
    }


    const renderMinitag = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderColor: "#ddd", flexDirection: "row" }}>
                <View style={{ flex: 90 }}>
                    <Text>{item.tagname}</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Image source={require("../images/icons/delete.png")} style={{ height: 20, width: 20 }}>

                        </Image>
                    </TouchableOpacity>

                </View>

            </View>

        )
    }

    const renderTag = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderColor: "#ddd", flexDirection: "row" }}>
                <View style={{ flex: 90 }}>
                    <Text>{item.tagname}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        deleteTag(item.tagname)

                    }}>
                        <Image source={require("../images/icons/delete.png")} style={{ height: 20, width: 20 }}>

                        </Image>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    function searchTag(texttosearch) {
        setTags(tags.filter(i => i.tagname.includes(texttosearch),),)
    }
    const[Jan,setJan]=useState(0)
    const[Feb,setFeb]=useState(0)
    const[Mar,setMar]=useState(0)
    const[Apr,setApr]=useState(0)
    const[May,setMay]=useState(0)
    const[Jun,setJun]=useState(0)
    const[Jul,setJul]=useState(0)
    const[Aug,setAug]=useState(0)
    const[Sep,setSep]=useState(0)
    const[Oct,setOct]=useState(0)
    const[Nov,setNov]=useState(0)
    const[Dec,setDec]=useState(0)

    const getJan = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=1)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setJan(newarrqq.length) 
                console.log(Jan)
                
              }
            },
            error => { console.log(error) }
          )
        })
    
      }

      const getFeb = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq1 = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=2)
                    {
                    newarrqq1.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setFeb(newarrqq1.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getMar = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=3)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setMar(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getApr = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=4)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setApr(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getMay = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=5)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setMay(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getJun = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=6)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setJun(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getJul = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=7)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setJul(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getAug = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=8)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setAug(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getSep = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=9)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setSep(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getOct = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=10)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setOct(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getNov = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=11)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setNov(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
      const getDec = () => {
        db.transaction((tx) => {
          tx.executeSql("select * from TASK where completed='1'",
            [],
            (tx, results) => {
    
              const len = results.rows.length;
              if (len > 0) {
    
                let newarrqq = [];
                for (let i = 0; i < len; i++) {
                    let now=new Date();
                    let timetocompare=new Date(results.rows.item(i).endtime)
                    if(timetocompare.getMonth=12)
                    {
                    newarrqq.push({id: results.rows.item(i).id,name: results.rows.item(i).name,time:results.rows.item(i).endtime,isdone: results.rows.item(i).completed,tag:results.rows.item(i).tag});
                    }
                }
                setDec(newarrqq.length) 
              }
            },
            error => { console.log(error) }
          )
        })
    
      }
    return (
        <View style={{ flex: 1 }}>


            <View style={{ height: 300, borderWidth: 1, borderColor: '#a9a9a9', borderRadius: 5, marginHorizontal: 5, marginVertical: 10 }}>
                <Text style={{ color: 'black', marginStart: 20, marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>
                    Nhiệm vụ đã hoàn thành
                </Text>
                <View>
                    <LineChart 
                        data={{
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                            datasets: [
                                {
                                    data: [
                                        Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec
                                    ]
                                }
                            ]
                        }}
                        width={400} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        yAxisInterval={9} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            marginTop:20
                        }}
                    />
                </View>
            </View>


            <Modal animationType="slide"
                transparent={false}
                visible={modalVisible3}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setmodalVisible3(!modalVisible3);
                }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 75 }}>
                        <View style={{ flex: 25 }}>

                        </View>

                        <View style={{
                            flex: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={require('../images/sample.png')}
                                style={{
                                    width: 200,
                                    height: 200,
                                }}
                            >

                            </Image>
                        </View>

                        <View style={{
                            flex: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                                Bạn có cùng các việc hoặc ghi chú mà
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                                phải tạo đi tạo lại nhiều lần? Hãy tạo
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                                mẫu.
                            </Text>

                        </View>

                    </View>

                    <View style={{ flex: 25, flexDirection: 'row' }}>
                        <View style={{ flex: 20 }}>
                            <TouchableOpacity onPress={() => setmodalVisible3(!modalVisible3)}>
                                <Image source={require("../images/icons/back.png")} style={{ height: 60, width: 60, }}>

                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 60 }} />
                        <View style={{ flex: 20 }}>
                            <TouchableOpacity onPress={() => setaddSample(true)}>
                                <Image source={require("../images/icons/addbut.png")} style={{ height: 60, width: 60, }}>

                                </Image>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>


            </Modal>
            <Modal animationType="slide"
                transparent={false}
                visible={addSample}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setaddSample(!addSample);
                }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 15 }}>
                        <View style={{ flex: 50, flexDirection: 'row' }}>
                            <View style={{ flex: 20, justifyContent: 'center' }}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>
                                    Tên tiêu đề
                                </Text>
                            </View>
                            <View style={{ flex: 80 }}>
                                <TextInput placeholder='Tiêu đề' style={{ flex: 1, borderColor: 'black', borderWidth: 1, marginLeft: 10 }} > </TextInput>
                            </View>

                        </View>
                        <View style={{ flex: 50 }}>

                        </View>
                    </View>

                    <View style={{ flex: 70 }}>
                        <View style={{ flex: 20, flexDirection: 'row' }}>
                            <View style={{ flex: 10 }}>
                                <Image source={require("../images/icons/branch.png")} style={{ height: 30, width: 30, }}></Image>

                            </View>
                            <View style={{ flex: 80, }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>Danh sách việc</Text>
                                {
                                    count2 > 0 ?
                                        ((<FlatList
                                            data={minitasks}
                                            renderItem={renderMinitag}
                                            key={cat => cat.id}
                                        />))
                                        : (
                                            <View style={{ flex: 10 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 10 }}>
                                                        <TouchableOpacity onPress={addminitag}>
                                                            <Image source={require("../images/icons/plus.png")} style={{ height: 25, width: 25, tintColor: 'blue' }}></Image>
                                                        </TouchableOpacity>

                                                    </View>
                                                    <View style={{ flex: 70 }}>
                                                        <TextInput style={{ flex: 1, borderColor: 'black', borderWidth: 1 }} value={minitask} onChangeText={setminitask}></TextInput>
                                                    </View>
                                                </View>
                                            </View>



                                        )
                                }
                            </View>
                        </View>

                    </View>




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
                            <TextInput placeholder='Tên thẻ' style={{ flex: 1 }} onChangeText={text => { searchTag(text) }}>

                            </TextInput>


                        </View>
                    </View>
                </View >
                <View style={{ flex: 70 }}>
                    {
                        count > 0 ?
                            ((<FlatList
                                data={tags}
                                renderItem={renderTag}
                                key={cat => cat.id}
                            />))
                            :
                            (<View style={{ flex: 1 }}>
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
                        }} onPress={() => { setmodalAddTag(true) }}>
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


        </View>

    );
}


