import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    barcodePage: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: '90%',
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'lightgray',
        marginVertical:50,
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
      },
});
