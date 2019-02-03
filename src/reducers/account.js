// Account reducer for redux

const accountReducerDefaultState = { areCredentials: false };

export default (state = accountReducerDefaultState, action) => {
    switch (action.type) {
        case 'REMOVE_CREDENTIALS':
            return {
                areCredentials: false
            };
        case 'SET_CREDENTIALS':
            return {
                areCredentials: true
            };
        default:
            return state;
    }
}