// Trade history item component

import React from 'react';
import moment from 'moment';

export class TradeHistoryItem extends React.Component {

  // Locally stored values
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  // Show details button pressed
  onChange = () => {
    if (this.state.show) {
      this.setState(() => ({ show: false }));
    } else {
      this.setState(() => ({ show: true }));
    }
  }
  
  render() {
    let coin = this.props.market.split("_");
    return (
      <div className="list-item">
      <div className="list-item__main">
        <div className="list-timestamp">
          {moment(this.props.timestamp).fromNow()}
        </div>
        <div className="list-summary">
           You bought {
            this.props.type === 'Buy' ? (
              <span className="span1">{this.props.amount.toFixed(4)} {coin[0]}</span>
            ) : (
              <span className="span1">{this.props.amount.toFixed(4)} {coin[0]}</span>
            )
          }
             <span> for </span><span className="span2">{this.props.total} {coin[1]}</span>
          </div>
        <div className="list-detailsbutton"><button className="button--link"  onClick={this.onChange}>{this.state.show ? <span>Hide details</span> : <span>Show details</span>}</button></div>
      </div>
      {
        this.state.show && (
          <div className="list-item__main">
          <div className="list-item__sub">
          <div>
              <h3 className="list-item__subtitle">{moment(this.props.timestamp).format('lll')}</h3>
              <p className="list-item__title"><span>Order ID:</span> {this.props.id} </p>
              <p className="list-item__title"><span> Market:</span> {this.props.market.toLowerCase()} </p>
  
          </div>
  
          </div>
          <div className="list-item__data">
            <h3> Transaction Details </h3>
  
            <p><span>Rate:</span> {this.props.rate.toFixed(8)}</p>
          {
            this.props.type === 'Buy' ? (
              <p><span className="span1">Bought:</span> {this.props.amount.toFixed(4)} {coin[0]}</p>
            ) : (
              <p><span className="span2">sold:</span> {this.props.amount.toFixed(4)} {coin[0]}</p>
            )
          }
              <p><span className="span2">Sold:</span> {this.props.total} {coin[1]}</p>
          </div>
      </div>
        )
      }
      </div>
  )
  }
}

export default TradeHistoryItem;