
import Tabs from './Tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Addtodo from './Navigation tabs/ActionScreens/Addtodo';
import { useEffect } from 'react';
import * as React from 'react';

const Stack = createNativeStackNavigator();

import SQLite from 'react-native-sqlite-storage';
const db=SQLite.openDatabase({name:"mainDB",location:"Library"},
()=>{},
(error)=>{console.log(error)})

export default function App() {
  useEffect(()=>{
    createdb()
  },[])

  function createdb(){
    db.transaction( tx=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS FORM (id	INTEGER,name TEXT NOT NULL,PRIMARY KEY(id AUTOINCREMENT))"
     )})
     db.transaction( tx=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS TAG (tagname TEXT NOT NULL)"
     )})
     db.transaction( tx=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS TASK (ID	INTEGER,name	TEXT NOT NULL,description	TEXT,priority	TEXT,tag	TEXT,endtime	TEXT NOT NULL,completed	INTEGER NOT NULL,PRIMARY KEY(ID AUTOINCREMENT))"
     )})
     db.transaction( tx=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS loopTASK (ID	INTEGER,name	TEXT NOT NULL,description	TEXT,priority	TEXT,tag	TEXT,time	TEXT NOT NULL,PRIMARY KEY(ID AUTOINCREMENT))"
     )})
     db.transaction( tx=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS loopminiTASK (idmaintask	INTEGER NOT NULL,name	TEXT NOT NULL,FOREIGN KEY(idmaintask) REFERENCES loopTASK(ID))"
     )})
     db.transaction( tx=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS miniTASK (idmaintask INTEGER NOT NULL,name TEXT NOT NULL,FOREIGN KEY(idmaintask) REFERENCES TASK(ID))"
     )})
     db.transaction( tx=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS miniTaskwithform (idform INTEGER NOT NULL,name TEXT NOT NULL,FOREIGN KEY(idform) REFERENCES FORM(id))"
     )})
  }

  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
    
   
  );
}

