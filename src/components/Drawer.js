import React, { Component } from 'react';
import { Link} from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {switchColor} from '../actions/changeTheme'


class Drawer extends Component {
  render() {
    return (
      <div className= {`drawer ${this.props.isChanged && "changed-theme"}`} >
            <div className="drawer-btn"></div>
            <div className="drawer-nav">
                <Link to="/">
                    <img className="drawer-nav-img" src={require("../assets/icons/home.png")} alt="home" />
                </Link>
                <a>
                    <img className="drawer-nav-img" src={require("../assets/icons/dashboard.png")} alt="dashboard" />
                </a>
                <a>
                    <img className="drawer-nav-img" src={require("../assets/icons/statistic.png")} alt="statistic" />
                </a>
                <a>
                    <img className="drawer-nav-img" src={require("../assets/icons/bookmark.png")} alt="bookmark" />
                </a>
                <a>
                    <img className="drawer-nav-img" src={require("../assets/icons/files.png")} alt="files" />
                </a>
                <a>
                    <img className="drawer-nav-img" src={require("../assets/icons/help.png")} alt="help" />
                </a>
            </div>
            <a className="settings" onClick={()=>this.props.switchColor()}>
                <img  className="drawer-nav-img" src={require("../assets/settings.png")} alt="settings" />
            </a>
        </div>
      
    );
  }
}


const mapStateToProps = state => ({
    isChanged:state.changeTheme.isChanged
});
const mapDispatchToProps = dispatch => bindActionCreators({
    switchColor
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Drawer);


