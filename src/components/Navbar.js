import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {logout} from'../actions/authActionCreator';
import '../styles/navbar.css'
import { connect } from 'react-redux';
//import { connect } from '../index';

 class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

 logoutFromDevice=()=>{
    this.props.dispatch(logout());
    //console.log("====================logout=====================")
  }
  
  render() {
    console.log("========================Navbar Rendered=====================")
    const {auth}=this.props;
    return (
      auth.user?
      <div className="nav">
        <Link to="/">
           <button className='menuButton'>Home</button>
        </Link>

        <button className='menuButton' onClick={this.logoutFromDevice}>Log out</button>

        <div className='rounded-img-container'>
          <img src={require('../assets/myPhoto.jpg')} alt="user-pic" />
        </div>
      </div>
      :

      <div className="nav">
         <Link to="/users/signup">
          <button className='menuButton'>SignUp</button>
       </Link>

       <Link to="/users/login">
          <button className='menuButton'>Login</button>
       </Link>
      </div>
    );
  }
}
//export default Navbar;


function mapStateToProps(state){
  return{
   auth:state.auth
  }
}
const connectedNavbarComponent=connect(mapStateToProps)(Navbar);
export default connectedNavbarComponent;
