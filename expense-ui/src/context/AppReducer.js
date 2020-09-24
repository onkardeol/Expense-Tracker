export default (state, action) => {
    switch(action.type) {
        case 'GET_EXPENSES':
            return {
                ...state,
                expenses: action.payload,
                loading: false,
            }
        case 'CREATE_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }
        case 'DELETE_EXPENSE':
            return{
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload)
            }
        case 'GET_EXPSENSES_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}