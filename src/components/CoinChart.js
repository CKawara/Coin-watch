import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {  Line } from 'react-chartjs-2'
import { HistoricalChart } from '../config/Apis'
import { CurrencyState } from './Context'
import { Chart, registerables } from 'chart.js';
import { chartDays } from '../config/ChartDays'
import ChartButton from './ChartButton'
Chart.register(...registerables);

const useStyles = makeStyles((theme)=>({
  container:{
    width:'70%',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    marginTop:25,
    padding:20,
    [theme.breakpoints.down('md')]:{
      width: '100%',
      marginTop:0,
      paddingTop:0
    }
  },
  buttonContainer:{
    display: 'flex',
    marginTop:20,
    justifyContent: 'space-around',
    width:'100%'
  }
}))
const CoinChart = ({coin}) => {
  const [chartData, setChartData]=useState()
  const[days, setDays] = useState(1)
  const{currency} = CurrencyState()

  const fetchChartData = async()=>{
    const{data} = await axios.get(HistoricalChart(coin.id,days,currency))
    setChartData(data.prices)
  }
  console.log(chartData);

  useEffect(() => {
    fetchChartData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency,days])
  
  const darkTheme = createTheme({
    palette:{
        primary:{
            main: '#fff',
        },
        type: "dark"
    },
})
const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!chartData?(
          <CircularProgress style={{color:'#ED602B' }} size={200} thickness={1} />
        ) : (
            <>
              <Line 
                data={{
                  labels:chartData.map((coin)=>{
                    let date = new Date(coin[0])
                      let time = date.getHours() > 12 ? 
                        `${date.getHours() - 12}:${date.getMinutes()} PM` :
                        `${date.getHours()}:${date.getMinutes()} AM`
                    return days === 1? time:date.toLocaleDateString()
                  }),
                  datasets:[{
                    data: chartData.map((coin)=> coin[1]),
                    label: `Price in ${currency}`,
                    borderColor: '#ED602B'
                  }],
                }}
                options ={{
                  elements: {
                    point:{
                      radius:1,
                    },
                  }
                }}
              />
              <div className={classes.buttonContainer}>
                {
                  chartDays.map((day)=>(
                    <ChartButton
                    key={day.value}
                    handleClick={()=>setDays(day.value)}
                    selected={day.value === days}
                    >{day.label}</ChartButton>
                  ))
                }
              </div>
            </>
        )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinChart