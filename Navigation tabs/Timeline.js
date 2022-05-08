
import * as React from 'react';
import { Text, View,StyleSheet} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons'




export default function Timeline({Navigation}) {
  
    
    return(
     <View style={{flex:1}}>
       
        <ActionButton buttonColor="#3498db" >
          <ActionButton.Item buttonColor='#3498db' title="Việc định kì" onPress={() => {}}>
            <Icon name="loop" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Việc cần làm" onPress={() => {alert("hello")}}>
            <Icon name="calendar-today" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
          


     </View>

    );

}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'black',
  },
});