import React, { Component } from 'react';

export default class ModalForm extends Component {
    constructor(props){
        super(props);
        this.state  = {
            from:this.props.minDate,
            to:this.props.maxDate,
            listOfMails:[],
            sortedBy:{
                name: false,
                max: false,
                sum: false,
                min: false,
                average: false
            },
            emailValue:"",
            isShowDatePicker:false,
            isValid:false,
            touched:false
        }
        this.handleChangeEmail=this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    sortBy(value){  
        let temp= Object.assign({}, this.state.sortedBy);
        if(temp[value]){
            for(let key in temp){
                temp[key]=false;
            }           
            this.setState({sortedBy:temp});
            return;
        }
        for(let key in temp){
            temp[key]=false;
        }
        temp[value]=true;
        this.setState({sortedBy:temp});
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });        
    }

    handleChangeEmail(event){
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        let res =re.test(String(event.target.value).toLowerCase());
        this.setState({emailValue: event.target.value, isValid:res});
        event.preventDefault();
    }

    addEmail = () =>{
        if(!this.state.isValid || !this.state.touched){
            return;
        }
        let temp = this.state.listOfMails.slice();
        temp.push(this.state.emailValue);
        this.setState({
            listOfMails:temp,
            emailValue:"",
            isValid:false, 
            touched:false
        })
    };
    addDatePicker = () =>{
        this.setState({
            isShowDatePicker:true
        })
    };
    removeDatePicker = () =>{
        this.setState({
            from:this.props.minDate,
            to:this.props.maxDate,
            isShowDatePicker:false
        })
    };
    removeEmail(i){
        let temp=this.state.listOfMails.slice();
        temp.splice(i,1);
        this.setState({listOfMails:temp});
    }

    handleSubmit(event) {   
        this.caclulateProperties()     
        event.preventDefault();
    }

    handleBlur = (evt) => {
      this.setState({
        touched: true 
    }); 
      evt.preventDefault();
    }

    caclulateProperties(){
            let past =new Date(this.state.from);
            let future =new Date(this.state.to);
            const coffeeList =[]; 
            for(let j = 0; j< this.props.list.length;j++){
            let    coffee=this.props.list[j];            
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
            return;    
        }      
        const minList =  coffeeList.map((element) => element.min);
        const maxList =  coffeeList.map((element) => element.max);
        const averageList =  coffeeList.map((element) => element.average);
        let totalMax=Math.max(...maxList);
        let totalmin=Math.min(...minList);
        let sum = averageList.reduce((acc,val) => acc + val);
        let average=sum/ coffeeList.length;
        let typeOfSort="";       
        for(let key in this.state.sortedBy){
            if(this.state.sortedBy[key]===true)
            typeOfSort=key;
        }       
        if(!typeOfSort){     
        } else if(typeOfSort==="name"){           
            this.sortByName(coffeeList);
        } else{            
            this.sortList(typeOfSort, coffeeList);
        }

        let newTotal={
            max:totalMax,
            min:totalmin,
            average: average
        }
    }

    sortByName(arr){
            arr.sort((a,b) =>{
                if(a.banner.name < b.banner.name ){
                    return -1
                }
                if(a.banner.name > b.banner.name ){
                    return 1
                }
                return 0;
            });         
     }
    
    sortList(value, arr){
        arr.sort((a,b) =>{            
            return a[value]>b[value];
        });

    }

    render() {
    const listOfMails=this.state.listOfMails.map((email, index) => {
        return(
             <div key = {index} className="form-active">
                <img onClick={()=>this.removeEmail(index)} src={require("../../assets/form-close.png")} alt="remove" />
                {email}
            </div>
            );
    });
    
    return (
        <form className="modal-form" onSubmit={this.handleSubmit}>
            <h1>Create Report</h1>
            <h3>{this.props.coffee.name}</h3>
            <p>Period</p>

            {!this.state.isShowDatePicker &&                 
                <div className="form-plus" onClick={this.addDatePicker}>
                    <img src={require("../../assets/form-plus.png")}  alt="delete" /> 
                </div>
            }
            {this.state.isShowDatePicker &&   
            <div className="modal-btn btn">
            <img onClick={this.removeDatePicker} src={require("../../assets/form-close.png")} alt="remove" />
            <input  className="date-picker" type="date" name="from" min={this.props.minDate} max={this.props.maxDate} value={this.state.from} onChange={this.handleChange} />
            <img src={require("../../assets/form-arrow.png")} alt="to" />  
              <input  className="date-picker" type="date" name="to"  min={this.props.minDate} max={this.props.maxDate}  value={this.state.to} onChange={this.handleChange} />            
              </div>
            }
            <p>Sort By</p>
            <div className="modal-sort-container">
              <div className={`modal-sort-item ${this.state.sortedBy.name && 'form-active'}`} onClick={() => this.sortBy("name")} >Name</div>
              <div className={`modal-sort-item ${this.state.sortedBy.max && "form-active"}`} onClick={() => this.sortBy("max")}>Max Price</div>
              <div className={`modal-sort-item ${this.state.sortedBy.average && "form-active"}`} onClick={() => this.sortBy("average")}>Average Price</div>
              <div className={`modal-sort-item ${this.state.sortedBy.min && "form-active"}`} onClick={() => this.sortBy("min")}>Min Price</div>
              <div className={`modal-sort-item ${this.state.sortedBy.sum && "form-active"}`} onClick={() => this.sortBy("sum")}>Sold Out</div>
            </div>
            <p>Email</p>
            <div className="form-emails">
                {listOfMails}
                <input                 
                    className={`email-input ${!this.state.isValid && this.state.touched && 'no-valid'}`} 
                    type="email" 
                    value={this.state.emailValue} 
                    onChange={this.handleChangeEmail} 
                    placeholder="enter Email"
                    onBlur={this.handleBlur}                
                />              
                <div className="form-plus" onClick={this.addEmail}>
                    <img src={require("../../assets/form-plus.png")} alt="plus" /> 
                </div>            
            </div>
            <div className="form-buttons">
               <button className="form-cancel" onClick={this.props.closeModal}>Cancel</button>
               <input className="form-create" type="submit" value="Create" />
            </div>
        </form>
    );
  }
}


