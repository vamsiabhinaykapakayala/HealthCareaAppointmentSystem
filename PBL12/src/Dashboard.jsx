import React, { Component } from 'react'
import './Dashboard.css';
import { BASEURL, callApi, getSession, setSession } from './api';
import MenuBar from './MenuBar';
import JobPosting from './JobPosting';
import JobSearch from './JobSearch';
import Profile from './Profile';
import DoctorAppointment from './DoctorAppointment';

export default class Dashboard extends Component {
  constructor(props)
  {
    super(props);
    this.state ={fullname:'', activeComponent:''};
    this.showFullname = this.showFullname.bind(this);
    this.loadComponent = this.loadComponent.bind(this);
  }
  componentDidMount()
  {
    let csr = getSession("csrid");
    if(csr==="")
      this.logout();
    let data = JSON.stringify({csrid: csr});
    callApi("POST",BASEURL+"users/getfullname", data, this.showFullname);
  }
 showFullname = (response) => {
    const parts = response.split('::');
    if (parts.length > 1) {
      this.setState({ fullname: parts[1] }); // Extract the fullname
    } else {
      console.error('Invalid fullname response:', response);
      // Optionally handle the error, e.g., set a default name or log out
    }
  };
  logout()
  {
    setSession("csrid", "",-1);
    window.location.replace("/");
  }
  loadComponent(mid)
  {
    let components = {
      "1":<JobPosting/>,
      "2":<JobSearch/>,
      "3":<Profile/>,
      "4":<DoctorAppointment loggedInFullname={this.state.fullname}/>       
    };
    this.setState({activeComponent: components[mid]});
  }
 render() {
    const { fullname, activeComponent } = this.state;
    return (
      <div className='dashboard'>
        <div className='header'>
    <div className='logo-container'>
        <img className='logo' src='/1.jpg' alt='' />
        <div className='logoText'>Health <span>Care</span></div>
    </div>
    <div className='user-section'>
        <label>{fullname}</label>
        <img className='logout' onClick={() => this.logout()} src='/logout.png' alt='' />
    </div>
</div>
        <div className='menu'><MenuBar onMenuClick={this.loadComponent} /></div>
        <div className='outlet'>{activeComponent}</div>
      </div>
    )
  }
}
