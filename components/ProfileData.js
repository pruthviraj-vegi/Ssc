import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileData({ dateFormat }) {
  const [apiData, setApiData] = useState([]);
  const [amount, setAmount] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [profileCode, setProfileCode] = useState("")

  const getIpAddress = async () => {
    console.log('hi')
    try {
      const value = await AsyncStorage.getItem('ipAddress');
      console.log(value)
      if (value !== null) {
        setIpAddress(value);
      } else {
        console.log('Ip Address is null');
      }
    } catch (e) {
      console.log('Error in getting Ip Address');
    }
  };

  const getProfileId = async () => {
    try {
      const value = await AsyncStorage.getItem('profileId');
      if (value !== null) {
        setProfileCode(value);
      } else {
        console.log('Profile Id is null');
      }
    } catch (e) {
      console.log('Error in getting Profile Id');
    }
  };

  useEffect(() => {
      getIpAddress();
      getProfileId();
  }, []);

  const fetchDataFromAPI = async (dateType) => {
    if (ipAddress && profileCode) {
      try {
        const apiUrl = `http://${ipAddress}:8000/api/profile/?i=${profileCode}&d=${dateType}`;
        const response = await Axios.get(apiUrl);
        setAmount(response.data.amount);
        setApiData(response.data.data);
        setHasLoaded(false)
      } catch (error) {
        console.log('Fetching error');
      }
    } else {
      console.log('Ip Address Not Found');
    }
  };

  useEffect(() => {
    if (!hasLoaded) {
      fetchDataFromAPI(dateFormat);
    }
  }, [dateFormat, hasLoaded]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.comission}</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.headerTopBar}>
        <Text style={styles.headerTopBarText}>{dateFormat} : </Text>
        <Text style={styles.headerTopBarAmount}>{amount}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.heading}>Bill No</Text>
        <Text style={styles.heading}>Name</Text>
        <Text style={styles.heading}>Amount</Text>
        <Text style={styles.heading}>Comission</Text>
      </View>
      <FlatList
        data={apiData} // Use the state variable to render the data
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerTopBar: {
    backgroundColor: '#6AB7E2',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTopBarText: {
    color: '#fff',
    fontSize: 16
  },
  headerTopBarAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  heading: {
    fontSize: 15,
    color: '#000'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 2,
    borderRadius: 3,
    borderColor: '#fff',
    padding: 10,
    backgroundColor: '#fff'
  },
  cell: {
    fontSize: 15,
    textAlign: 'left',
  },
})

export default ProfileData;
