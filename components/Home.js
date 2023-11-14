import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ipAddress = '192.168.0.123';
const profileCode = 'Ssc7022';

function Home() {
  const [apiData, setApiData] = useState([]);
  const [amount, setAmount] = useState('');
  const date = 'This Month';

  const fetchDataFromAPI = async (date) => {
    if (ipAddress && profileCode) {
      try {
        const apiUrl = `http://${ipAddress}:8000/api/profile/?i=${profileCode}&s=${date}`;
        const response = await Axios.get(apiUrl);
        setAmount(response.data.amount);
        setApiData(response.data.data);
      } catch (error) {
        console.log('Fetching error');
      }
    } else {
      console.log('Ip Address Not Found');
    }
  };

  useEffect(() => {
    fetchDataFromAPI(date);
  }, []); // Run this effect only once on component mount

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.comission}</Text>
    </View>
  );

  return (
    <Text>
      hi
    </Text>
    // <View style={styles.container}>
    //   <View style={styles.headerTopBar}>
    //     <Text style={styles.headerTopBarText}>{date} : </Text>
    //     <Text style={styles.headerTopBarAmount}>{amount}</Text>
    //   </View>
    //   <View style={styles.header}>
    //     <Text style={styles.heading}>Bill No</Text>
    //     <Text style={styles.heading}>Name</Text>
    //     <Text style={styles.heading}>Amount</Text>
    //     <Text style={styles.heading}>Comission</Text>
    //   </View>
    //   <FlatList
    //     data={apiData} // Use the state variable to render the data
    //     keyExtractor={(item) => item.id.toString()}
    //     renderItem={renderItem}
    //   />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  headerTopBar: {
    backgroundColor: '#6AB7E2',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 15,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  headerTopBarText: {
    color: '#fff',
    fontSize: 16
  },
  headerTopBarAmount:{
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold',
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

export default Home;
