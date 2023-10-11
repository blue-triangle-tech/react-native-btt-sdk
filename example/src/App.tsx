import React, { useState, useRef } from 'react';
import { Button,StyleSheet, View, Text, TextInput } from 'react-native';
import {BTTScreenTracker, BTTTimer} from 'react-native-btt-sdk';

function App() {
 
  var timer:BTTTimer
  var cartTimer:BTTTimer

    const currentDate = new Date();
    const sessionId = formatDate(currentDate);
     const [startTimerPageValue, setStartTimerPageValue] = useState('');
     const [startTimerCheckoutPageValue, setStartTimerCheckoutPageValue] = useState('');
     const [startTimerCheckoutValue, setStartTimerCheckoutValue] = useState('');

     const timerId = useRef(0)
     const checkoutTimerId = useRef(0)



     const handleStartTimerPageChange = (text) => {
         setStartTimerPageValue(text);
     };
     
     const handleStartTimerCheckoutPageChange = (text) => {
         setStartTimerCheckoutPageValue(text);
     };
     
    const [addCartValue, setAddCartValue] = useState('');
     const handleAddCartValue = (text) => {
            setAddCartValue(text);
     };
     
  const startTimer = async () => {
    if (startTimerPageValue.length === 0) {
      console.log('startTimerPageValue is empty.');
      return;
      }
    
    timer = new BTTTimer(startTimerPageValue)
    timer.startTimer()
  }

  const stopTimer = () => {
    timer.setCartValue("12")
    timer.stopTimer()
    handleStartTimerPageChange("")
  }

    const startCheckoutTimer = async () => {
       if (startTimerCheckoutPageValue.length === 0) {
         console.log('startTimerPageValue is empty.');
         return;
     }
     cartTimer = new BTTTimer(startTimerCheckoutPageValue)
     cartTimer.startTimer()
 }
 
  const stopCheckoutTimer = () => {
     if (addCartValue.length === 0) {
         console.log('addCartValue is empty.');
         return;
     }
      console.log('=========stopCheckoutTimer==============');
      console.log(startTimerCheckoutValue);
      console.log(cartTimer);

    cartTimer.setCartValue(addCartValue)
    cartTimer.stopTimer()

     handleAddCartValue("")
     handleStartTimerCheckoutPageChange("")
  }
  
   const errorReport = () => {
     throw new Error()
 }
 
  const anrReport = () => {
     setTimeout(anrReport, 1) // infinite loop
    console.log('anrReport.');
 }

 const screenTracker = () => {
  BTTScreenTracker.viewStart("1","2");
}


  return (
   <View style={styles.container}>

        <View style={styles.lineWrapper}>
      <View style={styles.line} />
      </View>
      <Text>Seesion ID: {sessionId}</Text>
      <View style={styles.lineWrapper}>
      <View style={styles.line} />
      </View>
        <TextInput style={styles.textInput} placeholder="Enter start timer page name"
            onChangeText={handleStartTimerPageChange} value={startTimerPageValue} />
        <Button title={'Start Timer'} onPress={startTimer} />
        <Button title={'Stop Timer'} onPress={stopTimer} />
        <View style={styles.lineWrapper}>
        <View style={styles.line} />
        </View>

            <TextInput style={styles.textInput} placeholder="Enter start checkout timer page name"
            onChangeText={handleStartTimerCheckoutPageChange} value={startTimerCheckoutPageValue} />
            <Button title={'Start Checkout Timer'} onPress={startCheckoutTimer} />
            <TextInput style={styles.textInput} placeholder="Add cart value"
            onChangeText={handleAddCartValue} keyboardType="decimal-pad" value={addCartValue} />
            <Button title={'Stop Checkout Timer'} onPress={stopCheckoutTimer} />

            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
            
            <Button title={'JS ERROR'} onPress={errorReport} />
            <Button title={'ANR'} onPress={anrReport} />

            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
            <Button title={'BTTScreenTracker'} onPress={screenTracker} />

   </View>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    width: 200,
    alignSelf: 'center', // Align the text input in the center
    marginBottom: 10,
  },
  lineWrapper: {
    padding: 10, // Add padding to the line wrapper
  },
  line: {
    width: 400,
    height: 1,
    alignSelf: 'center',
    backgroundColor: 'black', // You can change the color as needed
  },
});

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}`;
};
