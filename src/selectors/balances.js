// Filtering out an array of balances, returning every balance high enough to use

export default (balances) => {
  return balances.filter((balance) => {
    let yes = false;
    if (balance.minBaseTrade < balance.available) {
      yes = true;
    }
    return yes;
  });
}