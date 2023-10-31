import React, { useState, useEffect } from 'react';
import {
     View, Text, Button, Modal
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from './Stockstyles';


// barcode data from hear
const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [text, setText] = useState('Not yet scanned')

const askForCameraPermission = () => {
    (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })()
}

// Request Camera Permission
useEffect(() => {
    askForCameraPermission();
}, []);


// What happens when we scan the bar code
const handleBarCodeScanned = ({ type, data }) => {
    // setScanned(true);
    // setText(data)
    toggleBarcodeScanner()
    fetchDataFromAPI(data)
};

// Check permissions and return the screens
if (hasPermission === null) {
    return (
        <View style={styles.container}>
            <Text>Requesting for camera permission</Text>
        </View>)
}
if (hasPermission === false) {
    return (
        <View style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
}

function Barcode() {
  <Modal visible={barcodeScannerVisible} animationType="slide">
    <View style={styles.barcodePage}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 450, width: '100%' }}
        />
      </View>
      <Button title="Close" onPress={toggleBarcodeScanner} />
    </View>
  </Modal>
}