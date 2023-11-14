import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    stocks: {
        margin: 20,
        paddingTop: 30,
      },
    heading: {
        fontSize: 30,
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
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: "space-around",
        color: 'blue',
    },
    stockValue: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    boldStockValue: {
        fontSize: 30,
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
    barcodeDetails: {
        display: 'flex',
    },
    barcodePage: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    barcodebox: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: '90%',
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'lightgray',
        marginVertical: 50,
    },
    scanningLine: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        width: '100%',
        height: 2,
    },
    closeButtonContainer: {
        position: 'absolute',
        bottom: '8%', // Adjust the vertical position
        right: '5%',  // Adjust the horizontal position
    },
    circle: {
        width: 50,  // Adjust the size of the circle
        height: 50, // Adjust the size of the circle
        backgroundColor: 'lightgray', // Background color of the circle
        borderRadius: 25, // Make it a circle
        justifyContent: 'center',
        alignItems: 'center',
    }
});
