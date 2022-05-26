import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    card:{
        width: 345,
        height: 'auto',
        backgroundColor : 'transparent',
        border: '1px solid #333333',
        color: 'white'
    }
})

const NewsCard = ({item}) => {
    const classes = useStyles()
  return (
    <Grid item xs={12} sm={4} style={{marginTop : 30}}>
        <Card  className={classes.card}>
            <CardActionArea>
                <CardMedia component="img" image={`${item.image}`}/>
                <CardContent>
                    <Typography ><a style={{
                        color:'white',
                        fontWeight: '900',
                        
                    }} href={item.url}>{item.title}</a></Typography>
                    <br/>
                    <Typography style={{color:'grey'}}>{item.desc}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </Grid>

  )
}

export default NewsCard