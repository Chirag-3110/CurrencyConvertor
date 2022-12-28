import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';

const {width,height}=Dimensions.get('window');
const ImageView=(props)=>{

    return(
        <View style={styles.container}>
            <Image
                source={{uri:props.imageLink}}
                style={styles.imageStyle}
            />
            <View style={{alignItems: 'center',justifyContent:"space-around",height:'100%'}}>
                <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{props.title}</Text>
                <TouchableOpacity style={styles.btnContainer} onPress={props.onpress}>
                    <Text style={{color:"white",fontWeight:"bold"}}>Enter</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor:"white",
        elevation:10,
        width:width-30,
        height:width/3,
        borderRadius:10,
        margin:50,
        marginTop:10,
        padding:10,
        flexDirection:"row",
        zIndex:-1000
    },
    btnContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"rgba(120,124,255,1)",
        width:100,
        height:40,
        borderRadius:5,
        elevation:5
    },
    imageStyle:{
        height:'100%',
        width:'60%',
        resizeMode:"contain",
        borderRadius:10
    }
})
export default ImageView;