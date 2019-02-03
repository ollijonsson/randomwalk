// Filters component

import React from 'react';
import { connect } from 'react-redux';
import selectBalances from '../selectors/balances';
import { setBalance, setAmount } from '../actions/filters';
import Slider from 'rc-slider';


export class BuySomething extends React.Component {

    // Locally stored values
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
        min: 0,
        max: 100,
        realValue: this.props.startingvalues.minBaseTrade,
        minBaseTrade: this.props.startingvalues.minBaseTrade,
        maxBaseTrade: this.props.startingvalues.available,
      }
    }
    
    // Calculate USD value from amount of selected base currency
    calculateRealValue = (value) => {
      let realValue = +((this.state.maxBaseTrade / 100) * value).toFixed(8);
      if (realValue < this.state.minBaseTrade) {
        realValue = this.state.minBaseTrade;
      }
      return realValue;
    }

    // Dynamicly change value displayed based on slider setting
    onSliderChange = (value) => {
      this.setState({ value });
      let realValue = this.calculateRealValue(value);
      this.setState({ realValue });
      this.props.dispatch(setAmount(realValue));
    }

    // Dynamicly change base currency selected from a dropdown menu
    changeBalance = (currency) => {
      let balance;
      this.props.balances.map((bal) => {
        if (bal.currency === currency) {
          balance = bal;
        }
      });
      this.props.dispatch(setBalance(balance));
      let minBaseTrade = balance.minBaseTrade;
      let maxBaseTrade = balance.available;
      let realValue = +((maxBaseTrade / 100) * this.state.value).toFixed(8);
      if (realValue < minBaseTrade) {
        realValue = minBaseTrade;
      }
      this.props.dispatch(setAmount(realValue));
      this.setState(() => ({
        minBaseTrade: minBaseTrade,
        maxBaseTrade: maxBaseTrade,
        realValue: realValue
      }));
    }

    // JSX rendered
    render() {
        return (
            <div className="input-group">
                  <div className="input-group__item">  
                    <select
                            className="select"
                            value={this.props.filters.balance.currency}
                            onChange={(e) => ( 
                              this.changeBalance(e.target.value)
                              )}
                        >
                        {
                          this.props.balances.map((balance) => {
                            return <option key={balance.currency} value={balance.currency}>{balance.currency}</option> 
                          })
                        }
                        </select>
                  </div>
                  <div className="input-group__slider">
                    <Slider min={this.state.min} max={this.state.max} onChange={this.onSliderChange} />
                  </div>
                  <div className="input-group__text">
                  {this.state.realValue.toFixed(8)}
                  </div>
                  <div className="input-group__text">
                  ${(this.state.realValue * this.props.filters.balance.price).toFixed(2)}
                  </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      balances: selectBalances(state.trading.balances),
      startingvalues: state.filters.balance,
      filters: state.filters
    };
};

export default connect(mapStateToProps)(BuySomething);