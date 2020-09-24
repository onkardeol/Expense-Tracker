import React, { createContext , useReducer} from 'react';
import AppReducer from './AppReducer'
import axios from 'axios';

// Initial state

const initialState = {
    expenses: [],
    error: null,
    loading: true
}

// Exporting context

export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions 
    async function GetExpenses() {
        try{
            const res = await axios.get('http://127.0.0.1:5000/expenses');

            console.log(res.data.result);
            dispatch({
                type: 'GET_EXPENSES',
                payload: res.data.result
            });
        } catch (err) {
            dispatch({
                type: 'GET_EXPENSES_ERROR',
                payload: 'API call failed.'
            });
        }
    }

    async function CreateExpense(expense){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (expense.name === ''){
            alert("A name is required.");
            return 0;
        } 
        if (expense.category === ''){
            alert("A category is required.");
            return 0;
        }
        
        console.log(expense.cost);
        if (Number.isNaN(expense.cost)){
            alert("A price is required.");
            return 0;
        }

        try {
            const res = await axios.post('http://127.0.0.1:5000/expenses', expense, config);
            // console.log(res.data.result);

            dispatch({
                type: 'CREATE_EXPENSE',
                payload: res.data.result
            });
        } catch (err) {
            dispatch({
                type: 'CREATE_EXPENSE',
                payload: 'API call failed.'
            });
        }
    }

    async function DeleteExpense(id){
        try {
            //console.log(id);
            await axios.delete(`http://127.0.0.1:5000/expenses/${id}`)

            dispatch({
                type: 'DELETE_EXPENSE',
                payload: id
            });
        } catch(err){
            dispatch({
                type: 'DELETE_EXPENSE',
                payload: "API call failed."
            });
        }

    }

    return (<GlobalContext.Provider value = {{
        expenses: state.expenses,
        error: state.error,
        loading: state.loading,
        
        GetExpenses,
        CreateExpense,
        DeleteExpense
    }}>
        {children}
    </GlobalContext.Provider>);
}