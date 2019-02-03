// Summary component

import React from 'react';
import { connect } from 'react-redux';

// Correctly displaying fixed amount of decimals
const currencyBalance = (coin) => {
  return coin.available.toFixed(7) > 0 && <div className='summary__balance' key={coin.currency}><span>{coin.currency}:</span> {coin.available.toFixed(7) > 0 && coin.available.toFixed(8)} </div>
}


export class Summary extends React.Component {

  // Locally stored values
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
  }

  // Show / Hide button pressed
  onChange = () => {
    if (this.state.show) {
      this.setState(() => ({ show: false }));
    } else {
      this.setState(() => ({ show: true }));
    }
  }

  render() {
    return (
    <div className="page-header">
      <div className="content-container">
        <div className="summary-container">
          <h2 className="page-header__title">Dashboard</h2>
          {
          this.props.balances && <button className="button--linknohover"  onClick={this.onChange}>{this.state.show ? <span>Hide balances</span> : <span>Show balances</span>}</button>
          }
        </div>
        <div className="summary">
        {
          this.props.balances && this.state.show && (
            this.props.balances.map((coin) => {
              return currencyBalance(coin);
            })
          )
        }
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    balances: state.trading.balances
  };
}

export default connect(mapStateToProps)(Summary);