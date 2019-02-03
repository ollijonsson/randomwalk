// Main dashboard component

import React from 'react';
import { connect } from 'react-redux';
import GenerateOrder from  '../functions/generateOrder';
import { tradingAction } from '../actions/trading';
import selectMarkets from '../selectors/markets';
import BuySomethingFilters from './BuySomethingFilters';
import LoadingComponent from './LoadingComponent';
import { Link } from 'react-router-dom';

export class BuySomethingButton extends React.Component {

    // Locally stored values
    constructor(props) {
        super(props);
        this.state = {
            isDone: true
        }
    }

    // Send given action to trading actions, waiting for result (promise)
    tradingAction = async (type, params) => {
        let result = await this.props.tradingAction(type, params);
        return result;
    }

    // Buy something button pressed
    go = async () => {
        this.setState(() => ({ isDone: false }));
        const generateOrder = new GenerateOrder();
        let result = await generateOrder.random(this.props.markets, this.props.filters, this.tradingAction);
        await this.tradingAction('submitOrder', result);
        await this.tradingAction('getTradeHistory');
        this.setState(() => ({ isDone: true }));
    }

    render() {
        return (
            <div>
                {
                    this.props.markets ? (
                    <div className="buy-something">
                    <BuySomethingFilters />
                    <div className="buy-something__button">
                        <button className="button button--secondary" onClick={this.go}>Random walk</button>
                    </div>
                    </div>
                    ) : (
                        <div>
                        <div className="form__error">
                            To use the random walk feature you need to have basecurrencies in your account. <Link to="/about">Learn more</Link>
                        </div>
                        </div>
                    )
                }
                {
                    !this.state.isDone && (
                        <LoadingComponent />
                    )
                
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        markets: selectMarkets(state.trading, state.filters)
    }
}

const mapDispatchToProps = (dispatch) => ({
    tradingAction: (type, params) => dispatch(tradingAction(type, params))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuySomethingButton);