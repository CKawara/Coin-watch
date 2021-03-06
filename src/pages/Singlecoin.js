import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CurrencyState } from '../components/Context';
import { SingleCoin } from '../config/Apis';
import ReactHtmlParser from 'react-html-parser'
import CoinChart from '../components/CoinChart';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const useStyles = makeStyles((theme)=>({
  container:{
    display:'flex',
    [theme.breakpoints.down('md')]:{
      flexDirection:'column',
      alignItems: 'center',
    },
  },
  detail:{
    width: '30%',
    [theme.breakpoints.down('md')]:{
      width:'100%'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:30,
  },
  description:{
    width:"100%",
    padding: 25,
    textAlign:'justify',
  }
}))

const Singlecoin = () => {
   const {id}= useParams();
   const [coin, setCoin] = useState()
   const {currency, symbol, user, starred, setAlert} =  CurrencyState()

   const fetchCoin = async()=>{
     const {data} = await axios.get(SingleCoin(id))
     setCoin(data)
   }

   useEffect(()=>{
     fetchCoin()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currency])
   const classes = useStyles()

   const inStarredList = starred.includes(coin?.id)

   const starCoin = async () => {
     const coinRef = doc(db,'starred', user.uid)

     try{
       await setDoc(coinRef, 
          {coins:starred?[...starred,coin.id]:[coin.id],}
        )
        setAlert({
          open: true,
          message:`${coin?.name} added to Favorites`,
          type: 'success',
        })
     }catch(error){
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
    });
     }
   }

   const removeFromStarred = async () => {
    const coinRef = doc(db,'starred', user.uid)

    try{
      await setDoc(coinRef, 
         {coins:starred.filter((star)=> star !== coin.id)},
         {merge: true}
       )
       setAlert({
         open: true,
         message:`${coin?.name} removed from Favorites`,
         type: 'success',
       })
    }catch(error){
     setAlert({
       open: true,
       message: error.message,
       type: 'error'
   });
    }
   }

   if(!coin) return <LinearProgress style={{backgroundColor: '#ED602B'}}/>

   return (
    <div className={classes.container}>
      <div className={classes.detail}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height='150'
          style={{marginBottom: 20}}
        />
        <Typography variant='h3'style={{fontWeight:'bolder'}}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}
        </Typography>
        <div className={classes.description}>
          <Typography style={{fontWeight: 'bolder'}}>Rank: {coin?.market_cap_rank}</Typography>
          <Typography style={{fontWeight: 'bolder'}}>
            Price: {symbol} {coin?.market_data.current_price[currency.toLowerCase()].toFixed(2)}
          </Typography>
          <Typography style={{fontWeight: 'bolder'}}>
            market cap: {symbol} {coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)}M
          </Typography>

          {user && (
            <button
              style={{
                width: '70%',
                backgroundColor: '#ED602B',
                color: 'black',
                padding: 10,
                fontWeight:900,
                fontSize: 'large'
              }}
              onClick={inStarredList? removeFromStarred : starCoin}
             >{inStarredList?'Remove from Favorites' : 'Add to Favorites'}</button>
          )}
        </div>       
      </div>
      {/* chart */}
      <CoinChart coin={coin}/>
    </div>
  )
}

export default Singlecoin