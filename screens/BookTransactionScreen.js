import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {barcodeScanner} from 'expo-barcode-scanner';
import * as Permission from 'expo-Permissions';

export default class TransactionScreen extends React.Component {
  constructor(){
    super()
    this.state={
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
      
    }
  }
  getCameraPermissions= async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermissions: status==="granted"})
  }

handleBarcodeScanned= async({type,data})=>{
  this.setState({
    scanned: true,
    scannedData: data,
    buttonState: 'normal'
  })
}
    render() {
const hasCameraPermissions= this.state.hasCameraPermissions
const scanned = this.state.scanned
const buttonState = this.state.buttonState
if(buttonState === "clicked" && hasCameraPermissions){
  return(
    <BarcodeScanner
    onBarCodeScanned= {scanned? undefined: this.handleBarcodeScanned}
    style={StyleSheet.absoluteFillObject}
    />
  )
}else if(buttonState==='normal'){

      return (
        <View style={styleSheet.container}>
          <Text>{hasCameraPermissions=== true?this.state.scannedData: "Request CameraPermissions"}</Text>
  <TouchableOpacity style={styleSheet.scanButton} 
  onPress={this.getCameraPermissions}
  >
<Text style={styleSheet.displayText}>Scan QR Code</Text>

  </TouchableOpacity>
        </View>
      );
    }
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1, justifyContent: 'center',alignItems: 'center'
    },
    displayText:{
fontSize: 50, textDecorationLine: 'underline'
    },
    scanButton: {
      backgroundColor: '#2196f3',padding: 10, margin: 10
    }
  })