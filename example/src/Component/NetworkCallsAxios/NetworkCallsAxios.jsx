import React from 'react';
import {Alert, Text, ToastAndroid, View} from 'react-native';
import {Pressable} from "react-native";
import {StyleSheet} from "react-native";
import axios from "axios";

const handleGetRequest = () => {
    console.log("Get Request");
    axios.get("https://dummyjson.com/posts/1").then(res => {
        console.log("response : ", res.data.body);
        ToastAndroid.show("Success Get Request", ToastAndroid.LONG);
    })
        .catch(err => {
            console.log("error while making get request: ", err);
            Alert.alert("Error", err.message);
        })
}
const handlePostRequest = () => {
    console.log("Post Request");
    axios.post("https://dummyjson.com/users/add", {
        firstName: 'sandesh',
        lastName: 'pawar',
        age: 200
    }).then(res => {
        console.log("response : ");
        console.log(`User Added Successfully: \nFirst Name:  ${res.data.firstName} \nLast Name: ${res.data.lastName}\nAge : ${res.data.age}`);

        ToastAndroid.show("Success post request", ToastAndroid.SHORT);
    }).catch(err => {
        console.log("error while making post request: ", err);
        Alert.alert("Error", err.message);
    })

}
const handleAPINotFound = () => {
    console.log("404 API NOT FOUND");
    axios.get("https://dummyjson.com/unknwon/").then(res => {
        console.log("response : ", res.data)
    }).catch(err => {
        console.log("error while making get request: ", err);
        Alert.alert("Error 404 : API Not Found", err.message);
    })
}

const handleFailureAtDNS = () => {
    console.log("Failure At DNS");
    axios.get("https://ThisDomainDoesNotExist.com/api/").then(res => {
        console.log("response : ", res.data)
    }).catch(err => {
        console.log("error while making get request: ", err);
        Alert.alert("DNS Failure: ", err.message);
    })
}
const handleFailingAtConnection = () => {
    console.log("Failing At Connection");
    axios.get("https://thisServerIsDown.com").then(res => {
        console.log("response : ", res.data)
    }).catch(err => {
        console.log("Error While making connection Request: ", err);
        Alert.alert("Connection Failure: ", err.message);
    })
}

const handleConnectionTimeOut = () => {
    axios.get("https://thisServerIsDown.com", {timeout: 2000}).then(res => {
        console.log("response : ", res.data)

    }).catch(err => {
        console.log("Connection Timout : ", err);
        Alert.alert("Connection Timeout:", err.message);
    })
}

const handleFailingAtRequest = () => {
    axios.get("https://thisServerIsDown.com").then(res => {
        console.log("response : ", res.data)

        }
    ).catch(err => {
        console.log("Failed At Request : ", err);
        Alert.alert("Failed At Request:", err.message);
    })
}

const NetworkCallsAxios = () => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={handleGetRequest}>
                <Text style={styles.btnText}>Make Get Request</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handlePostRequest}>
                <Text style={styles.btnText}>Make Post Request</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleAPINotFound}>
                <Text style={styles.btnText}>404 API NOT FOUND</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleFailureAtDNS}>
                <Text style={styles.btnText}>Failure At DNS</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleFailingAtConnection}>
                <Text style={styles.btnText}>Failing  At Connection</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleConnectionTimeOut}>
                <Text style={styles.btnText}>Connection Time Out</Text>
            </Pressable>


            <Pressable style={styles.button} onPress={handleFailingAtRequest}>
                <Text style={styles.btnText}>Failing  At Request</Text>
            </Pressable>
        </View>
    );
};
export default NetworkCallsAxios;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#0B438C',
        padding: 10,
        borderRadius: 10,
        height: 50,
        marginVertical: 10
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
})
