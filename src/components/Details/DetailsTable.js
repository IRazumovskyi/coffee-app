import React, { Component } from 'react';

export default class DetailsTable extends Component {
  render() {
    return (
        <div className="details-wrapper">
            {this.props.children}
        </div>
    );
  }
}


