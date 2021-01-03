import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import {loginStyles} from '../../assets/materialUiStyles/loginStyle'
import axios from 'axios'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function Copyright() {
  return (
    <div>
      {" "}
      <Typography variant="body2" color="textSecondary" align="center">
        {"Made by Anurag Walia"}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link
          color="inherit"
          href="https://www.linkedin.com/in/anurag-walia-610265157/"
        >
          LinkedIn Profile
        </Link>{" "}
      </Typography>
    </div>
  );
}


class Register extends Component {
  constructor(props) {
    super(props);
  this.state={
    email:'',
    password:'',
    name:''
  }

  }
  handler=(evt)=>{
    console.log(evt.target.name,evt.target.value)
    this.setState({
   [evt.target.name]:evt.target.value
    })
  }


  handleRegister=(evt)=>{
    evt.preventDefault();
  
axios.post('http://localhost:8080/signup',{
  name:this.state.name,
  email:this.state.email,
  password:this.state.password
})
     .then((res)=>{
       setTimeout(() => {
         this.props.history.push('/')
       }, 6000);
     
       toast(res.data.message)
    
  
      })
      .catch((err)=>{
        console.log(err.status)
        toast('Please enter correct values in the fields')

      })
    
    }
  render() {

    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Register For Zoot!
            </Typography>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Enter Your Name"
                name="name"
                onChange={this.handler}
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handler}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleRegister}
              >
               Register Me
              </Button>
             
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(loginStyles)(Register);
