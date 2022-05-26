import { Container, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsCard from '../components/NewsCard'
import { Options } from '../config/Apis'

const useStyles = makeStyles({
  link:{
    textTransform:'uppercase',
    background:'rgba(0, 0, 0, 0.7)',
    fontWeight:900,
    fontSize: 'xx-large'
  },
  image:{
    height:'60vh',
    width:'100%',
    objectFit: 'fill'
  }
})

const News = () => {
const[news, setNews] = useState([])
const classes = useStyles()

const fetchNews = async()=>{
  const {data} = await axios(Options)
  setNews(()=>(data))
}
useEffect(()=>{
  fetchNews()
}, [])

 if(!news) return <LinearProgress style={{backgroundColor: '#ED602B'}}/>
 console.log(news[1]);
  return (
    <Container>
        <div className={classes.image} style={{
        backgroundImage:`url(${news[0]?.image})`,

      }}>
        {<Typography className={classes.link}><a  href={news[0]?.url}>{news[0]?.title}</a></Typography>}
      </div>
      <Grid container spacing={2}>
        {news.map((item) => {
         return <NewsCard item={item} key={item.title}/>
        })}
      </Grid>
      
    </Container>
     
  )
}

export default News