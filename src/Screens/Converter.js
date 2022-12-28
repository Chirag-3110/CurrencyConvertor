import React, { useEffect, useState } from 'react';
import {
    View,Text, StyleSheet, Dimensions, TextInput,Image
} from 'react-native';
import CustomButton from '../Components/CustomButton';
import firestore from '@react-native-firebase/firestore';

const {width,height}=Dimensions.get('window');

const Convertor=({route})=>{
    const {currenctData}=route.params;
    var [first,setFirst]=useState(null);
    var [second,setSecond]=useState(null);
    const [firstCurrenctValue,setFirstCurrenctValue]=useState(null);
    const [secondCurrencyValue,setSecondCurrencyValue]=useState('Amount');
//final state
    const [currecyData,setCurrencyData]=useState(null);

    useEffect(()=>{
        setFirst(currenctData[0])
        setSecond(currenctData[1])
        var currencyValues=[];
        firestore().collection("CurrenctData")
        .where('currency',"array-contains-any",[currenctData[0].name,currenctData[1].name])
        .get()
        .then((res)=>{
            res.forEach(item => {
                currencyValues.push({...item.data(),id:item.id});
            });
            const filteredValue=currencyValues.filter((value)=>{
                return (value.currency[0]===currenctData[0].name || value.currency[1]===currenctData[0].name) && (value.currency[0]===currenctData[1].name || value.currency[1]===currenctData[1].name); 
            });
            setCurrencyData(filteredValue);
        })
        .catch((e)=>{
            console.log(e);
        })
    },[]);

    const addExchangeData=(finalCurrecyData,firstData,secondData,firstCurrenctVal,result)=>{
        console.log(firstData.name,secondData.name,firstCurrenctVal);
        let tranDate = new Date();
        const myArray = tranDate.toString().split(" ");
        let timeDate=`${myArray[2]}-${tranDate.getMonth(myArray[1])+1}-${myArray[3]}/${myArray[4]}`;
        // console.log(timeDate);
        firestore().collection('ExchangeChart')
        .add({
            exchangeAmount:firstCurrenctVal,
            resultedAmount:result,
            exchangeDate:timeDate,
            exchangePairs:[firstData.name,secondData.name]
        })
        .then(()=>{
            console.log("h");
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    const changeCurrency=()=>{
        try {
            if(firstCurrenctValue===null)
                throw "Enter Currency Amount";
            var result;
            if(first.priority>second.priority){
                result=parseFloat(firstCurrenctValue*(currecyData[0].difference)).toFixed(2);
            }
            else{
                result=parseFloat(firstCurrenctValue/(currecyData[0].difference)).toFixed(2);
            }
            setSecondCurrencyValue(result);
            // console.log(currecyData[0].totalTransactions,currecyData[0].id)
            var newTotalSearch=currecyData[0].totalTransactions+1;
            firestore().collection('CurrenctData').doc(currecyData[0].id)
            .update({
                totalTransactions:newTotalSearch,
            })
            .then(async()=>{
                // console.log("k")
                addExchangeData(currecyData,first,second,firstCurrenctValue,result);
            })
            .catch((e)=>{
                console.log(e);
            })
        } catch (error) {
            alert(error);
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={{color:"white",fontWeight:"bold",fontSize:30,textAlign:"left",width:width-60,}}>Convert Currency</Text>
            </View>
            {
                first==null && second===null?null:
                <View>
                    <View style={styles.convertorContainer}>
                        <View style={{alignItems:"center"}}>
                            <Text style={{color:"black",marginBottom:15,fontWeight:"bold",fontSize:20}}>{first.name}</Text>
                            <TextInput 
                                style={styles.inputBox}
                                placeholder='Amount'
                                placeholderTextColor={"black"}
                                onChangeText={(val)=>setFirstCurrenctValue(val)}
                                keyboardType="numeric"
                            />
                        </View>
                        <Image
                            source={{uri:"https://cdn-icons-png.flaticon.com/128/893/893078.png"}}
                            resizeMode='contain'
                            style={{
                                width:40,
                                height:40,
                            }}
                        />
                        <View style={{alignItems:"center"}}>
                            <Text style={{color:"black",marginBottom:15,fontWeight:"bold",fontSize:20}}>{second.name}</Text>
                            <View style={[styles.inputBox,{height:50,alignItems:"center",justifyContent: 'center',}]}>
                                <Text style={{color:"black",fontWeight:"bold"}}>{secondCurrencyValue}</Text>
                            </View>
                        </View>
                    </View>
                    <CustomButton
                        title="Change"
                        onpress={()=>changeCurrency()}
                        background="rgba(120,124,255,1)"
                        titleColor="white"
                    />
                </View>
            }
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white"
    },
    convertorContainer:{
        backgroundColor:"white",
        width:width-50,
        height:height/2.5,
        padding:20,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"space-around",
        elevation:10,
        shadowColor: 'rgba(120,124,255,1)',
    },
    inputBox:{
        backgroundColor:"#D0D0D0",
        paddingHorizontal:20,
        borderRadius:10,
        // width:'50%',
        textAlign:"center",
        color:"black",
        fontWeight:'bold',
    },
    titleView:{
        backgroundColor:"rgba(120,124,255,1)",
        borderRadius:10,
        elevation:10,
        shadowColor:"rgba(76,81,149,1)",
        padding:10,
        marginVertical:10,
        position:"absolute",
        top:0
    }
})
export default Convertor;