import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Dimensions,
    Image,
    TouchableOpacity,
    ToastAndroid,
    FlatList,
    Modal
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CurrencyDataCard from '../Components/CurrencyDataCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height}=Dimensions.get('window');
const SearchScreens=({navigation})=>{
  const [searchedData,setSearchData]=useState([]);
  const [topSearchedData,setTopSearchedData]=useState([]);
  const [searchKey,setSearchKey]=useState(null);
  const [showModal,setShowModal]=useState(false);
  const [firstCurrency,setFirstCurrency]=useState(null);
  const [secondCurrency,setSceondCurrency]=useState(null);
  const [selected,setSelected]=useState(1);
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    findTopSearches();
  },[])
  const findTopSearches=()=>{
    const currenctData=[];
    firestore().collection("CurrenctData")
    .orderBy('totalSearches','desc')
    .get()
    .then((res)=>{
      res.forEach(item => {
        currenctData.push({...item.data(),id:item.id});
      });
      setTopSearchedData(currenctData);
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  const searchwithName=async()=>{

    try {
      const value = await AsyncStorage.getItem('local_searched_data')
      if(searchKey===null){
        setSearchData(topSearchedData);
        setSearchData([])
        throw "Please Enter Somehing..";
      }
      const searchedArray=topSearchedData.filter((val)=>{
        return val.currency[0] === searchKey.toLowerCase() || val.currency[1] === searchKey.toLowerCase();
      })
      if(searchedArray.length===0){
        setSearchData(topSearchedData);
        setSearchData([])
        alert("Can't Found Item")
        return;
      }
      setSearchData(searchedArray);
      if(value===null){
        const jsonValue = JSON.stringify(searchedArray)
        await AsyncStorage.setItem('local_searched_data', jsonValue)
      }
      else{
        const newArray=searchedArray.concat(JSON.parse(value));
        const jsonValue = JSON.stringify(newArray)
        await AsyncStorage.setItem('local_searched_data', jsonValue)
      }
      searchedArray.forEach((item)=>{
        var newTotalSearch=item.totalSearches+1;
        firestore().collection('CurrenctData').doc(item.id)
        .update({
          totalSearches:newTotalSearch,
          datetime:Date.now()
        })
        .then(async()=>{
          console.log("k")
        })
        .catch((e)=>{
          console.log(e);
        })
      })
    } catch (error) {
     console.log(error);
     const value = await AsyncStorage.getItem('local_searched_data');
     setSearchData(JSON.parse(value))
    }
  }
  const handleModal=(value)=>{
    setShowModal(value)
  }
  const moveToConversion=async(first,second)=>{
    if(loading)
      return
    const currencyValues=[];
    const tempArray=[first,second]
    setLoading(true)
    tempArray.forEach(item => {
      firestore().collection("currency").where('name','==',item).get()
      .then((res)=>{
        res.forEach(item => {
          currencyValues.push({...item.data(),id:item.id});
          if(currencyValues.length==2){
            setLoading(false)
            setShowModal(false);
            navigation.replace("converter",{currenctData:[currencyValues[0],currencyValues[1]]})
          }
        });
      })
      .catch((e)=>{
        setLoading(false)
        console.log(e);
      })
    });
  }
  return (
    <ScrollView >
      <View style={styles.inputbox}>
        <TextInput
          style={{color:"black",fontWeight:'bold',fontSize:15}}
          placeholder='Search with name...'
          placeholderTextColor={'black'}
          onChangeText={(name)=>setSearchKey(name)}
          
        />
        <TouchableOpacity onPress={()=>searchwithName()}>
          <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/149/149852.png"}} style={{width:20,height:20}}/>
        </TouchableOpacity>
      </View>
      <Text style={{color:"#7937F6",fontWeight:'bold',fontSize:20,paddingHorizontal:20}}>
        {searchedData.length===0?"Top Searches":"Searched Items"}
      </Text>
      {
        searchedData.length===0 && topSearchedData.length===0?null:
        <FlatList
          data={searchedData.length===0?topSearchedData:searchedData}
          keyExtractor={item=>item.id}
          renderItem={(item)=>
            <CurrencyDataCard
              itemValue={item}
              getFirstValue={(first)=>setFirstCurrency(first)}
              getSecondValue={(second)=>setSceondCurrency(second)}
              showModalFun={handleModal}
              cardType="searchScreenCard"
            />
          }
        />
      }
      <Modal visible={showModal} animationType='slide' transparent={true}>
        <View style={{backgroundColor:'#000000aa',flex:1,justifyContent:'flex-end'}}>
          <View style={{backgroundColor:'white',height:'50%',borderTopRightRadius:30,borderTopLeftRadius:30,padding:10,alignItems: 'center'}}>
            <Text style={{color:"black",fontWeight:"bold"}}>Select One choice</Text>
            <View style={{flexDirection:"row",justifyContent:"space-around",width,padding:10,marginTop:10}}>
              <TouchableOpacity 
                onPress={()=>setSelected(1)}
                style={{width:25,height:25,borderRadius:25/2,backgroundColor:"white",padding:10,alignItems:"center",justifyContent: 'center',elevation:10}}
              >
                <View style={{width:18,height:18,backgroundColor:!selected?"white":'#7937F6',borderRadius:9}}/>
              </TouchableOpacity>
              <Text style={{color:"black",fontWeight:"bold",fontSize:20}}>{firstCurrency}</Text>
              <Text style={{color:"black",fontWeight:"bold",fontSize:20}}>{secondCurrency}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around",width,padding:10,marginTop:10}}>
              <TouchableOpacity 
                onPress={()=>setSelected(0)}
                style={{width:25,height:25,borderRadius:25/2,backgroundColor:"white",padding:10,alignItems:"center",justifyContent: 'center',elevation:10}}
              >
                <View style={{width:18,height:18,backgroundColor:!selected?"#7937F6":'white',borderRadius:9}}/>
              </TouchableOpacity>
              <Text style={{color:"black",fontWeight:"bold",fontSize:20}}>{secondCurrency}</Text>
              <Text style={{color:"black",fontWeight:"bold",fontSize:20}}>{firstCurrency}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",width:width,marginTop:20}}>
              <TouchableOpacity style={styles.button} onPress={()=>setShowModal(false)}>
                <Text style={{color:"#7937F6",fontWeight:"bold"}}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button,{backgroundColor:"#7937F6"}]} onPress={()=>selected?moveToConversion(firstCurrency,secondCurrency):moveToConversion(secondCurrency,firstCurrency)}>
                <Text style={{color:"white",fontWeight:"bold"}}>Convert</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  inputbox:{
    width:width-40,
    height:50,
    borderRadius:5,
    backgroundColor:"white",
    elevation:10,
    paddingHorizontal:10,
    alignSelf:"center",
    margin:10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection:"row",
  },
  button:{
    width:width/3,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white",
    borderRadius:5,
    borderWidth:1,
    borderColor:"#7937F6"
  }
})
export default SearchScreens