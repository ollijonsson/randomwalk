// Filtering out markets array, returning available markets based on user balances

export default ({ markets }, { balance }) => {
  if (!balance) {
    return null;
  }
  return markets.filter((market) => {
    const baseCurrency = market.market.split("_");
    const isOk = market.marketStatus === "OK";
    const hasBalance = balance.currency === baseCurrency[1] 
    && balance.available >= balance.minBaseTrade;
    const hasOrders = market.openBuyOrders > 0 && market.openSellOrders > 0;
    const hasVolume = market.volume > 0;
    return isOk && hasBalance && hasOrders && hasVolume;
  });
}