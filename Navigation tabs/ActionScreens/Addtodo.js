import * as React from 'react';
import { Text, View,StyleSheet,TextInput,TouchableOpacity,Button,FlatList} from 'react-native';
import { Dimensions} from 'react-native'
import { ScrollView } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Custombutton from './Custom/Custombutton';
import Custompicktimeview from './Custom/Custompicktimeview';
import Customsavebutton from './Custom/Customsavebutton';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import Customitemtype from './Custom/Customitemtype';
import ActionButton from 'react-native-action-button';
//import { Dimensions} from 'react-native'









const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'black',
    },
  });





export default function Addtodo() {
    const [day, setDay] = useState(new Date());
    const [date, setDate] = useState("Chọn ngày");
    const [time,setTime]=useState("Chọn thời gian")
    const [height,setheight]=useState(0)   
    const [height1,setheight1]=useState(0)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [keynum, setkeynum] = useState(0);
    const [itemtodolist,setitemtodolist]=useState("");
    const [mainstate,setmainstate]=useState({name:"",des:"",day:"",list:[],type:"Không"})



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDay(currentDate);
        if(event.type=="set")
        {   let tempdate=new Date(currentDate)
            let fdate=tempdate.toLocaleDateString()
            let ftime=tempdate.toLocaleTimeString()
            setDate(fdate);
            setTime(ftime);
    
            setmainstate({...mainstate,day:tempdate.toLocaleString()})
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
        
            
        <ScrollView style={{backgroundColor:'#0C0C0C',flex:1}}>
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
            <Custombutton Text={"Độ ưu tiên:     "+mainstate.type}  
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
                            setitemtodolist("")    
                        }}
                        renderIcon={active=>active?(<Icon name="done" style={styles.actionButtonIcon}/>):(<Icon name="done" style={styles.actionButtonIcon}/>)}
                        >
                           
                        </ActionButton>

                    </View>
                </View>
            </Modal>

                     
            
            
            
            
            
            
            
            
            
            
            
            <Custompicktimeview date={date} 
            time={time} 
            pickdate={()=>{showMode('date')}} 
            picktime={()=>{showMode('time');}}
            />
            <Custombutton Text="Danh sách việc" onPress={()=>{setModalVisible1(true)}}/>
            <Custombutton Text="Mẫu" onPress={()=>{}}/>
            <Customsavebutton onPress={()=>{}}/>
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

