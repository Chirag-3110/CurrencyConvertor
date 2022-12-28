import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import SearchHistory from './SearchHistory';
import WishListHistory from './WishListHistory';

const HistoryScreen=()=>{
  const [selectedScrees,setSelectedScreens]=useState("searchHistory")  
  return (
      <View style={styles.container}>
        <View style={{width:'100%',backgroundColor:"red",flexDirection:"row"}}>
          <TouchableOpacity 
            style={{width:'50%',height:50,alignItems: 'center',justifyContent: 'center',backgroundColor:"#FF4949"}}
            onPress={()=>setSelectedScreens("searchHistory")}
          >
            <Text style={{fontWeight:"bold",color:"white",fontSize:15}}>Search History</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{width:'50%',height:50,alignItems: 'center',justifyContent: 'center',backgroundColor:"#497EFF"}}
            onPress={()=>setSelectedScreens("wishlistHistory")}
          >
            <Text style={{fontWeight:"bold",color:"white",fontSize:15}}>WatchList History</Text>
          </TouchableOpacity>
        </View>
        {
          selectedScrees==="searchHistory"?
          <SearchHistory/>:
          <WishListHistory/>
        }
      </View>
    );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  }
})
export default HistoryScreen