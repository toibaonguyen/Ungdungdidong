import * as React from 'react';
import { Text, View,StyleSheet,TextInput,TouchableOpacity,Button,FlatList} from 'react-native';

import { ScrollView,Dimensions } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Custombutton from './Custom/Custombutton';
import Custompicktimeview from './Custom/Custompicktimeview';
import Customsavebutton from './Custom/Customsavebutton';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import Customitemtype from './Custom/Customitemtype';
import ActionButton from 'react-native-action-button';
//database right here

import SQLite from 'react-native-sqlite-storage';
var db=SQLite.openDatabase({name:"mainDB.sqlite3", createFromLocation:1,location:"Library"},
()=>{},
(error)=>{alert(error)})





const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'black',
    },
  });

export default function Addtodo1(props) {
    const [day, setDay] = useState(new Date());
    const [date, setDate] = useState("Chọn ngày");
    const [time,setTime]=useState("Chọn thời gian")
    const [height,setheight]=useState(0)   
    const [height1,setheight1]=useState(0)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [keynum, setkeynum] = useState(0);
    const [itemtodolist,setitemtodolist]=useState("");
    const [mainstate,setmainstate]=useState({name:"",des:"",day:"",list:[],type:"Không",tag:""})
    const [formlist,setformlist]=useState([])
    const [taglist,settaglist]=useState([])




    async function savedt(){
        SQLite.enablePromise(true)
        let meme=[];
        let num;
        var bigqery;
        
        let leng=mainstate.list.length;
        
      
        await db.transaction(async(tx)=>{
            
            await tx.executeSql("insert into loopTASK (name,description,priority,tag,time) values(?,?,?,?,?)",
            [mainstate.name,mainstate.des,mainstate.type,mainstate.tag,mainstate.day],
            (tx,results)=>{alert("Nhập dữ liệu thành công");},
            error=>{alert("lỗi r ông cháu ơi")}
            )      
        })
        await db.transaction(async(tx)=>{
            await tx.executeSql("select max(id) as maxid from loopTASK",
            [],
            (tx,results)=>{num=results.rows.item(0).maxid;
            console.log("maxid:"+ num);},
            error=>{alert("lỗi r ông cháu ơi")}
            )    
        })
        
       
        if(leng>0)
        {
            let vq="insert into loopminiTASK VALUES "
            for(let i=0;i<leng;i++)
            {
              meme.push(num,mainstate.list[i].value);
              vq+='(?,?)';
              if(i!=leng-1)
              {
                vq+=','
              }
            }
            console.log(meme);
            db.transaction(
                async(tx)=>{
                    await tx.executeSql(vq,
                    meme,
                    (tx,results)=>{console.log("Chèn minitask thành công")},
                    error=>{console.log(error)}
                    )
                })

        }


 /*
       try{
           alert("okok")
            //alert("ok")
        await db.transaction(async(tx)=>{
            await tx.executeSql("insert into TASK (name,description,priority,tag,endtime,completed) values(?,?,?,?,?,?)",
            [mainstate.name,mainstate.des,mainstate.type,mainstate.tag,mainstate.day,0],
            
            )
        })

        if(mainstate.list.length>0)
        {
            let ij;
            await db.transaction(async(tx)=>{
                await tx.executeSql("select max(id) as maxx from TASK",
                [],
                (tx,results)=>{
                    ij=results.rows.item(0).maxx;
                },
                error=>{alert(error)}
                
                )
            })

            for(let m=0;m<mainstate.list.length;m++)
            {
                await db.transaction(async(tx)=>{
                    await tx.executeSql("insert into miniTASK values(?,?)",
                    [ij,mainstate.list[m]]
                    
                    
                    )
                })
            }
            
        }
       }
       catch(error)
       {
           alert(error)
       }*/
       
    }


    const getform=async()=>{
        SQLite.enablePromise(true)
 
        //alert("ok")
        await db.transaction(async(tx)=>{
            await tx.executeSql("select id, name from FORM",
            [],
            (tx,results)=>{
                const len=results.rows.length;
                //setformlist([]);
                //alert(len)
                
                if(len>0){
                    let newarr=[]
                    for(let i=0;i<len;i++){
                        newarr.push({id: results.rows.item(i).id,name: results.rows.item(i).name})
                    }
                    setformlist(newarr);
                }
                
            },
            (error)=>{alert(error)}
            )
        })
    }

  
    const setlistfromform=async(id)=>{

        //alert(id)
       
            SQLite.enablePromise(true)
            await db.transaction(async(tx)=>{
                await tx.executeSql("SELECT idform,name from miniTaskwithform where idform=?",
                [id],
                (tx,results)=>{
                    
                    
                    const len=results.rows.length;
                    setmainstate({...mainstate,list:[]});
                 
                    if(len>0){
                        
                        setkeynum(0);
                        let newarray=[];

                        let num=0;
                        for(let i=0;i<len;i++){
                            
                            newarray.push({key:i,value:results.rows.item(i).name});
                            num=i;
                        }
                        
                        setmainstate({...mainstate,list:newarray})
                        setkeynum(num+1)

                        
                    }
                },
                error=>{alert("error")}
                )
            })
           
        
    }

    const gettag=async()=>{
        SQLite.enablePromise(true)
 
        //alert("ok")
        await db.transaction(async(tx)=>{
            await tx.executeSql("select tagname from TAG",
            [],
            (tx,results)=>{
          
                
                const len=results.rows.length;
             
                
                if(len>0){
                    let newarr=[]
                    for(let i=0;i<len;i++){
                        newarr.push({tagname: results.rows.item(i).tagname})
                    }
                    settaglist(newarr);
                }
                
            },
            (error)=>{alert(error)}
            )
        })
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDay(currentDate);
        if(event.type=="set")
        {   let tempdate=new Date(currentDate.toString())
           
            let fdate=tempdate.toLocaleDateString()
            let ftime=tempdate.toLocaleTimeString()
            
            setDate(fdate);
            setTime(ftime);

           
    
            setmainstate({...mainstate,day:currentDate.toString()})
        }
        
        
     
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
 
    const wowy=()=>{
        if(itemtodolist!=""){
            setmainstate({...mainstate,list:[...mainstate.list,{key:keynum,value:itemtodolist}]});
            setkeynum(keynum+1);
        }

    };
    const deleteItem = (id) => {

        setmainstate({...mainstate,
         list: mainstate.list.filter(item => item.key !== id)
        })
     
     }



    return(
        
            
        <ScrollView style={{backgroundColor:'#0C0C0C',flex:1,height:Dimensions.get("screen").height,width:Dimensions.get("screen").width}}>
            <TextInput 
            onChangeText={text=>{setmainstate({...mainstate,name:text})}}
            multiline = {true}
            placeholder='Tên việc cần làm' 
            placeholderTextColor='gray' 
            style={{height: Math.max(40,height),marginTop:20,color:'white',borderWidth:1,borderBottomColor:'gray',fontSize:25}}
            maxLength={Dimensions.get("screen").width-24}
            onContentSizeChange={(event) => {
                setheight(event.nativeEvent.contentSize.height)
            }}/>
            <TextInput 
            multiline ={true}
            onChangeText={text=>{setmainstate({...mainstate,des:text})}}

            placeholder='Bạn có muốn thêm chi tiết không?' 
            placeholderTextColor='gray' 
            style={{height: Math.max(40,height1),color:'white',fontSize:20}}
            maxLength={Dimensions.get("screen").width-24}
            onContentSizeChange={(event) => {
                setheight1(event.nativeEvent.contentSize.height)
            }}/>
            <Custombutton icon="date-range" Text={"Độ ưu tiên:     "+mainstate.type}  
             onPress={()=>{setModalVisible(true)}}/>
            <Modal
             isVisible={isModalVisible}
            >
                <View style={{ flex: 1 }}>
                 
                    <View style={{ flex: 5,alignItems:"center",justifyContent:"center"}}>
                        <Customitemtype Text="Khẩn cấp" color="red" onPress={()=>{setmainstate({...mainstate,type:"Khẩn cấp"}); setModalVisible(false)}}/>
                        <Customitemtype Text="Cao" color="orange" onPress={()=>{setmainstate({...mainstate,type:"Cao"}); setModalVisible(false)}}/>
                        <Customitemtype Text="Vừa" color="yellow" onPress={()=>{setmainstate({...mainstate,type:"Vừa"});setModalVisible(false)}}/>
                        <Customitemtype Text="Thấp" color="green" onPress={()=>{setmainstate({...mainstate,type:"Thấp"});setModalVisible(false)}}/>
                        <Customitemtype Text="Không" color="white" onPress={()=>{setmainstate({...mainstate,type:"Không"});setModalVisible(false)}}/>                       
                    </View>
                </View>
            </Modal>
            <Modal
             isVisible={isModalVisible1}
             hideModalContentWhileAnimating={true}
             animationIn={"fadeIn"}
             animationOut={"fadeOut"}
            >
                <View style={{ flex: 1,backgroundColor:"white",borderRadius:10,borderColor:"black",borderWidth:1 }}>
                 
                    <View style={{ flex: 1,alignItems:"center",justifyContent:"center",flexDirection:"row",borderBottomColor:"black",borderBottomWidth:1,backgroundColor:"black"}}>
                            <TextInput style={{borderRadius:10,marginLeft:10,marginRight:10,borderColor:"black",borderWidth:1,width:"80%",backgroundColor:"white"}} 
                            placeholder="Nhập việc cần làm..."
                            maxLength={40}
                            onChangeText={text=>setitemtodolist(text)}/>
                            <Button title='Thêm' onPress={()=>{
                                if(itemtodolist=="")
                                {
                                    return;
                                }
                                setmainstate(
                                    {...mainstate,list:[...mainstate.list,{key:keynum,value:itemtodolist}]});
                                setkeynum(keynum+1);
                                
                                 }}/>       
                    </View>
                    <View style={{flex:5}}>
                        <FlatList data={mainstate.list}
                        keyExtractor={(item)=>item.key}
                        renderItem={({item})=>(
                        <TouchableOpacity 
                        style={{borderRadius:10,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"black",height:50,margin:10}}
                        onPress={()=>deleteItem(item.key)}
                        >
                            <Text>{item.value}</Text>
                        </TouchableOpacity>)}
                        />
                        <ActionButton buttonColor='#3498db' 
                        onPress={() => 
                        {
                            setModalVisible1(false);
                            setitemtodolist("");    
                        }}
                        renderIcon={active=>active?(<Icon name="done" style={styles.actionButtonIcon}/>):(<Icon name="done" style={styles.actionButtonIcon}/>)}
                        >
                           
                        </ActionButton>

                    </View>
                </View>
            </Modal>
            
            <Modal
             isVisible={isModalVisible2}
             hideModalContentWhileAnimating={true}
             animationIn={"fadeIn"}
             animationOut={"fadeOut"}
            >
            <View style={{borderColor:"white",borderWidth:1,alignItems:"center"}}>
                
                <FlatList data={formlist}
                 renderItem={({item})=>(
                   <Custombutton Text={item.name} 
                   onPress={()=>{
                       setlistfromform(item.id);
                       setformlist([]);
                       setModalVisible2(false);
                       
                }}/>
            )}/>
                
                <ActionButton buttonColor='#3498db' 
                        onPress={() => 
                        {
                            setformlist([]);
                            setModalVisible2(false);  
                        }}
                        renderIcon={active=>active?(<Icon name="done" style={styles.actionButtonIcon}/>):(<Icon name="done" style={styles.actionButtonIcon}/>)}
                        >
                           
                        </ActionButton>
                
           
            </View>
               
            </Modal>
            <Modal
             isVisible={isModalVisible3}
             hideModalContentWhileAnimating={true}
             animationIn={"fadeIn"}
             animationOut={"fadeOut"}
            >
            <View style={{borderColor:"white",borderWidth:1,alignItems:"center"}}>
                
                <FlatList data={taglist}
                 renderItem={({item})=>(
                   <Custombutton Text={item.tagname} 
                   onPress={()=>{
                       setmainstate({...mainstate,tag:item.tagname})
                       settaglist([]);
                       setModalVisible3(false);
                       
                }}/>
            )}/>
                
                <ActionButton buttonColor='#3498db' 
                        onPress={() => 
                        {
                            settaglist([]);
                            setModalVisible3(false);  
                        }}
                        renderIcon={active=>active?(<Icon name="done" style={styles.actionButtonIcon}/>):(<Icon name="done" style={styles.actionButtonIcon}/>)}
                        >
                           
                        </ActionButton>
                
           
            </View>
               
            </Modal>

                     
            
            
            
            
            
            
            
            
            
            
            
            <Custompicktimeview date={date} 
            time={time} 
            pickdate={()=>{showMode('date')}} 
            picktime={()=>{showMode('time');}}
            />
            <Custombutton Text="Danh sách việc" onPress={()=>{setModalVisible1(true)}}/>
            <Custombutton Text="Mẫu" onPress={()=>{ getform(); setModalVisible2(true)}}/>
            <Custombutton Text={"Thẻ  "+mainstate.tag }onPress={()=>{gettag(); setModalVisible3(true)}}/>
            <Customsavebutton text="Lưu" 
            onPress={()=>{
                if(mainstate.name==""||mainstate.day=="")
                {
                    alert("Bạn chưa nhập việc cần làm!");
                    return;
                }
                
                savedt();
                }
            }
             mgtop={50}/>
            <Customsavebutton text="Xong" onPress={props.onPress} mgtop={10}/>
            {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={day}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            />
            )}
        




           


            
            


          
        </ScrollView>



    )
}

