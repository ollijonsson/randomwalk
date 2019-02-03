// Trading reducer for redux

const tradingReducerDefaultState = { };

export default (state = tradingReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BALANCES':
            return {
                ...state,
                balances: action.balances
            };
        case 'SET_MARKETS':
            return {
                ...state,
                markets: action.markets
            };
        case 'SET_TRADEHISTORY':
            return {
                ...state,
                tradehistory: action.tradeHistory
            };
        case 'REMOVE_EVERYTHING':
            return {};
        default:
            return state;
    }
}