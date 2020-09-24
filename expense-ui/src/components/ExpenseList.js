import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Expense} from './Expense';


export const ExpenseList = () => {
    const { expenses, GetExpenses } = useContext(GlobalContext);

    useEffect(() => {
        GetExpenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h3>Expenses</h3>
            <ul className="list">
                {expenses.map(expense => (<Expense key = {expense.id} expense = {expense}/>))}

            </ul>  
        </>
    )
}
