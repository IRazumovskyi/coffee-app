import React, { Component } from 'react';
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    return (
        <div className= {`header ${this.props.isChanged && "changed-theme"}`} >
            <div className="logo">
                <a>
                    <img  className="logo-img" src={require("./../assets/logo.png")} alt="logo" />
                </a>
            </div>
            <div className="header-nav">
                <a>
                    <img className="header-nav-search" src={require("../assets/search.png")} alt="search" />
                </a>
                <a>
                    <img className="header-nav-notifications" src={require("../assets/notifications.png")} alt="notifications"/>
                </a>
                <a className="hoover">
                    Hoover 
                    <img className="" src={require("../assets/arrow.png")} alt="arrow" />                    
                </a>
                <a>
                    <img className="" src={require("../assets/avatar.png")} alt="avatar"/>
                </a>
            </div>    
        </div>
      
    );
  }
}

const mapStateToProps = state => ({
    isChanged:state.changeTheme.isChanged
});


export default connect(mapStateToProps) (Header);


