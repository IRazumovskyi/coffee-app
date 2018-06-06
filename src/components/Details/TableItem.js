import React, {Component} from 'react';



export default class CoffeeItem extends Component{
	render(){
		let info=this.props.info;		
		return(
                    <tr>
                        <td>{info.banner.name}</td>
                        <td>{info.max}</td>
                        <td>{info.average.toFixed(2)}</td>
                        <td>{info.min}</td>
                        <td>{info.sum.toFixed(2)}</td>
                    </tr>
		);

	}
}