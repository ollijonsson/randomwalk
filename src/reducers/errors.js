// Error reducer for redux

const errorsReducerDefaultState = { };

export default (state = errorsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
        return {
            ...action.error
        };
    case 'REMOVE_ERROR':
        return {};
    default:
        return state;
  }
}