import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Axios from 'axios';

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
            const apiUrl = `http://192.168.0.123:8000/api/stock/${code}`;
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
            setNull()
        } finally {
            setLoading(false);
        }
    };

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
                <TouchableOpacity>
                    <View style={styles.addWrapper}>
                        <MaterialCommunityIcons name="barcode" color='black' size={26} />
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
    stocks: {
        top: 10,
        padding: 20,
    },
    heading: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    stockRows: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 50,
        margin: 10
    },
    stockHeading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    barcodeValue: {
        fontSize: 40,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: "space-around",
        color: 'blue',
    },
    stockValue: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    boldStockValue: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'blue'
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 0.5,
        width: 250,
        fontSize: 25,
        fontWeight: 'bold'
    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default Stocks;
