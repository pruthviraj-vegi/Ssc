import React, { useState, useEffect } from 'react';
import {
    TextInput, View, Text, Button, KeyboardAvoidingView, Modal,
    TouchableOpacity, ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from './Stockstyles';

function Stocks() {
    const [code, setCode] = useState("");
    const [barcode, setBarcode] = useState("");
    const [main, setMain] = useState("");
    const [sub, setSub] = useState("");
    const [qty, setQty] = useState('');
    const [mrp, setMrp] = useState('');
    const [disc, setDisc] = useState('');
    const [rate, setRate] = useState('');
    const [come, setCome] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debouncedCode, setDebouncedCode] = useState("");
    const [barcodeScannerVisible, setBarcodeScannerVisible] = useState(false);

    const debouncedFetchData = (debouncedCode) => {
        fetchDataFromAPI(debouncedCode);
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedCode(code);
        }, 500); // Adjust the delay time as needed (e.g., 500ms)

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [code]);

    useEffect(() => {
        if (debouncedCode !== "") {
            debouncedFetchData(debouncedCode);
        }
    }, [debouncedCode]);

    const fetchDataFromAPI = async (code) => {
        console.log(code)
        setLoading(true);
        setError(null);

        try {
            const apiUrl = `http://192.168.236.119:8000/api/stock/${code}`;
            const response = await Axios.get(apiUrl);
            const stock_data = response.data;
            setBarcode(stock_data.barcode);
            setMain(stock_data.mainType);
            setSub(stock_data.subType);
            setQty(stock_data.quantity);
            setMrp(stock_data.sellingPrice);
            setDisc(stock_data.discount);
            setRate(stock_data.discountPrice);
            setCome(stock_data.commision);
        } catch (error) {
            setError('Error fetching data');
            setNull();
        } finally {
            setLoading(false);
        }
    }

    const setNull = () => {
        setBarcode('');
        setMain('');
        setSub('');
        setQty('');
        setMrp('');
        setDisc('');
        setRate('');
        setCome('');
    }

    const toggleBarcodeScanner = () => {
        setBarcodeScannerVisible(!barcodeScannerVisible);
    };

    // barcode data from hear
    const [hasPermission, setHasPermission] = useState(null);
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
        setCode('')
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


    return (
        <>
            <View style={styles.stocks}>
                <Text style={styles.heading}>Stocks</Text>
                <View style={styles.stockObjects}>
                    <View>
                        <Text style={styles.barcodeValue}>{barcode}</Text>
                    </View>
                    <NormalStock label='Main Type / Box' value={main} />
                    <NormalStock label='Sub Type / Model' value={sub} />
                    <NormalStock label='Mrp' value={mrp} />
                    <NormalStock label='Discount' value={disc} />
                    <NormalStock label='Comission' value={come} />
                    <NormalStock label='Quantity' value={qty} bold='true' />
                    <NormalStock label='Rate' value={rate} bold='true' />
                </View>
                {loading && <ActivityIndicator size="large" color="blue" />}
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'android'} style={styles.writeTaskWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={'Enter Code'}
                    value={code}
                    onChangeText={text => setCode(text)}
                />
                <TouchableOpacity onPress={toggleBarcodeScanner}>
                    <View style={styles.addWrapper}>
                        <MaterialCommunityIcons name="barcode" color='black' size={26} />
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            {/* Barcode  scanner model from hear */}
            <Modal visible={barcodeScannerVisible} animationType="slide">
                <View style={styles.barcodePage}>
                    <View style={styles.barcodebox}>
                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={{ height: 450, width: '100%' }}
                        />
                    </View>

                </View>
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={toggleBarcodeScanner}
                    >
                        <View style={styles.circle}>
                            <MaterialCommunityIcons name="window-close" color="blue" size={26} />
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}

const NormalStock = ({ label, value, bold = false }) => {
    return (
        <View style={styles.stockRows}>
            <Text style={styles.stockHeading}>{label} :</Text>
            <Text style={bold ? styles.boldStockValue : styles.stockValue}>{value}</Text>
        </View>
    )
}

export default Stocks;
