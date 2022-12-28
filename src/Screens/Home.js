import React,{useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../Components/CustomButton';
import ImageView from '../Components/ImageContainer';
import firestore from '@react-native-firebase/firestore';

const {width,height}=Dimensions.get('window');

const HomeScreen=({navigation})=>{
    const [currency,setCurrency]=useState([]); 
    const [firstCurrency, setfirstCurrency] = useState(false);
    const [secondCurrency,setSecondCurrency]=useState(false);
    const [firstvalue, setfirstValue] = useState(null);
    const [secondvalue, setsecondValue] = useState(null);
    const [firstItems, setFirstItems] = useState([]);
    const [secondItems, setSecondItems] = useState([]);
    useEffect(()=>{
      convertAndSetCurrenctData();
    },[]);

    const convertAndSetCurrenctData=()=>{
      var dropDownData=[];
      var currencyValues=[];
      firestore().collection("currency").get()
      .then((res)=>{
        res.forEach(item => {
          currencyValues.push({...item.data(),id:item.id});
        });
        currencyValues.forEach(item => {
          dropDownData.push({label: item.name, value: item.name})
        });
        setCurrency(currencyValues);
        setFirstItems(dropDownData);
        setSecondItems(dropDownData);
      })
      .catch((e)=>{
        console.log(e);
      })
      
    }

    const convertData=(firstvaluenew,secondvaluenew)=>{
      var firstCurrencyObj=currency.filter((val)=>{
        return val.name===firstvaluenew;
      })
      var secondCurrencyObj=currency.filter((val)=>{
        return val.name===secondvaluenew;
      })
      navigation.navigate("converter",{currenctData:[firstCurrencyObj[0],secondCurrencyObj[0]]})
    }

    const moveToNext=()=>{
      try {
        if(firstvalue==null || secondvalue==null)
          throw "Please select Currency for conversion"
        if(firstvalue===secondvalue){
          throw "Please select Different Currencies";
        }
        convertData(firstvalue,secondvalue);
      } catch (error) {
        alert(error);
      }
    }
    return (
      <View style={[styles.container,{width:width}]}>
        <View style={styles.titleView}>
          <Text style={{color:"white",fontWeight:"bold",fontSize:25,textAlign:"center",}}>Currency Convertor</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <View >
            <Text style={styles.subTitle}>Select first Currency</Text>
            <DropDownPicker
              open={firstCurrency}
              value={firstvalue}
              items={firstItems}
              setOpen={setfirstCurrency}
              setValue={setfirstValue}
              setItems={setFirstItems} 
              style={{width:width-60}}
              placeholder="Select Currency"
              zIndex={1000}
            />
          </View>
          <View >
            <Text style={styles.subTitle}>Select second Currency</Text>
            <DropDownPicker
              open={secondCurrency}
              value={secondvalue}
              items={secondItems}
              setOpen={setSecondCurrency}
              setValue={setsecondValue}
              setItems={setSecondItems} 
              style={{width:width-60}}
              placeholder="Select Currency"
              zIndex={-500}
            />
          </View>
          <CustomButton
            title="Next..."
            onpress={()=>moveToNext()}
            background="rgba(120,124,255,1)"
            titleColor="white"
            border="rgba(120,124,255,1)"
          />
        </View>
        <ImageView
          title="Top Searches"
          imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykD5AoIAxzFcQYABckvSPyvg5BPXhP-vd-Q&usqp=CAU"
          onpress={()=>navigation.navigate("search")}
        />
      </View>
    );
}
const styles=StyleSheet.create({
  container:{ 
    flex: 1, 
    paddingVertical:20,
    backgroundColor:"white",
    alignSelf:"center",
    backgroundColor:"white"
  },
  titleView:{
    backgroundColor:"rgba(120,124,255,1)",
    borderRadius:10,
    elevation:10,
    shadowColor:"rgba(76,81,149,1)",
    padding:10,
    width:width-50,
    alignSelf:"center"
  },
  subTitle:{
    color:"black",
    width:'100%',
    padding:10,
    fontWeight:"bold",
    
  },
  dropdownContainer:{
    padding:10,
    paddingVertical:40,
    marginTop:10,
    backgroundColor:"white",
    alignItems:"center",
    elevation:10,
    borderRadius:10,
    margin:15
  }
})
export default HomeScreen