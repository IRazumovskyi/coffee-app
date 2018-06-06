import React, { Component } from 'react';
import {openModal} from "../../actions/modal";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class DetailsTop extends Component {
  render() {
    return (
        <div className="details-wrapper">
            <h1>{this.props.isLoading ? "Loading..." : this.props.coffee.name }</h1>           
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Max Price</th>
                    <th>Average Price</th>
                    <th>Min Price</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{this.props.coffee.name}</td>
                    <td>{this.props.total.max}</td>
                    <td> {!this.props.isLoading && Number.parseFloat(this.props.total.average).toFixed(2)}</td>
                    <td>{this.props.total.min}</td>
                </tr>
                </tbody>

            </table>
            <div className="order-buttons">
                <button className="pickdata btn">                
                 <input  className="date-picker" type="date" name="from" min={this.props.minDate} max={this.props.maxDate} value={this.props.dateFrom} onChange={this.props.handleChange} />
                <img                         
                        src={require("../../assets/date-arrow.png")}
                        alt="avatar"
                />                             
                 <input  className="date-picker" type="date" name="to"  min={this.props.minDate} max={this.props.maxDate}  value={this.props.dateTo} onChange={this.props.handleChange} /> 
                 </button>
                <button className="create-report btn" onClick={this.props.openModal}>Create Report</button>
            </div>
        </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    openModal
}, dispatch);

export default connect(null, mapDispatchToProps) (DetailsTop);


