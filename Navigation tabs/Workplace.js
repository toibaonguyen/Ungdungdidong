import * as React from 'react';
import { Text, View, Image, TouchableOpacity, Button, TextInput, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import ButtonUI from '../Navigation tabs/ActionScreens/Custom/UIbutton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../App';
import Modal from "react-native-modal";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Addtodo from './ActionScreens/Addtodo';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ditmemetvaicac from './ActionScreens/Custom/Ditmemetvaicac1';

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
    const [itemlist, setitemlist] = useState([]);
    const [count1, Setcount1] = useState()
    const [fullyviewitemwithid, setfullyviewitemwithid] = useState()
    const [forms, setforms] = useState([])
    const [isvimodal3, setisvimodal3] = useState(false);
    const [count2, Setcount2] = useState()
    const [minitask, setminitask] = useState("")
    const [minitasks, setminitasks] = useState([])
    const [id, setid] = useState(0)
    const [ID, setID] = useState("")
    const [idn, setidn] = useState()
    function concainit(id) {
        setidn(id);
        setisvimodal3(true);

    }
    const seemore = (id) => {
        setfullyviewitemwithid(id)
        setisvimodal2(true)

    }
    const [isvimodal2, setisvimodal2] = useState(false);
    const [mainstate, setmainstate] = useState({ list: [] })
    const [itemtodolist, setitemtodolist] = useState("");
    const [itemform, setitemform] = useState("");
    const [keynum, setkeynum] = useState(0);
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

    function deleteitem() {
        db.transaction(tx => {
            tx.executeSql("delete from minitask where idmaintask=?",
                [idn],
                () => { console.log("delete complete") },
                error => console.log(error))


        })
        db.transaction(tx => {
            tx.executeSql("delete from TASK where id=?",
                [idn],
                () => { console.log("delete complete 1") },
                error => console.log(error))


        })
        setitemlist(itemlist.filter(i => i.id !== idn))
        setisvimodal3(false);

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

    const getForm = () => {
        db.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM FORM',
                [],
                (txn, res) => {
                    console.log('lay du lieu thanh cong')
                    let len = res.rows.length;
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ name: item.name, id: item.id })
                            console.log(results.length)
                        }
                        Setcount2(results.length)
                        setforms(results)


                    }
                },
                error => { console.log('loi khong lay duoc du lieu') }
            )
        })
    }

    async function savedt() {
        SQLite.enablePromise(true)
        let meme = [];
        let num;

        let leng = mainstate.list.length;

        await db.transaction(async (tx) => {
            await tx.executeSql("select max(id) as maxid from FORM",
                [],
                (tx, results) => {
                    num = results.rows.item(0).maxid + 1;
                    { console.log("maxid:" + num); }
                },
                error => { alert("lỗi r ông cháu ơi") }
            )
        })
        await db.transaction(async (tx) => {

            await tx.executeSql("insert into FORM (id,name) values(?,?)",
                [num, itemform],
                (tx, results) => { alert("Nhập dữ liệu thành công"); setitemform(""); getForm() },
                error => { alert("lỗi r ông cháu ơi") }
            )
        })


        if (leng > 0) {
            let vq = "insert into miniTaskwithform VALUES "
            for (let i = 0; i < leng; i++) {
                meme.push(num, mainstate.list[i].value);
                vq += '(?,?)';
                if (i != leng - 1) {
                    vq += ','
                }
            }
            console.log(meme);
            db.transaction(
                async (tx) => {
                    await tx.executeSql(vq,
                        meme,
                        (tx, results) => { console.log("Chèn minitask thành công") },
                        error => { console.log(error) }
                    )
                })

        }

    }




    function giveID() {
        db.transaction(txn => {
            txn.executeSql(
                "SELECT * FROM FORM"),
                [],
                (txn, ress) => {
                    console.log('lay id duoc ne', id)
                    let len = ress.rows.length;
                    setid(len + 1)
                }, error => { console.log('lay id ko dc') }
        })
        return id;
    }
    const getminitask = (ID) => {
        db.transaction(txn => {

            txn.executeSql(

                "SELECT * FROM miniTASK where idmaintask='?'",
                [ID],
                (txn, res) => {
                    console.log('lay du lieu thanh cong form')
                    let len = res.rows.length;
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ tagname: item.tagname })
                            console.log(results.length)
                        }
                        Setcount3(results.length)
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

            txn.executeSql('INSERT INTO miniTASK (idmaintask,name) VALUES (?,?)', [id, minitask],
                () => {
                    console.log(id, minitask)

                    setID(id)
                    getminitask(id)
                    setminitask("")

                }

                , () => { alert(id + 'hien gio') })
        })
    }

    const deleteItem = (id) => {

        setmainstate({
            ...mainstate,
            list: mainstate.list.filter(item => item.key !== id)
        })

    }

    function getComplete() {

        getFeb()
        getMar()
        getApr()
        getMay()
        getJun()
        getJul()
        getAug()
        getSep()
        getOct()
        getNov()
        getDec()
    };

    useEffect(async () => {
        await getTag()
        await getForm()
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
        db.transaction((tx) => {
            tx.executeSql("select * from TASK where completed='1'",
                [],
                (tx, results) => {

                    const len = results.rows.length;
                    if (len > 0) {

                        let newarrqq = [];

                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare = 1) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
                            }
                        }
                        setitemlist(newarrqq);
                        console.log(itemlist);
                        console.log(newarrqq);
                        console.log(len);


                        setdk(itemlist.length > 0);
                        console.log(dk)
                    }
                },
                error => { console.log(error) }
            )
        })

    }, [])
    const [dk, setdk] = useState(false)
    function deleteFORM(id) {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM FORM WHERE id=?', [id],
                () => { console.log('xoa thanh cong') },
                error => { console.log('xoa that bai') })
        }

        )
        setforms(forms.filter(i => i.id !== id))

        db.transaction(tx => {
            tx.executeSql('DELETE FROM miniTaskwithform WHERE idform=?', [id],
                () => { console.log('xoa thanh cong minitask') },
                error => { console.log('xoa that bai mini') })
        }

        )
    }

    function deleteTag(tagname) {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM TAG WHERE tagname=?', [tagname],
                () => { console.log('xoa that bai') },
                error => { console.log('xoa thanh cong') })
        }

        )
        setTags(tags.filter(i => i.tagname !== tagname))
    }


    const renderform = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderColor: "#ddd", flexDirection: "row" }}>
                <View style={{ flex: 90 }}>
                    <Text>{item.name}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        deleteFORM(item.id)

                    }}>
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
    const [Jan, setJan] = useState(0)
    const [Feb, setFeb] = useState(0)
    const [Mar, setMar] = useState(0)
    const [Apr, setApr] = useState(0)
    const [May, setMay] = useState(0)
    const [Jun, setJun] = useState(0)
    const [Jul, setJul] = useState(0)
    const [Aug, setAug] = useState(0)
    const [Sep, setSep] = useState(0)
    const [Oct, setOct] = useState(0)
    const [Nov, setNov] = useState(0)
    const [Dec, setDec] = useState(0)

    const getJan = () => {
        db.transaction((tx) => {
            tx.executeSql("select * from TASK where completed='0'",
                [],
                (tx, results) => {

                    const len = results.rows.length;
                    let newarrqq = [];
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {

                            let timetocompare = new Date(results.rows.item(i).endtime)

                            if (timetocompare.getMonth() == 0) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
                            }
                        }
                        setJan(newarrqq.length)
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

                    const len = results.rows.length; let newarrqq1 = [];
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {

                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 1) {
                                newarrqq1.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 2) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 3) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 4) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 5) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 6) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 7) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 8) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth == 9) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 10) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                    let newarrqq = [];
                    const len = results.rows.length;
                    if (len > 0) {


                        for (let i = 0; i < len; i++) {
                            let now = new Date();
                            let timetocompare = new Date(results.rows.item(i).endtime)
                            if (timetocompare.getMonth() == 11) {
                                newarrqq.push({ id: results.rows.item(i).id, name: results.rows.item(i).name, time: results.rows.item(i).endtime, isdone: results.rows.item(i).completed, tag: results.rows.item(i).tag });
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
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 85 }}>
                        <TouchableOpacity onPress={() => { setmodalVisible(!modalVisible) }}>

                            <Text style={{ color: 'black', marginStart: 20, marginTop: 10, fontWeight: 'bold', fontSize: 16 }} >
                                Nhiệm vụ đã hoàn thành
                            </Text>
                        </TouchableOpacity>


                        <Modal animationType="slide"
                            transparent={false}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setmodalVisible(!modalVisible);
                            }}>
                                <View style={{flex:10}}>
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                >

                                    <Text style={styles.headerText}>Nhiệm Vụ đã hoàn thành</Text>
                                </View>

                              </View>
                              <View style={{flex:80}}>



                              {
                                itemlist.length > 0
                                    ?
                                    <View>
                                                             
                                       <FlatList data={forms}
                                                renderItem={renderform}
                                                key={cat => cat.id} style={{flex:1}}> 

                                            </FlatList>
                                       
                                        <FlatList style={{ marginTop: 5 }}
                                            data={itemlist}
                                            keyExtractor={item => item.id}
                                            renderItem={({ item }) => (
                                                <View key={item.id}>
                                                    <Ditmemetvaicac name={item.name} id={item.id} time={item.time} isdone={item.isdone}
                                                        onPress={() => { seemore(item.id) }}
                                                        onLongPress={() => { concainit(item.id) }}


                                                    />
                                                </View>
                                            )
                                            } />
                 

                                    </View>
                                    : <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                                        <Image source={require('../images/reading.png')}
                                            style={{
                                                width: 150,
                                                height: 150,
                                            }} />
                                        <Text>Không có công việc nào cần làm!</Text>
                                        
                                    </View>


                            }
                              </View>
                              <View style={{ flex: 15,marginTop:10}}>
                                            <TouchableOpacity onPress={() => setmodalVisible(!modalVisible)}>
                                                <Image source={require("../images/icons/back.png")} style={{ height: 60, width: 60, }}>

                                                </Image>
                                            </TouchableOpacity>
                                        </View>
                            
                        </Modal>






                    </View>

                    <View style={{ flex: 15, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => getComplete()} >
                            <Image source={require("../images/icons/refresh.png")}
                                style={{ height: 25, width: 25 }}>

                            </Image>
                        </TouchableOpacity>

                    </View>

                </View>

                <View>
                    <LineChart
                        data={{
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            datasets: [
                                {
                                    data: [
                                        Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
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
                            marginTop: 20
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
                        {count2 > 0 ?
                            (<View>

                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                >

                                    <Text style={styles.headerText}>Mẫu</Text>
                                </View>


                                <FlatList data={forms}
                                    renderItem={renderform}
                                    key={cat => cat.id}>

                                </FlatList>
                            </View>
                            )
                            : (
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 25 }}>
                                        <View style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {/* icon for the menu */}
                                            <Text style={styles.headerText}>Mẫu</Text>
                                        </View>
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
                            )}


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
                <View style={{ flex: 1, backgroundColor: "white", borderColor: "black", borderWidth: 1 }}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'black' }}>

                        <TextInput style={{ borderRadius: 10, borderColor: "black", borderWidth: 1, width: "80%", backgroundColor: "white" }}
                            placeholder="Nhập tên mẫu..."
                            maxLength={40}
                            onChangeText={text => setitemform(text)} />
                    </View>
                    <View style={{ flex: 1, alignItems: "center", flexDirection: "row", borderBottomColor: "black", borderBottomWidth: 1, backgroundColor: "black" }}>
                        <TextInput style={{ borderRadius: 10, marginLeft: 10, marginRight: 10, borderColor: "black", borderWidth: 1, width: "75%", backgroundColor: "white" }}
                            placeholder="Nhập việc cần làm..."
                            maxLength={40}
                            onChangeText={text => setitemtodolist(text)} />
                        <Button title='Thêm' onPress={() => {
                            if (itemtodolist == "") {
                                return;
                            }
                            setmainstate(
                                { ...mainstate, list: [...mainstate.list, { key: keynum, value: itemtodolist }] });
                            setkeynum(keynum + 1);

                        }} />
                    </View>
                    <View style={{ flex: 5 }}>
                        <FlatList data={mainstate.list}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{ borderRadius: 10, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "black", height: 50, margin: 10 }}
                                    onPress={() => deleteItem(item.key)}
                                >
                                    <Text>{item.value}</Text>
                                </TouchableOpacity>)}
                        />
                        <ActionButton buttonColor='#3498db'
                            onPress={() => {
                                if (itemform != "") {
                                    setaddSample(false);
                                    setitemtodolist("");
                                    savedt();
                                }
                                else alert("Chưa nhập tên mẫu")

                            }}
                            renderIcon={active => active ? (<Icon name="done" style={styles.actionButtonIcon} />) : (<Icon name="done" style={styles.actionButtonIcon} />)}
                        >

                        </ActionButton>

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
                        <View style={{ flex: 80 }}>
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


const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'black',
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    }
});