import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import DisplayCoins from './DisplayCoins'

const useStyles = makeStyles({
    Landing:{
        backgroundImage: 'url(./Landing-page-image.jpg)',
    },
    content:{
        height: 350,
        display: 'flex',
        flexDirection:'column',
        paddingTop:20,
        justifyContent: 'space-between',
        textAlign: 'center',
        fontWeight: 'bolder'
    }
})

const Landing = () => {
    const classes = useStyles()
  return (
    <div className={classes.Landing}>
        <Container className={classes.content}>
            <Typography variant='h5'>
            One Stop Shop For <span>All</span> The Crypto <span>Information</span> You Need!!
            </Typography>
            <DisplayCoins/>
        </Container>
    </div>
  )
}

export default Landing