import React, { Component } from 'react';
import Header from "./../Header";
import Modal from '../Modal/Modal';
import ModalForm from "./ModalForm";
import DetailsTop from "./DetailsTop";
import DetailsTable from "./DetailsTable";
import Loader from "./Loader";
import DetailsTableBottom from "./DetailsTableBottom";
import {fetchCoffeeDetails} from "../../actions/apiCalls";
import {closeModal} from "../../actions/modal";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Details extends Component {
    constructor(props){
        super(props);
        this.state  = {
            list:[],
            listOfProperties:[],
            total:{},
            coffee:{},
            isLoading:true,
            from:"",
            to:"",
            minDate:"",
            maxDate:""
        }
    }

    componentDidMount(){
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {             
              resolve();
            }, 2000);          
          });
          promise
          .then(()=>{ return this.props.fetchCoffeeDetails(this.props.match.params.id)})
            .then(()=>{                    
                    let dateFrom = this.props.details[0].pricingDataByWeek[0].week;
                    if(dateFrom===9)
                        dateFrom= "0"+dateFrom.slice();
                    dateFrom=dateFrom.split("/").reverse().join("-");
                    let dateTo = this.props.details[0].pricingDataByWeek[9].week;
                        if(dateTo===9)
                        dateTo= "0"+dateFrom.slice();
                    dateTo=dateTo.split("/").reverse().join("-");
                    this.setState({
                        list:this.props.details,
                        coffee:this.props.coffee,
                        isLoading:false,
                        from:dateFrom,
                        to:dateTo,
                        minDate:dateFrom,
                        maxDate:dateTo
                    })
                    this.caclulateProperties(); 
            });

    }
    caclulateProperties(){
        let past =new Date(this.state.from);
        let future =new Date(this.state.to);
        const coffeeList =[];
        for(let j = 0; j< this.state.list.length;j++){
        let coffee=this.state.list[j];            
        let priceList=[];
        for(let i = 0 ; i< coffee.pricingDataByWeek.length;i++){
            if(coffee.pricingDataByWeek[i].week.length===9)
                 coffee.pricingDataByWeek[i].week= "0"+coffee.pricingDataByWeek[i].week.slice();
            let now = new Date(coffee.pricingDataByWeek[i].week.split("/").reverse().join("-"));
           if(now.getTime()<=future.getTime() && now.getTime() >= past.getTime())
            priceList.push(+coffee.pricingDataByWeek[i].price);
        }
       if(!priceList.length)
        continue;
        let min, max, average,sum=0;
        min = Math.min(...priceList);  
        max = Math.max(...priceList);           
        sum = priceList.reduce((acc,val) =>{return acc + val},0); 
        average=sum/priceList.length;
        coffeeList.push( {
            banner:coffee.banner,
            min:min,
            max:max,
            sum:sum,
            average:average                
        });
    };

    if(!coffeeList.length){
        let newTotal={
            max:0,
            min:0,
            average: 0
        }
        this.setState({
            listOfProperties: coffeeList,
            total:newTotal,
        });
        return;    
    }       
    const minList =  coffeeList.map((element) => element.min);
    const maxList =  coffeeList.map((element) => element.max);
    const averageList =  coffeeList.map((element) => element.average);
    let totalMax=Math.max(...maxList);
    let totalmin=Math.min(...minList);
    let sum = averageList.reduce((acc,val) => acc + val);
    let average=sum/ coffeeList.length;
    let newTotal={
        max:totalMax,
        min:totalmin,
        average: average
    }
    this.setState({
        listOfProperties: coffeeList,
        total:newTotal,
    });    
}


    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
        this.caclulateProperties();
    }

  render() {
    return (
        <div style={{width:"100%"}}>
            <Header />
            <DetailsTop                
                coffee={this.state.coffee}
                isLoading={this.state.isLoading}
                total={this.state.total}
                maxDate={this.state.maxDate}
                minDate={this.state.minDate}
                dateFrom={this.state.from}
                dateTo={this.state.to}
                openModal={this.openModal}
                handleChange={this.handleChange}
            />

            <DetailsTable>
                {this.state.isLoading ? <Loader/> :  <DetailsTableBottom listOfProperties={this.state.listOfProperties}/> } 
            </DetailsTable> 

           <Modal >
            <ModalForm 
                closeModal={this.props.closeModal}
                list={this.state.list}               
                coffee={this.state.coffee}
                minDate={this.state.minDate}
                maxDate={this.state.maxDate}
            />        
           </Modal>
        </div>
    );
  }
}

const mapStateToProps = state => ({
    details: state.apiCalls.details,
    coffee:state.apiCalls.coffee,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCoffeeDetails,
    closeModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Details);
