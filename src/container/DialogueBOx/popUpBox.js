import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import axios from 'axios'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class AlertDialogSlide extends Component {
  constructor(props){
    super(props)
this.state={
  title:'',
  body:''
}
  }
  handlePost=()=>{
    let user = JSON.parse(localStorage.getItem('user'));
    const token=user.token
    console.log(token)
    if(!token){
      console.log("hi")
    }
axios.post('http://localhost:8080/post',{
  title:this.state.title,
  body:this.state.body
},{headers:{"Authorization":`Bearer ${token}`}})
.then((res)=>{
  console.log(res)
  toast('Successfully logged in')

setTimeout(()=>{
  this.props.handleClose()
},2000)
})
 .catch((err)=>{
   toast('An error has occurred!')
   setTimeout(()=>{
    this.props.handleClose()
  },3000)
  })

  }
  handlePostState=(evt)=>{
    this.setState({
      [evt.target.name]:evt.target.value
    })
  }
  render(){

  return (
    <div>
     
      <Dialog
        open={this.props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Write you post"}</DialogTitle>
        <DialogContent>
       
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title of your post"
                name="title"
                onChange={this.handlePostState}
         
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline rows="10"
                id="body"
                label="Write your post"
                name="body"
                onChange={this.handlePostState}
            
              />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
         Cancel
          </Button>
          <Button onClick={this.handlePost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
}
