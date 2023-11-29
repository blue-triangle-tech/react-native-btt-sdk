import React, { useState, useEffect } from 'react';
import { Button,StyleSheet, View, ScrollView, TextInput, Text } from 'react-native';
import {BTTScreenTracker, BTTTimer} from 'react-native-btt-sdk';
import DataManagement from './DataManagement'
import {BTTConfiguration} from 'react-native-btt-sdk';

function App() {
 
  var timer:BTTTimer
  var cartTimer:BTTTimer
  var manualscreenTracker:BTTScreenTracker

  const [sessionId, setSessionId] = useState(null);

     const [startTimerPageValue, setStartTimerPageValue] = useState('');
     const [startTimerCheckoutPageValue, setStartTimerCheckoutPageValue] = useState('');
     const [startTimerCheckoutValue, setStartTimerCheckoutValue] = useState('');
   
     useEffect(() => {
      // Call the API function when the component mounts
      getSessionId()
    }, []);

    const getSessionId = async () => {
      try{
        const sID =  await BTTConfiguration.getSessionId();
        console.log("sID", sID)
        setSessionId(sID)
      }
      catch{}
    }


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
    await timer.startTimer()

    timer.stopTimer()
    handleStartTimerPageChange("")
  }

  const stopTimer = () => {
    if(timer != undefined){
      timer.stopTimer()
      handleStartTimerPageChange("")
    }
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
 
//   const anrReport = async () => {
//     console.log('=========anrReport==============');

//     await sleep(10000)
//  }

const anrReport = () => {
  //setTimeout(anrReport, 1) // infinite loop
  for (let i = 0; i < 1000000000; i++) {
    // Simulating a long-running synchronous operation
    const value = i * Math.random();
  }
}

 const screenTracker = () => {
  BTTScreenTracker.viewStart("1","2");
}

const manualTrackerStart = () => {

  if(manualscreenTracker == undefined){
    manualscreenTracker = new BTTScreenTracker("ManualTracker")
  }

  manualscreenTracker.startTracking()
}
const manualTrackerStop = () => {
  manualscreenTracker.stopTracking()
}

const getXHRNetwork = async () => {

 const timer =  new BTTTimer("getXHRNetwork")
 timer.startTimer()

  const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://postman-echo.com/get?foo1=bar1&foo2=bar2', true);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log('Data:', data);
    } else {
      console.error('HTTP error! Status:', xhr.status);
    }

    timer.stopTimer()
  }
};

xhr.send();
}

const getNetworkApiCall = async () => {
  console.log("Get Network Api Call")
  const timer =  new BTTTimer("getNetworkApiCall")
  timer.startTimer()

  try {
    const response = await fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2", {
      method: 'GET'})
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
    timer.stopTimer();
  } catch(err) {
    console.error("API Error: ", err);
    timer.stopTimer();
  }
}

const postNetworkApiCall = async () => {
  console.log("Post Network Api Call")
  const timer =  new BTTTimer("postNetworkApiCall")
  timer.startTimer()
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
    timer.stopTimer()
  } catch(err) {
    console.error("API Error: ", err);
    timer.stopTimer()
  }
}

const putNetworkApiCall = async () => {
  console.log("Put Network Api Call")
  const timer =  new BTTTimer("putNetworkApiCall")
  timer.startTimer()
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
    timer.stopTimer()
  } catch(err) {
    console.error("API Error: ", err);
    timer.stopTimer()
  }
}

const patchNetworkApiCall = async () => {
  const timer =  new BTTTimer("patchNetworkApiCall")
  timer.startTimer()
  
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
    timer.stopTimer()
  } catch(err) {
    console.error("API Error: ", err);
    timer.stopTimer()
  }
}

const deleteNetworkApiCall = async () => {
  console.log("Delete Network Api Call")
  const timer =  new BTTTimer("deleteNetworkApiCall")
  timer.startTimer()
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
    timer.stopTimer()
  } catch(err) {
    console.error("API Error: ", err);
    timer.stopTimer()
  }
}

const get400ApiCall = async () => {
  console.log("Get Network Api Call")
  const timer =  new BTTTimer("get400ApiCall")
  timer.startTimer()
  try {
    const response = await fetch("https://postman-echo.com/status/404", {
      method: 'GET'})
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
    timer.stopTimer()
  } catch(err) {
    console.error("API Error: ", err);
    timer.stopTimer()
  }
}

const get302ApiCall = async () => {
  console.log("Get Network Api Call")
  const timer =  new BTTTimer("get400ApiCall")
  timer.startTimer()
  try {
    const response = await fetch("https://postman-echo.com/redirect-to?url=https://postman-echo.com/get?foo1=bar1&foo2=bar2", {
      method: 'GET'})
    console.log("API Response Received: ", response);
    const data = await response.json();
    console.log('Data:', data);
    timer.stopTimer()
  } catch(err) {
    console.error("API Error: ", err);
    timer.stopTimer()
  }
}

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.text}>Session Id: {sessionId}</Text>
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

            {/*<TextInput style={styles.textInput} placeholder="Enter start checkout timer page name"
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
  </View>*/}
            <Button title={'Get XML API Call'} onPress={getXHRNetwork} />
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
            <Button title={'Manual Screen Tracker Start'} onPress={manualTrackerStart} />
            <Button title={'Manual Screen Tracker Stop'} onPress={manualTrackerStop} />
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
  text: {
    fontSize: 20,
  },
});
