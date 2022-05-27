import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/Apis'
import { auth, db } from '../Firebase'

const Currency = createContext()

const Context = ({children}) => {
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")
    const [coins, setCoins] = useState([])
    const [user, setUser] = useState(null)
    const[alert, setAlert] = useState({
      open:false,
      message: '',
      type: 'success'
    })
    const [starred, setStarred] = useState([])

    useEffect(()=>{
      if(user){
        const coinRef = doc(db,'starred', user.uid)

        const unsubscribe = onSnapshot(coinRef, (coin)=>{
          if(coin.exists()){
            setStarred(coin.data().coins)
          }else{
            console.log('No items');
          }
        })
        return () => {
          unsubscribe()
        }
      }
    }, [user])

    useEffect(()=>{
      onAuthStateChanged(auth, user =>{
        if (user)setUser(user)
        else setUser(null)
      })
    })
    const fetchCoins = async()=>{
      const {data} = await axios.get(CoinList(currency))
      setCoins(data)
  }
    useEffect(()=>{
        if(currency === 'USD')setSymbol('$');
        else if (currency === 'EUR')setSymbol('€')
    }, [currency])
  return (
    <Currency.Provider value={{currency, symbol, setCurrency, alert, setAlert,user,starred,coins,fetchCoins}}>
        {children}
    </Currency.Provider>
  )
}

export const CurrencyState=()=>{
    return useContext(Currency)
}
export default Context