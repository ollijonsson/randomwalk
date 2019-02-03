// Generate order parameters for submitting to exchange

import React from 'react';

export class OrderGenerator extends React.Component {

  random = async (markets, filters, tradingAction) => {
    let market = await this.getRandomMarket(markets);
    let numbers = await this.getNumbers(market, filters, tradingAction);
    let params = await this.generateParams(market, numbers);
    return params;
  }

  getRandomMarket = (markets) => {
    const random =  Math.round(Math.random() * (markets.length -1));
    let market = markets[random];
    return market;
  }

  // Generate parameters array 
  generateParams = (market, { amount, price }) => {
    let params = {
      market: market.market,
      type: 'Buy',
      price: price,
      amount: amount
    }
    return params;
  }

  // Fetch information about a market and calculate correct parameters for order
  getNumbers = async (market, { amount }, tradingAction) => {
    let params = {
      market: market.market,
      type: 'sell',
      depth: 50
    }

    // Get order book for chosen currency
    let orderBook = await tradingAction('getOrderBook', params);

    // Add 0.2 % fee
    let baseAmount = amount / 1.002; 

    // Calculate correct price parameter for instant purchasing
    let totalBaseAmount = 0, totalQuantity = 0, 
    thatAmount, thatQuantity, restBaseAmount, price;

    // ...
    for (var order of orderBook.sell) {
      thatAmount = order.quantity * order.rate;
      thatQuantity = order.quantity;
      if (baseAmount > totalBaseAmount) {
        if (baseAmount < totalBaseAmount + thatAmount) {
          restBaseAmount = baseAmount - totalBaseAmount;
          thatQuantity = restBaseAmount / order.rate;
          thatAmount = thatQuantity * order.rate;
          totalBaseAmount += thatAmount;
          totalQuantity += thatQuantity;
          price = order.rate;
          break;
        }
        totalBaseAmount += thatAmount;
        totalQuantity += thatQuantity;
      }
    }
    return { amount: totalQuantity, price: price };
  }
}

export default OrderGenerator;