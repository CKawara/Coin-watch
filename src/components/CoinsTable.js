import { Container, createTheme,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../config/Apis'
import { CurrencyState } from './Context'


// const useStyles = makeStyles({
//     pagination:{
//         '&.MuiPaginationItem-root':{
//             color: '#39D004',
//         },
//     }
// })
const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const[search, setSearch] = useState()
    const[page, setPage] = useState(1)
    const history = useNavigate()
    const {currency, symbol} =CurrencyState()

    const fetchCoins = async()=>{
        const {data} = await axios.get(CoinList(currency))
        setCoins(data)
    }
    useEffect(() => {
      fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])
    
    const darkTheme = createTheme({
        palette:{
            primary:{
                main: '#fff',
            },
            type: "dark"
        },
    })
    const handleSearch = ()=>{
        return coins.filter((coin)=>{   
            if (!search) return coins
            else
           return coin.name.toLowerCase().includes(search)
        })
    }
    
    // const classes = useStyles()
    
  return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign: 'center'}}>
                <TextField label='Search for a Cryptocurrency...' 
                variant='outlined' 
                style={{marginTop:20, marginBottom:20, width:'100%'}}
                onChange={(e)=>setSearch(e.target.value)}/>
                <TableContainer>
                    <Table>
                        <TableHead style={{backgroundColor: '#ED602B'}}>
                        {['Coin', 'Price', 'Change'].map((data)=>(
                            <TableCell
                            style={{
                                color:'black',
                                fontWeight: '800'
                            }}
                            key={data}
                            >{data}</TableCell>
                        ))}
                        </TableHead>
                        <TableBody>
                            { // diplay 10 items per page according to page number
                                handleSearch().slice((page-1)*10, (page-1)*10+10)
                                    .map((row)=>{
                                    let profit = row.price_change_percentage_24h >0
                                    return(
                                        <TableRow 
                                            onClick={()=> history(`/coins/${row.id}`)}
                                            key={row.name}>
                                            <TableCell
                                                component='th'
                                                scope='row'
                                                style={{
                                                    display: 'flex', gap: 15,
                                                }}>
                                                <img src={row.image}
                                                alt={row.name} height='50'/>
                                                <span style={{
                                                    color:'white',
                                                    fontWeight:800,
                                                }}>
                                                    {row.symbol.toUpperCase()}
                                                    <div>{row.name}</div>
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {symbol} {row.current_price.toFixed(2)}
                                            </TableCell>
                                            <TableCell style={{color:profit? '#39D004' : 'red'}}>
                                                {profit && '+'}{row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination style={{
                    padding:25,
                    display: 'flex',
                    justifyContent: 'center',
                }}
                // classes={{ul: classes.pagination}}
                count={(handleSearch().length/10).toFixed(0)}
                onChange={(_,value)=>{
                    setPage(value)
                    window.scroll(0, 400)
                }}
                />
            </Container>

        </ThemeProvider>
    )
}

export default CoinsTable