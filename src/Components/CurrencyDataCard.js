import React, { useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import CustomButton from './CustomButton';

const {width,height}=Dimensions.get('window');
const CurrencyDataCard=(props)=>{
    const getItemValues=()=>{
        props.getFirstValue(props.itemValue.item.currency[0]);
        props.getSecondValue(props.itemValue.item.currency[1]);
        props.showModalFun(true)
    }
    return(
        <View style={styles.constainer}>
            <Text style={{color:"black",fontWeight:'bold'}}>
                Total Seaches : {props.itemValue.item.totalSearches}
            </Text>
            <View style={{flexDirection: 'row',justifyContent:"space-between",paddingHorizontal:10,paddingVertical:15,alignItems:"center"}}>
                <View>
                    <Text style={{color:"#7937F6",fontWeight:'bold',fontSize:20}}>
                        {props.itemValue.item.currency[0]}
                    </Text>
                </View>
                <Image
                    source={{uri:"https://cdn-icons-png.flaticon.com/128/893/893078.png"}}
                    resizeMode='contain'
                    style={{
                        width:30,
                        height:30,
                    }}
                />
                <View>
                    <Text style={{color:"#7937F6",fontWeight:'bold',fontSize:20}}>
                    {props.itemValue.item.currency[1]}
                    </Text>
                </View>
            </View>
            <Text style={{color:"black",fontWeight:'bold',textAlign:"center",padding:10}}>
                1 {props.itemValue.item.currency[0]} = {props.itemValue.item.difference} {props.itemValue.item.currency[1]}
            </Text>
            {
                props.cardType==="searchScreenCard"?
                    <CustomButton
                    title="Select Type"
                    onpress={()=>getItemValues()}
                    background="#7937F6"
                    titleColor="white"
                />:null
            }
            
        </View>
    )
}
const styles=StyleSheet.create({
    constainer:{
        backgroundColor:"white",
        elevation:10,
        width:width-40,
        borderRadius:10,
        alignSelf:"center",
        padding:10,
        marginVertical:15
    }
})
export default CurrencyDataCard;
