import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../Firebase'

const Currency = createContext()

const Context = ({children}) => {
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")
    const [user, setUser] = useState(null)
    const[alert, setAlert] = useState({
      open:false,
      message: '',
      type: 'success'
    })
    const [starred, setStarred] = useState([])

    useEffect(()=>{
      onAuthStateChanged(auth, user =>{
        if (user)setUser(user)
        else setUser(null)
      })
    })

    useEffect(()=>{
        if(currency === 'USD')setSymbol('$');
        else if (currency === 'EUR')setSymbol('€')
    }, [currency])
  return (
    <Currency.Provider value={{currency, symbol, setCurrency, alert, setAlert,user,starred}}>
        {children}
    </Currency.Provider>
  )
}

export const CurrencyState=()=>{
    return useContext(Currency)
}
export default Context