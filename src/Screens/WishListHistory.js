import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl
} from 'react-native';
import CurrencyDataCard from '../Components/CurrencyDataCard';
import firestore from '@react-native-firebase/firestore';

const WishListHistory=()=>{
    const [resultData,setResultData]=useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(()=>{
        getResultedData();
    },[])
    const getResultedData=()=>{
        setRefreshing(true);
        const resultedArray=[];
        firestore().collection("CurrenctData")
        .orderBy("totalTransactions","desc")
        .limit(5)
        .get()
        .then((res)=>{
            res.forEach(item => {
                resultedArray.push({...item.data(),id:item.id});
            });
            setResultData(resultedArray);
            setRefreshing(false);
        })
        .catch((e)=>{
            console.log(e);
            setRefreshing(false);
        })
    }
  return (
      <View style={styles.container}>
         <View style={styles.container}
         >
            {
                resultData.length===0?
                <Text style={{color:"black",fontWeight:"bold"}}>No Transactions</Text>:
                <FlatList
                    refreshControl={
                        <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getResultedData}
                        />
                    }
                    ListHeaderComponent={
                        <Text style={{color:"black",fontWeight:"bold",fontSize:20,padding:10,textAlign:"center"}}>Your Favourite Transactions Pairs</Text>
                    }
                    data={resultData}
                    keyExtractor={item=>item.id}
                    renderItem={(item)=>
                        <CurrencyDataCard
                            itemValue={item}
                        />
                    }
                />
            }
        </View>
      </View>
    );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default WishListHistory