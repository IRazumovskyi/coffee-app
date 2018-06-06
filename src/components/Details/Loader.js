import React, {Component} from 'react';

export default class Loader extends Component{    
    render(){
        const list=[];
        for(let i = 0; i < 8; i++){
            list.push(
                <tr key={i}>
                    <td><div className="loader"></div></td>
                    <td><div className="loader"></div></td>
                    <td><div className="loader"></div></td>
                    <td><div className="loader"></div></td>
                    <td><div className="loader"></div></td>
                 </tr>
            )
        }
        return(
            <table >
            <thead>
            <tr>
                <th>Name</th>
                <th>Max Price</th>
                <th>Average Price</th>
                <th>Min Price</th>
                <th>Sold Out</th>
            </tr>
            </thead>
            <tbody>
                { list}
            </tbody>            
            </table>             
        );

    }
}