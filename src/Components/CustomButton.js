import React from 'react';
import {
    View,Text, StyleSheet, Dimensions, TextInput,Image, TouchableOpacity
} from 'react-native';

const {width,height}=Dimensions.get('window');

const CustomButton=(props)=>{
    return(
        <TouchableOpacity style={[styles.buttonContaier,{backgroundColor:props.background,borderColor:props.border}]}
            onPress={props.onpress}
        >
            <Text style={{color:props.titleColor,fontWeight:"bold",fontSize:20}}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    buttonContaier:{
        width:width-60,
        height:50,
        alignItems:"center",
        justifyContent: 'center',
        marginTop:10,
        borderRadius:10,
        zIndex:-1000,
        alignSelf:"center",
        borderWidth:2
    }
})
export default CustomButton;