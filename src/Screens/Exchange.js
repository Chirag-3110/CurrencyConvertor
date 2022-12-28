import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions
} from 'react-native';
import {
    LineChart,
} from 'react-native-chart-kit'
import firestore from '@react-native-firebase/firestore';

const ExchangeChart=(props)=>{
    const [ecxhangeDate,setExcnageDate]=useState([]);
    const [exchangeAmount,setExchangeAmount]=useState([]); 
    useEffect(()=>{
        getData();
    },[]);
    const changeFormatForChart=(finalFilteredArray)=>{
        finalFilteredArray.sort((a,b) => (a.exchangeDate > b.exchangeDate) ? 1 : ((b.exchangeDate > a.exchangeDate) ? -1 : 0))
        const tempdate=[];
        const tempAmt=[];
        finalFilteredArray.forEach((item)=>{
            var val=item.exchangeDate.split('/');
            tempdate.push(val[0])
            tempAmt.push(parseInt(item.exchangeAmount));
        });
        setExcnageDate(tempdate);
        setExchangeAmount(tempAmt)
    }
    const changeDataFormat=(exchangesValuesOutput,exchangeDataInput)=>{
        const firstFilteredArray=exchangesValuesOutput.filter((item)=>{
            return item.exchangePairs[0] === exchangeDataInput[0].name || item.exchangePairs[0] === exchangeDataInput[1].name
        })
        const finalFilteredArray=firstFilteredArray.filter((item)=>{
            return item.exchangePairs[1] === exchangeDataInput[0].name || item.exchangePairs[1] === exchangeDataInput[1].name
        }) 
        changeFormatForChart(finalFilteredArray)
    }
    const getData=()=>{
        const exchangesValues=[]
        firestore().collection("ExchangeChart")
        .where('exchangePairs','array-contains-any',[props.exchangeData[0].name])
        .get()
        .then((res)=>{
            res.forEach(item => {
                exchangesValues.push({...item.data(),id:item.id});
            });
            changeDataFormat(exchangesValues,props.exchangeData)
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    return(
        <View style={{flex:1,alignItems: 'center',padding:20}}>
            <Text style={{color:"rgba(120,124,255,1)",fontSize:20,fontWeight:"bold",textAlign:'left',width:"100%",padding:10}}>Exchange Chart</Text>
           {
                exchangeAmount.length===0 && ecxhangeDate.length===0?null:
                <>
                    <LineChart
                    data={{
                        labels: ecxhangeDate,
                        datasets: [
                            {
                                data:[1,2]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width-40} 
                    height={220}
                    chartConfig={{
                        backgroundColor: "#BB6FFF",
                        backgroundGradientFrom: "#B262FB",
                        backgroundGradientTo: "#BC75FB",
                        decimalPlaces: 2, 
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                    />
                </>
           }
        </View>
    )
}


export default ExchangeChart;