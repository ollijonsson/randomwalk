// Trade history list component
// Display 10 most recent trades made by user

import React from 'react';
import { connect } from 'react-redux';
import TradeHistoryItem from './TradeHistoryItem';

const TradeHistoryList = (props) => (
    <div>
        <h3 className="list-header">Trade history</h3>
        <div className="list-body">
        {
            props.tradehistory.length === 0 ? (
                <div className="list-item list-item--message">
                    <span>No recent trades</span>
                </div>
            ) : (
                props.tradehistory.map((trade) => {
                    return <TradeHistoryItem key={trade.id} {...trade} />;
                })
            )
        }
        </div>
    </div>
);

const mapStateToProps = (state) => {
  return state.trading;
};

export default connect(mapStateToProps)(TradeHistoryList);