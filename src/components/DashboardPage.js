// Dashboard component

import React from 'react';
import { connect } from 'react-redux';
import { tradingAction } from '../actions/trading';

// Importing components
import Summary from './Summary';
import BuySomething from './BuySomething';
import ErrorComponent from './ErrorComponent';
import LoadingComponent from './LoadingComponent';
import TradeHistoryList from './TradeHistoryList';

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // Retry button in case of errors
    tryAgain = async () => {
        this.props.tradingAction('getEverything');
    }

    render() {
        return (
            <div>
                <Summary />
                <div className="content-container">
                {      
                    this.props.errors.message && 
                    <div>
                        <ErrorComponent {...this.props.errors}/>
                        <button onClick={this.tryAgain}>retry</button>
                    </div>
                }
                {
                    !this.props.account.areCredentials ? 
                    <h4 className="page-header__title">
                        To use this app, put in your TradeSatoshi API key and secret in settings.
                    </h4> : ( 
                        this.props.trading.markets && 
                        this.props.trading.balances &&
                        this.props.trading.tradehistory) ?
                        ( <BuySomething /> ) : <LoadingComponent />
                }
                {
                    this.props.trading.tradehistory && 
                    <TradeHistoryList />
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => ({
    tradingAction: (type, params) => dispatch(tradingAction(type, params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);