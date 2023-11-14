import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import ProfileData from './ProfileData';

const data = [
  { label: 'Today', value: '1' },
  { label: 'Yesterday', value: '2' },
  { label: 'This Month', value: '3' },
  { label: 'Last Month', value: '4' },
];

const Profile = () => {
  const [value, setValue] = useState('Today');
 
  return (
    <View style={styles.mainPage}>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder='Select Date'
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.label);
        }}
      />
      <ProfileData dateFormat={value}/>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainPage: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor:'blue',
    margin:5
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});