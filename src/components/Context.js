import React, { createContext, useContext, useEffect, useState } from 'react'

const Currency = createContext()

const Context = ({children}) => {
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")
    const [user, setUer] = useState(null)
    const[alert, setAlert] = useState({
      open:false,
      message: '',
      type: 'success'
    })

    useEffect(()=>{
        if(currency === 'USD')setSymbol('$');
        else if (currency === 'EUR')setSymbol('€')
    }, [currency])
  return (
    <Currency.Provider value={{currency, symbol, setCurrency, alert, setAlert}}>
        {children}
    </Currency.Provider>
  )
}

export const CurrencyState=()=>{
    return useContext(Currency)
}
export default Context