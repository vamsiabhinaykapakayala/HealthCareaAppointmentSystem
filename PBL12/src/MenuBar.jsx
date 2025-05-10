import React, { Component } from 'react';
import './MenuBar.css';
import { BASEURL, callApi, getSession } from './api';

export class MenuBar extends Component {
  constructor() {
    super();
    this.state = { menuItems: [] };
    this.loadMenus = this.loadMenus.bind(this);
  }

  componentDidMount() {
    let csr = getSession("csrid");
    let data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "menus/getmenusbyrole", data, this.loadMenus);
    //callApi("POST",BASEURL+"menus/getmenus","",this.loadMenus);
  }

  loadMenus(response) {
    let data = JSON.parse(response);
    this.setState({ menuItems: data });
  }

  render() {
    const { menuItems } = this.state;
    return (
      <div className='menubar'>
        <div className='menuheader'>
          Menu <img src='/menu.png' alt='' />
        </div>
        <div className='menulist'>
          <ul>
            {menuItems.map((row) => (
              <li
                key={row.mid} // Added the unique 'key' prop using row.mid
                onClick={() => this.props.onMenuClick(row.mid)}
              >
                {row.menu} <img src={row.icon} alt='' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MenuBar;