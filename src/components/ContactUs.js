import { Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { Facebook, FavoriteBorder, Instagram, Telegram, Twitter, YouTube } from '@material-ui/icons'
import React, { useState } from 'react'
import { CurrencyState } from './Context'

const useStyles = makeStyles({
    contact :{
        height:'35vh',
        backgroundColor:'#333333',
        textAlign:'center',
        padding:15
    },
    btn:{
        border:'1px solid #ED602B',
        padding:10,
        background:'#ED602B',
        fontWeight: 900,
    },
    icons:{
        display: 'flex',
        justifyContent: 'space-evenly',
        fontSize: 'large'
    },
    footer:{
        backgroundColor:'black',
        padding:10,
        textAlign: 'center'
    }

})
const ContactUs= () => {

    const classes = useStyles()
    const[email, setEmail] = useState('')
    const[name, setName] = useState('')
    const{setAlert} = CurrencyState()

    const handleSubmit = () => {
        if(!email || !name){
            setAlert({
                open:true,
                message: 'Fill all the fields!!',
                type: 'error',
            })
            return;
        } else{
            setAlert({
                open: true,
                message: `Thank you ${name} for subcribing`,
                type: 'success'
            })
        }
    }

  return (
      <>
    <div className={classes.contact}>
        <h2>Talk To Us</h2>
        <Grid container>
        <Grid item xs={12} sm={6}>
        <Typography style={{color: 'white'}}>Let's Socialize</Typography>
            <span className={classes.icons}>
            <Instagram fontSize='large'/>
            <Facebook fontSize='large'/>
            <Twitter fontSize='large'/>
            <YouTube fontSize='large'/>
            <Telegram fontSize='large'/>
            </span>
        </Grid>
        <Grid item xs={12} sm={6}>
        <form >
        <TextField
            
            variant='outlined'
            type='email'
            label='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            fullWidth
        />
        <TextField
            variant='outlined'
            type='name'
            label='Enter name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            fullWidth
        />
        <button className={classes.btn}
            onClick={handleSubmit}
        >
         Subscribe
        </button>
        </form>
        </Grid>
        </Grid>
    </div>
    <div className={classes.footer}>Made with <span><FavoriteBorder fontSize='small' /> </span> by <span>CKawara</span> </div>
    </>
  )
}

export default ContactUs
