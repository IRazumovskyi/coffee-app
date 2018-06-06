import React, { Component } from 'react';
import TableItem from "./TableItem";

export default class DetailsTableBottom extends Component {
    constructor(props){
        super(props);
        this.state={
            isSorted:{
                name: false,
                max: false,
                sum: false,
                min: false,
                average: false
            },
            listOfProperties:[]
        }
                    
    }
        componentWillReceiveProps(nextProps){            
                this.setState({listOfProperties:nextProps.listOfProperties });            
        }


    sortByName(){
        let temp=this.state.listOfProperties.slice();
        let boolTemp=Object.assign({}, this.state.isSorted);        
        if(boolTemp.name){
            temp.sort((a,b) =>{
                if(a.banner.name > b.banner.name ){
                    return -1
                }
                if(a.banner.name < b.banner.name ){
                    return 1
                }
                return 0;
            });
            boolTemp.name=false;
        } else{
            temp.sort((a,b) =>{
                if(a.banner.name < b.banner.name ){
                    return -1
                }
                if(a.banner.name > b.banner.name ){
                    return 1
                }
                return 0;
            });
            boolTemp.name=true;
        }
        this.setState({listOfProperties:temp,
            isSorted:boolTemp
        });
    }

    sortBy(value){     
        let temp=this.state.listOfProperties.slice();
        let boolTemp=Object.assign({}, this.state.isSorted);
        temp.sort((a,b) =>{
            if(boolTemp[value])         
                return a[value]<b[value];
            return a[value]>b[value];
        });
        boolTemp[value]=!boolTemp[value];
        this.setState({
            listOfProperties:temp,
            isSorted:boolTemp
        });
    }

  render() {
    console.log(this.props);  
    const list = this.state.listOfProperties.map((coffee) =>{
        return(
                <TableItem
                    info={coffee}
                    key={coffee.banner.id}
                />
            );
        });
    return (
  
            <table >
            <thead>
            <tr>
                <th onClick={()=>this.sortByName()}>Name</th>
                <th onClick={()=>this.sortBy("max")}>Max Price</th>
                <th onClick={()=>this.sortBy("average")}>Average Price</th>
                <th onClick={()=>this.sortBy("min")}>Min Price</th>
                <th onClick={()=>this.sortBy("sum")}>Sold Out</th>
            </tr>
            </thead>
            <tbody>
                { list}
            </tbody>            
            </table>

    );
  }
}


