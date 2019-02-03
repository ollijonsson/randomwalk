// Filters reducer for redux

const filtersReducerDefaultState = { };

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_BALANCE':
        return {
            ...state,
            balance: action.balance
        };
    case 'SET_AMOUNT':
        return {
            ...state,
            amount: action.amount
        };
    default:
        return state;
  }
}