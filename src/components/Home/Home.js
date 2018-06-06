import React, { Component } from 'react';
import Header from "./../Header"
import CoffeeItem from "./CoffeeItem"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchCoffeeList} from '../../actions/apiCalls'

class Home extends Component {
    constructor(props){
        super(props); 
    }
    componentDidMount(){
        this.props.fetchCoffeeList();
        
    }
    
  render() {
    const coffeeList = this.props.list.map((coffee) =>{
        return(
                <CoffeeItem
                    id={coffee.id}
                    name={coffee.name}
                    key={coffee.id}                    
                />
            );
        });

    return (
        <div className="home-wrapper">
            <Header />
            <h1 >Home</h1>
            <div className="home-container">
                {coffeeList}
            </div>
        </div>      
    );
  }
}


const mapStateToProps = state => ({
    list:state.apiCalls.list
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCoffeeList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Home);
