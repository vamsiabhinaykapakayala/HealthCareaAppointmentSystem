import React, { Component } from 'react'
import './App.css';
import {BASEURL, callApi, setSession} from './api';

export default class App extends Component 
{
 constructor()
 {
  super();
  this.userRegistration = this.userRegistration.bind(this);
  this.forgotPassword = this.forgotPassword.bind(this);
  this.signin = this.signin.bind(this);
 }
  showSignin()
  {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupheader = document.getElementById("popupheader");
    popupheader.innerHTML = "Login";
    signup.style.display ="none";
    signin.style.display = "block";
    popup.style.display = "block";
    username.value="";
    password.value="";

  }
  showSignup()
  {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupheader = document.getElementById("popupheader");
    popupheader.innerHTML = "Create new account";
    signup.style.display ="block";
    signin.style.display = "none";
    popup.style.display = "block";

    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.value="";
    email.value="";
    role.value="";
    signuppassword.value="";
    confirmpassword.value="";

  }
closeSignin(event)
{
  if(event.target.id === "popup")
  {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
  }
}
userRegistration()
{
let fullname = document.getElementById("fullname");
let email = document.getElementById("email");
let role = document.getElementById("role");
let signuppassword = document.getElementById("signuppassword");
let confirmpassword = document.getElementById("confirmpassword");

fullname.style.border = "";
email.style.border = "";
role.style.border = "";
signuppassword.style.border = "";
confirmpassword.style.border = "";
if(fullname.value=="")
{
  fullname.style.border = "1px solid red";
  fullname.focus();
  return;
}
if(email.value=="")
{
  email.style.border = "1px solid red";
  email.focus();
  return;
}
if(role.value=="")
{
  role.style.border = "1px solid red";
  role.focus();
  return;
}
if(signuppassword.value=="")
{
  signuppassword.style.border = "1px solid red";
  signuppassword.focus();
  return;
}
if(confirmpassword.value=="")
{
  confirmpassword.style.border = "1px solid red";
  confirmpassword.focus();
  return;
}
            
if(signuppassword.value !== confirmpassword.value)
{
  signuppassword.style.border = "1px solid red";
  signuppassword.focus();
  return;
}
  
var data = JSON.stringify({
  fullname: fullname.value,
  email: email.value,
  role: role.value,
  password: signuppassword.value
});
callApi("POST", "http://localhost:9091/users/signup", data , this.getResponse)
}
getResponse(res)
{
  let resp = res.split('::');
  alert(resp[1]);
  if(resp[0] === "200" )
  {
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    signup.style.display = "none";
    signin.style.display = "block";
  }
}
forgotPassword()
{
  username.style.border="";
  if(username.value==="")
  {
    username.style.border = "1px solid red";
    username.focus();
    return;
  }
  let url = "http://localhost:9091/users/forgotpassword/"+username.value;
  callApi("GET",url,"",this.forgotPasswordResponse);
}

forgotPasswordResponse(res)
{
let data = res.split('::');
if(data[0]==="200")
  responseDiv.innerHTML = `<br/><br/><label style='color:green'>${data[1]}</label>`
else
 responseDiv.innerHTML = `<br/><br/><label style='color:red'>${data[1]}</label>`
}
signin()
{
  username.style.border = "";
  password.style.border = "";
  responseDiv.innerHTML = "";
  if(username.value === "")
  {
    username.style.border = "1px solid red";
    username.focus();
    return;
  }
  if(password.value === "")
  {
    password.style.border = "1px solid red";
    password.focus();
    return;
  }
  let data = JSON.stringify({
    email: username.value,
    password: password.value

  });
  callApi("POST",BASEURL + "users/signin", data, this.signinResponse);
}
signinResponse(res)
{
  let rdata = res.split('::');
  if(rdata[0] === "200")
  {
    setSession("csrid",rdata[1],1);
    window.location.replace("/dashboard");
  }
  else
  {
    responseDiv.innerHTML = `<br/><br/><label style = "color:red">${rdata[1]}</label>`;
  }
}
  render() {
    return (
      <div id="container">
        <div id='popup' onClick={this.closeSignin}>
          <div id="popupwindow">
            <div id="popupheader">Login</div>
            <div id="signin">
              <label className='usernameLabel'>User name*</label>
              <input type="text" id="username" />
              <label className='passwordLabel'>Password*</label>
              <input type="password" id='password' />
              <div className='forgotPassword'>Fortgot<label onClick={this.forgotPassword}>Password</label></div>

              <button className='signinButton' onClick={this.signin}>Sign In</button>
              <div className='div1' id='responseDiv'></div>
              <div className='div2'>
                Don't have an account?
                <label onClick={this.showSignup}>SIGN UP NOW</label>
              </div>
          </div>
          <div id="signup">
            <label>Full Name*</label>            <input type="text" id='fullname' />
            <label>Email</label>            <input type="text" id='email' />
            <label>Select Role</label>
            <select id='role'>
              <option value='1'>Doctor</option>
              <option value='2'>Patient</option>
            </select>
            <label>Password</label>  <input type="password" id='signuppassword' />
            <label>Confirm Password</label>  <input type="password" id='confirmpassword' />
            <button onClick={this.userRegistration}>Register</button>
            <div>Already have an account? <span onClick={this.showSignin}>SIGN IN</span></div>
          </div>
          </div>
        </div>
         <div id="container">
        <div id="header">
            <img className='logo' src='/1.jpg' alt=''  />
            <div className='logoText'><span>Health</span>Care</div>
            <img className='signinIcon' src='/user.png' alt='' onClick={this.showSignin}/>
            <label className='signinText' onClick={this.showSignin} >Sign in</label>
        </div>
        </div>
        
        
        
      </div>
    )
  }
}

