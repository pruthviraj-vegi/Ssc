import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, KeyboardAvoidingView, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Stockstyles';

function Stocks() {
    const [ipAddress, setIpAddress] = useState('');
    const [profileCode, setProfileCode] = useState('Ssc7022')
    const [code, setCode] = useState('');
    const [barcode, setBarcode] = useState('');
    const [main, setMain] = useState('');
    const [sub, setSub] = useState('');
    const [qty, setQty] = useState('');
    const [mrp, setMrp] = useState('');
    const [disc, setDisc] = useState('');
    const [rate, setRate] = useState('');
    const [come, setCome] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debouncedCode, setDebouncedCode] = useState('');
    const [barcodeScannerVisible, setBarcodeScannerVisible] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);

    const askForCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasCameraPermission(status === 'granted');
    };

    useEffect(() => {
        getData();
        askForCameraPermission();
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('ipAddress');
            if (value !== null) {
                setIpAddress(value);
            } else {
                setError('Ip Address Set Null');
            }
        } catch (e) {
            setError('Error in getting Ip Address');
        }
    };

    const debouncedFetchData = (debouncedCode) => {
        fetchDataFromAPI(debouncedCode);
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedCode(code);
        }, 500);

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [code]);

    useEffect(() => {
        if (debouncedCode !== '') {
            debouncedFetchData(debouncedCode);
        }
    }, [debouncedCode]);

    const fetchDataFromAPI = async (code) => {
        setLoading(true);
        setError(null);
        if (ipAddress && profileCode) {
            try {
                const apiUrl = `http://${ipAddress}:8000/api/stock/?i=${profileCode}&s=${code}`;
                const response = await Axios.get(apiUrl);
                const stockData = response.data;
                setData(stockData);
            } catch (error) {
                setError('Error fetching data');
                setData();
            } finally {
                setLoading(false);
            }
        } else {
            setError('Ip Address Not Found');
        }
    };

    const setData = (data = NaN) => {
        if (data) {
            setBarcode(data.barcode);
            setMain(data.mainType);
            setSub(data.subType);
            setQty(data.quantity);
            setMrp(data.sellingPrice);
            setDisc(data.discount);
            setRate(data.discountPrice);
            setCome(data.commision);
        } else {
            setBarcode('');
            setMain('');
            setSub('');
            setQty('');
            setMrp('');
            setDisc('');
            setRate('');
            setCome('');
        }
    };

    const toggleBarcodeScanner = () => {
        setBarcodeScannerVisible(!barcodeScannerVisible);
    };

    const handleBarCodeScanned = ({ data }) => {
        toggleBarcodeScanner();
        setCode('');
        fetchDataFromAPI(data);
    };

    const reFresh = () => {
        setData();
        getData();
    };

    if (hasCameraPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }

    if (hasCameraPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title="Allow Camera" onPress={() => askForCameraPermission()} />
            </View>
        );
    }

    return (
        <> 
            <StocksView
                barcode={barcode}
                main={main}
                sub={sub}
                mrp={mrp}
                disc={disc}
                come={come}
                qty={qty}
                rate={rate}
                loading={loading}
                error={error}
            />
            <StocksInput
                code={code}
                setCode={setCode}
                toggleBarcodeScanner={toggleBarcodeScanner}
                reFresh={reFresh}
            />
            <BarcodeScannerModal
                barcodeScannerVisible={barcodeScannerVisible}
                handleBarCodeScanned={handleBarCodeScanned}
                toggleBarcodeScanner={toggleBarcodeScanner}
            />
        </>
    );
}

function StocksView({ barcode, main, sub, mrp, disc, come, qty, rate, loading, error }) {
    return (
        <View style={styles.stocks}>
            <Text style={styles.heading}>Stocks :</Text>
            <View style={styles.stockObjects}>
                <View>
                    <Text style={styles.barcodeValue}>{barcode}</Text>
                </View>
                <NormalStock label="Main Type / Box" value={main} />
                <NormalStock label="Sub Type / Model" value={sub} />
                <NormalStock label="Mrp" value={mrp} />
                <NormalStock label="Discount" value={disc} />
                <NormalStock label="Comission" value={come} />
                <NormalStock label="Quantity" value={qty} bold={true} />
                <NormalStock label="Rate" value={rate} bold={true} />
            </View>
            {loading && <ActivityIndicator size="large" color="blue" />}
            {error && <Text style={styles.errorText}>{error}</Text>}
            
        </View>
    );
}

function StocksInput({ code, setCode, toggleBarcodeScanner, reFresh }) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'android'} style={styles.writeTaskWrapper}>
            <TouchableOpacity onPress={reFresh}>
                <View style={styles.addWrapper}>
                    <MaterialCommunityIcons name="refresh" color="black" size={26} />
                </View>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Enter Code"
                value={code}
                onChangeText={(text) => setCode(text)}
            />
            <TouchableOpacity onPress={toggleBarcodeScanner}>
                <View style={styles.addWrapper}>
                    <MaterialCommunityIcons name="barcode" color="black" size={26} />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

function BarcodeScannerModal({ barcodeScannerVisible, handleBarCodeScanned, toggleBarcodeScanner }) {
    return (
        <Modal visible={barcodeScannerVisible} animationType="slide">
            <View style={styles.barcodeDetails}>
                <View>
                    <Text style={styles.scannerTitle}>Scan Code</Text>
                </View>
                <View style={styles.barcodePage}>
                    <View style={styles.barcodebox}>
                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={{ height: 450, width: '100%' }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.closeButtonContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={toggleBarcodeScanner}>
                    <View style={styles.circle}>
                        <MaterialCommunityIcons name="window-close" color="blue" size={26} />
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

function NormalStock({ label, value, bold = false }) {
    return (
        <View style={styles.stockRows}>
            <Text style={styles.stockHeading}>{label} :</Text>
            <Text style={bold ? styles.boldStockValue : styles.stockValue}>{value}</Text>
        </View>
    );
}

export default Stocks;
