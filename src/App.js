import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
const[amount,setAmount]=useState(1)
const[fromcurrency,setfromcurrency]=useState("USD")
const[tocurrency,setTocurrency]=useState("INR")
const[convertedamount,setConvertedamount]=useState(null)
const[exchangerate,setExchangerate]=useState(null)
 
useEffect(()=>{

  const getExchangerate = async()=>{
    try{
      let url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`
      let res=await axios.get(url)
      setExchangerate(res.data.rates[tocurrency]) 

    }catch(error){
      console.error("error fetching exchange rate",error)
    }

  }
getExchangerate();
},[fromcurrency,tocurrency])

useEffect(()=>{
  if(exchangerate!==null){
    setConvertedamount((amount*exchangerate).toFixed(2))
  }

},[amount,exchangerate])

const handelamtchange=(e)=>{
  const value=parseFloat(e.target.value)
  setAmount(isNaN(value)?0 :value)
}

const handelfrrmchange=(e)=>{
  setfromcurrency(e.target.value)
}

const handeltochange=(e)=>{
  setTocurrency(e.target.value)
}


  return (
<>
    <div className="currency-converter">
      <div className='box'></div>
      <div className='data'>
        <h1>currency-conveter</h1>
        
        <div className='input-container'>
        <label htmlFor='amt' >amount</label>
        <input type='number' onChange={handelamtchange} value={amount}id='amt'></input>
        </div>
      </div>

        <div className='input-container'>
        <label htmlFor='fromcurrency'>from currency:</label>
        <select id='fromcurrency' value={fromcurrency} onChange={handelfrrmchange}>
        <option value="USD">USD - United States Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">BPS - British Pound Sterling</option>
        <option value="JPY">JPY - Japanese Yen</option>
        <option value="AUD">AUD - Austalian Dollar</option>
        <option value="CNY">CNY - Chinese Yuan</option>
        <option value="CAD">CAD - Canadian Dollar</option>
        <option value="INR">INR - Indian Rupee</option>
        <option value="BRL">BRL - Brazilian Reel</option>
        <option value="ZAR">ZAR - South African Rand</option>
        </select>
        </div>
        <div className='input-container'>
        <label htmlFor='tocurrency'>To currency:</label>
        <select id='tocurrency' value={tocurrency} onChange={handeltochange}>
        <option value="USD">USD - United States Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">BPS - British Pound Sterling</option>
        <option value="JPY">JPY - Japanese Yen</option>
        <option value="AUD">AUD - Austalian Dollar</option>
        <option value="CNY">CNY - Chinese Yuan</option>
        <option value="CAD">CAD - Canadian Dollar</option>
        <option value="INR">INR - Indian Rupee</option>
        <option value="BRL">BRL - Brazilian Reel</option>
        <option value="ZAR">ZAR - South African Rand</option>
        </select>
        </div>
        <div className="result">
          <p> {amount} {fromcurrency} is equal to {convertedamount} {tocurrency} </p>
          </div>
      </div>
    
</>
  );
}

export default App;
