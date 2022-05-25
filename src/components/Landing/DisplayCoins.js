import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useState , useEffect} from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { TrendingCoins } from '../../config/Apis'
import { CurrencyState } from '../Context'

const useStyles = makeStyles({
    coins:{
        height: '50%',
        display:'flex',
        // alignItems:'center',
    },
    oneCoin:{
        color:'white',
        cursor: 'pointer',
        textDecoration:'none'
    }
})

const DisplayCoins = () => {
    const [coins, setCoins] = useState([])
    const classes = useStyles()
    const { currency, symbol} = CurrencyState()

    const fetchCoins = async()=>{
        const {data} = await axios.get(TrendingCoins(currency));
        setCoins(data);
    };
    useEffect(() => {
      fetchCoins()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])
    
    const items = coins.map((coin)=>{
        let profit = coin.price_change_percentage_24h >0
        return(
            <Link to={`/coins/${coin.id}`} className={classes.oneCoin}>
                <img src={coin.image} alt={coin.name} height='70' />
                <div>
                    {coin.symbol.toUpperCase()}
                    <span 
                        style={{color: profit? '#39D004' : 'red'}}
                    >
                        {profit &&'+'}{coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                    <div>
                        {symbol}{coin.current_price.toFixed(2)}
                    </div>
                </div>
            </Link>
        )
    })

    const responsive ={
        0: {
            items: 2
        },
        512:{
            items: 4
        }
    }
     
  return (
    <div className={classes.coins}>
        <AliceCarousel
            mouseTracking
            autoPlay
            infinite
            autoPlayInterval={1000}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}

            items={items}
        />
   </div>
  )
}

export default DisplayCoins