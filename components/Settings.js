import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Settings() {
  const [ipAddress, setIpAddress] = useState('');
  const [profileCode, setProfileCode] = useState("")
  const [error, setIpError] = useState('');
  const [success, setSuccess] = useState('');
  const [successTimeout, setSuccessTimeout] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const displayMessage = (message, messageType, delay = 3000) => {
    messageType(message);
    const timeout = setTimeout(() => {
      messageType('');
    }, delay);
    setSuccessTimeout(timeout);
  };

  const storeIpAddress = async (value) => {
    try {
      await AsyncStorage.setItem('ipAddress', value);
      setIpAddress(value);
      alert(`IP Address saved successfully : ${value}`)
      Keyboard.dismiss()
    } catch (e) {
      displayMessage('Error storing IP Address', setIpError);
    }
  };

  const storeProfileId = async (value) => {
    try {
      await AsyncStorage.setItem('profileId', value);
      setProfileCode(value);
      alert(`Profile Id saved successfully : ${profileCode}`)
      Keyboard.dismiss()
    } catch (e) {
      displayMessage('Error storing Profile Id', setIpError);
    }
  };

  const getIpAddress = async () => {
    try {
      const value = await AsyncStorage.getItem('ipAddress');
      if (value !== null) {
        setIpAddress(value);
      } else {
        displayMessage('IP Address is null', setIpError);
      }
    } catch (e) {
      displayMessage('Error in getting IP Address', setIpError);
    } finally {
      setHasLoaded(true);
    }
  };

  const getProfileId = async () => {
    try {
      const value = await AsyncStorage.getItem('profileId');
      if (value !== null) {
        setProfileCode(value);
      } else {
        displayMessage('IP Address is null', setIpError);
      }
    } catch (e) {
      displayMessage('Error in getting IP Address', setIpError);
    } finally {
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    if (!hasLoaded) {
      getIpAddress();
      getProfileId();
    }
  }, [hasLoaded]);

  useEffect(() => {
    return () => {
      if (successTimeout) {
        clearTimeout(successTimeout);
      }
    };
  }, []);

  return (

    <View style={styles.mainPage}>
      <Text style={styles.heading}>Settings:</Text>
      <View style={styles.rowData}>
        <View style={styles.inputRows}>
          <Text style={styles.title}>IP Address:</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            style={styles.writeTaskWrapper}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter IP Address"
              value={ipAddress}
              onChangeText={setIpAddress}
            />
          </KeyboardAvoidingView>
        </View>
        <Button
          title="Save Ip Address"
          onPress={() => storeIpAddress(ipAddress)}
        />
      </View>
      <View style={styles.rowData}>
        <View style={styles.inputRows}>
          <Text style={styles.title}>Profile Id:</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            style={styles.writeTaskWrapper}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter Profile Id"
              value={profileCode}
              onChangeText={setProfileCode}
            />
          </KeyboardAvoidingView>
        </View>
        <Button
          title="Save Id Profile"
          onPress={() => storeProfileId(profileCode)}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {success && <Text style={styles.successText}>{success}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    margin: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputRows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  input: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 0.5,
    width: 200,
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
  rowData:{
    marginVertical:15
  }
});

export default Settings;
