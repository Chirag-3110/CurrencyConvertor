import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    RefreshControl,
    FlatList,
} from 'react-native';
import CurrencyDataCard from '../Components/CurrencyDataCard';

const SearchHistory=()=>{ 
    const [searchedData,setSearchedData]=useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(()=>{
        getSearchHistoryData();
    },[])
    const getSearchHistoryData=async()=>{
        setRefreshing(true);
        const value = await AsyncStorage.getItem('local_searched_data')
        if(value===null){
          setSearchedData([])
        }else{
          setSearchedData(JSON.parse(value))
        }
        setRefreshing(false);
    }
    return (
      <View style={styles.container}>
        {
            searchedData.length===0?
            <Text style={{color:"black",fontWeight:"bold"}}>No Search History</Text>:
            <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={getSearchHistoryData}
                  />
                }
                data={searchedData}
                keyExtractor={item=>item.id}
                renderItem={(item)=>
                    <CurrencyDataCard
                        itemValue={item}
                    />
                }
            />
        }
      </View>
    );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default SearchHistory