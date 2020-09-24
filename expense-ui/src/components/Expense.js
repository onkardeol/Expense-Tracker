import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/Format';
import { Button } from 'react-bootstrap'

export const Expense = ({expense}) => {
    const { DeleteExpense } = useContext(GlobalContext);
    return (
            <li className="expense-card">
                {expense.name}<span>{expense.category}</span><span>${numberWithCommas(expense.cost)}</span><Button variant="danger" onClick={() => DeleteExpense(expense.id)} className="delete-btn">x</Button>
            </li>
    )
}
