import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class CoffeeItem extends Component{
	render(){
		return(
			<Link to={"/details/" + this.props.id} className="home-item">
				<img src={require(`../../assets/${this.props.name}.png`)} alt = {this.props.name} />
				<h3>{this.props.name}</h3>
			</Link>
		);

	}
}