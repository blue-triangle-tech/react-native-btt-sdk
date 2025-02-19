import React from 'react';
import { Alert, Text, ToastAndroid, View, Pressable, StyleSheet } from 'react-native';

const handleGetRequest = async () => {
    console.log("Get Request");
    try {
        const response = await fetch("https://dummyjson.com/posts/1");
        const data = await response.json();
        console.log("response : ", data.body);
        ToastAndroid.show("Success Get Request", ToastAndroid.LONG);
    } catch (err) {
        console.log("error while making get request: ", err);
        Alert.alert("Error", err.message);
    }
};

const handlePostRequest = async () => {
    console.log("Post Request");
    try {
        const response = await fetch("https://dummyjson.com/users/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: "sandesh",
                lastName: "pawar",
                age: 200,
            }),
        });
        const data = await response.json();
        console.log(`User Added Successfully: \nFirst Name:  ${data.firstName} \nLast Name: ${data.lastName}\nAge : ${data.age}`);
        ToastAndroid.show("Success post request", ToastAndroid.SHORT);
    } catch (err) {
        console.log("error while making post request: ", err);
        Alert.alert("Error", err.message);
    }
};

const handleAPINotFound = async () => {
    console.log("404 API NOT FOUND");
    try {
        const response = await fetch("https://dummyjson.com/unknown/");
        const data = await response.json();
        console.log("response : ", data);
    } catch (err) {
        console.log("error while making get request: ", err);
        Alert.alert("Error 404 : API Not Found", err.message);
    }
};

const handleFailureAtDNS = async () => {
    console.log("Failure At DNS");
    try {
        const response = await fetch("https://ThisDomainDoesNotExist.com/api/");
        const data = await response.json();
        console.log("response : ", data);
    } catch (err) {
        console.log("error while making get request: ", err);
        Alert.alert("DNS Failure: ", err.message);
    }
};

const handleFailingAtConnection = async () => {
    console.log("Failing At Connection");
    try {
        const response = await fetch("https://thisServerIsDown.com");
        const data = await response.json();
        console.log("response : ", data);
    } catch (err) {
        console.log("Error While making connection Request: ", err);
        Alert.alert("Connection Failure: ", err.message);
    }
};

const handleConnectionTimeOut = async () => {
    console.log("Connection Timeout");
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);

        const response = await fetch("https://thisServerIsDown.com", { signal: controller.signal });
        clearTimeout(timeout);
        const data = await response.json();
        console.log("response : ", data);
    } catch (err) {
        console.log("Connection Timeout : ", err);
        Alert.alert("Connection Timeout:", err.message);
    }
};

const handleFailingAtRequest = async () => {
    console.log("Failing At Request");
    try {
        const response = await fetch("https://thisServerIsDown.com");
        const data = await response.json();
        console.log("response : ", data);
    } catch (err) {
        console.log("Failed At Request : ", err);
        Alert.alert("Failed At Request:", err.message);
    }
};

const NetworkCallsFetch = () => {
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
                <Text style={styles.btnText}>Failing At Connection</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleConnectionTimeOut}>
                <Text style={styles.btnText}>Connection Time Out</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleFailingAtRequest}>
                <Text style={styles.btnText}>Failing At Request</Text>
            </Pressable>
        </View>
    );
};

export default NetworkCallsFetch;

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
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
