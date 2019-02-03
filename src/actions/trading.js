// Trading actions 

// Import API and actions for redux
import getFromApi from '../functions/getFromApi';
import { setBalance, setAmount } from './filters';
import { addError, removeError } from './errors';

const setBalances = (balances) => ({
  type: 'SET_BALANCES',
  balances
});


// Add balances to redux and calculate available coins to use for purchasing
const addToBalances = (filtered) => {
  return async (dispatch) => {
    const baseCurrs = [
      'BTC', 'DOGE', 'ETH', 'LTC', 'USDT'
    ];
    filtered.map((balance) => {
      baseCurrs.map(async (base) => {
        if (base === balance.currency) {
          let baseCurrency = await dispatch(getCurrency(base));
          balance.minBaseTrade = baseCurrency.minBaseTrade*1.02;
          if (balance.minBaseTrade < balance.available) {
            dispatch(setBalance(balance));
            dispatch(setAmount(balance.minBaseTrade));
          }
          let market = `${balance.currency}_USDT`;
          let result = await dispatch(getMarket(market));
          if (result.error) { return };
          balance.price = result.ask;
        }
      })
    })
    return filtered;
  }
};


// Get all user balances from exchange
export const getBalances = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    let result = await getFromApi('getBalances', undefined, uid);
    if (result.error) { 
      dispatch(addError(result));
      return result;
    };
    let filtered = result.filter(coin => coin.total > 0);
    let balances = await dispatch(addToBalances(filtered));
    dispatch(setBalances(balances));
    return balances;
  }
};

// Get balance on single coin from exchange
export const getBalance = (balance) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    let result = await getFromApi('getBalance', balance, uid);
    if (result.error) { 
      dispatch(addError(result));
      return result;
    };
    return result;
  }
};

// Get order book on single currency from exchange
export const getOrderBook = (params) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    let result = await getFromApi('getOrderBook', params, uid);
    if (result.error) { 
      dispatch(addError(result));
      return result;
    };
    return result;
  }
};

const setMarkets = (markets) => ({
  type: 'SET_MARKETS',
  markets
});

// Get single market summary from exchange
export const getMarket = (market) => {
  return async (dispatch, getState) => {
    let params = { market: market };
    const uid = getState().auth.user.uid;
    let result = await getFromApi('getMarketSummary', params, uid);
    if (result.error) { 
      dispatch(addError(result));
      return result;
    };
    return result;
  }
};

// Get all market summaries from exchange
export const getMarkets = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    let result = await getFromApi('getMarketSummaries', undefined, uid);
    if (result.error) { 
      dispatch(addError(result));
      return result;
    };
    dispatch(setMarkets(result));
    return result;
  }
};

const setTradeHistory = (tradeHistory) => ({
  type: 'SET_TRADEHISTORY',
  tradeHistory
});

// Get users trade history from exchange
export const getTradeHistory = (params = {count: 10}) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    let result = await getFromApi('getTradeHistory', params, uid);
    if (result.error) { 
      dispatch(addError(result));
      return result;
    };
    dispatch(setTradeHistory(result));
    return result;
  }
};

// Get single currency details from exchange 
export const getCurrency = (curr) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    let result = await getFromApi('getCurrency', curr, uid);
    if (result.error) { 
      dispatch(addError(result));
      return result;
    };
    return result;
  }
};

// Submit order to exchange
export const submitOrder = (params) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    let result = await getFromApi('submitOrder', params, uid);
    if (result.error) { 
      dispatch(addError(result));
      return result;
    };
    return result;
  }
};

// Get data needed for dashboard
export const getEverything = () => {
  return async (dispatch) => {
    let result = await dispatch(getBalances());
    if (!result.error) { 
      dispatch(removeError());
    };
    await dispatch(getMarkets());
    await dispatch(getTradeHistory());
  }
}

const removeEverything = () => ({
  type: 'REMOVE_EVERYTHING'
});

// Remvove everything from redux
export const startRemoveEverything = () => {
  return async (dispatch) => {
    dispatch(removeEverything());
  }
}

// Shortcut linked to other actions
export const tradingAction = (type, params) => {
  return (dispatch, getState) => {
    const yes = getState().account.areCredentials;
    if (yes) {
      switch (type) {
        case 'getBalances':
          return dispatch(getBalances()); break;
        case 'getBalance':
          return dispatch(getBalance()); break;
        case 'getMarket':
          return dispatch(getMarket(params)); break;
        case 'getMarkets':
          return dispatch(getMarkets()); break;
        case 'getOrderBook':
          return dispatch(getOrderBook(params)); break;
        case 'getTradeHistory':
          return dispatch(getTradeHistory(params)); break;
        case 'getCurrency':
          return dispatch(getCurrency(params)); break;
        case 'getBaseCurrencies':
          return dispatch(getBaseCurrencies()); break;
        case 'submitOrder':
          return dispatch(submitOrder(params)); break;
        case 'getEverything':
          return dispatch(getEverything()); break;
        }
      }
    }
  }