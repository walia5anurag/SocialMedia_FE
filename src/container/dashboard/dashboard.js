import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {dashboardStyle} from '../../assets/materialUiStyles/dashboardStyle'
import axios from 'axios'
import AlertDialogSlide from '../DialogueBOx/popUpBox'

class Dashboard extends Component{
constructor(props){
    super(props)
    this.state={
        postData:[],
        open:false
    }
}
componentDidMount(){
  let user = JSON.parse(localStorage.getItem('user'));
  const token=user.token
axios.get(`http://localhost:8080/`,{headers:{"Authorization":`Bearer ${token}`},params: { userId: user.user._id } })
    .then((response)=>{
      
       this.setState({
           postData:response.data.postData
       })
    })
   

} 
handleOpen=()=>{
    this.setState({
        open:true
    })
}
handleClose=()=>{
    this.setState({
        open:false
    })
    
}
handleSignOut=()=>{

    axios.post('http://localhost:8080/signout')
    .then((res)=>{
     
        localStorage.removeItem("user");
        localStorage.clear();
        this.props.history.push("/");
       
    })
}
 render(){
  

    const classes = dashboardStyle;
   
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          
          <Typography variant="h6" color="inherit" noWrap>
          Fakebook
          </Typography>
          <button onClick={this.handleSignOut}>Sign Out</button>
        </Toolbar>
      </AppBar>
      <main>
    
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              My Custom Social Media
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             Your all till now post here!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={this.handleOpen}>
                    Create Post
                  </Button>
                </Grid>
              
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
              
            {this.state.postData.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                     {card.body}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
        //PLace button here (if you want any button in the post tile)
                  </CardActions> */}
                </Card>
              </Grid>
            ))}
          {!this.state.postData.length &&(
              <div>
                  <h3>No post data</h3>
              </div>
          )} 
          </Grid>
        </Container>
      </main>
      <AlertDialogSlide open={this.state.open} handleClose={this.handleClose}/>
    </React.Fragment>
 
  );
            }
}
export default withStyles(dashboardStyle)(Dashboard)