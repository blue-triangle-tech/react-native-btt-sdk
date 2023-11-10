import React, { useState, useRef } from 'react';
import { Button,StyleSheet, View, ScrollView, TextInput } from 'react-native';
import {BTTScreenTracker, BTTTimer} from 'react-native-btt-sdk';

function App() {
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
    const result = await BTTTimer.startTimer({
      "btt_page_name":startTimerPageValue
    })
    timerId.current = result.btt_timer_id
  }
  const stopTimer = () => {
    BTTTimer.stopTimer({
      "btt_timer_id": timerId.current
    })
    handleStartTimerPageChange("")
  }

    const startCheckoutTimer = async () => {
       if (startTimerCheckoutPageValue.length === 0) {
         console.log('startTimerPageValue is empty.');
         return;
     }

     const result = await BTTTimer.startTimer({
      "btt_page_name":startTimerCheckoutPageValue
    })
    checkoutTimerId.current = result.btt_timer_id
 }
 
  const stopCheckoutTimer = () => {
     if (addCartValue.length === 0) {
         console.log('addCartValue is empty.');
         return;
     }
      console.log('=========stopCheckoutTimer==============');
      console.log(startTimerCheckoutValue);
 
      var cartValue = addCartValue
     
      BTTTimer.stopTimer({
        "btt_timer_id": startTimerCheckoutValue,
        "btt_cartValue":cartValue
   })
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
  BTTScreenTracker.loadStarted("1","2");
}

const getNetworkApiCall = async () => {
  console.log("Get Network Api Call")
  try {
    const response = await fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2", {
      method: 'GET'})
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
  } catch(err) {
    console.error("API Error: ", err);
  }
}

const postNetworkApiCall = async () => {
  console.log("Post Network Api Call")
  try {
    const response = await fetch("https://postman-echo.com/post", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: 'test',
          password: 'test123',
      })
   })
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
  } catch(err) {
    console.error("API Error: ", err);
  }
}

const putNetworkApiCall = async () => {
  console.log("Put Network Api Call")
  try {
    const response = await fetch("https://postman-echo.com/put", {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: 'React PUT Request Example' })
   })
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
  } catch(err) {
    console.error("API Error: ", err);
  }
}

const patchNetworkApiCall = async () => {
  console.log("Patch Network Api Call")
  try {
    const response = await fetch("https://postman-echo.com/patch", {
      method: 'PATCH',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: 'React PATCH Request Example' })
   })
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
  } catch(err) {
    console.error("API Error: ", err);
  }
}

const deleteNetworkApiCall = async () => {
  console.log("Delete Network Api Call")
  try {
    const response = await fetch("https://postman-echo.com/delete", {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: 'deleteId' })
   })
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
  } catch(err) {
    console.error("API Error: ", err);
  }
}

const get400ApiCall = async () => {
  console.log("Get Network Api Call")
  try {
    const response = await fetch("https://postman-echo.com/status/404", {
      method: 'GET'})
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
  } catch(err) {
    console.error("API Error: ", err);
  }
}

const get302ApiCall = async () => {
  console.log("Get Network Api Call")
  try {
    const response = await fetch("https://postman-echo.com/redirect-to?url=https://postman-echo.com/get?foo1=bar1&foo2=bar2", {
      method: 'GET'})
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
  } catch(err) {
    console.error("API Error: ", err);
  }
}

  return (
    <ScrollView>
   <View style={styles.container}>
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
            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
            <Button title={'Get API Call'} onPress={getNetworkApiCall} />
            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
            <Button title={'Post API Call'} onPress={postNetworkApiCall} />
            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
            <Button title={'Put API Call'} onPress={putNetworkApiCall} />
            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
            <Button title={'Patch API Call'} onPress={patchNetworkApiCall} />
            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
            <Button title={'Delete API Call'} onPress={deleteNetworkApiCall} />
            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
            <Button title={'400 Error API Call'} onPress={get400ApiCall} />
            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
            <Button title={'302 Error API Call'} onPress={get302ApiCall} />
            <View style={styles.lineWrapper}>
            <View style={styles.line} />
            </View>
   </View>
   </ScrollView>

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
