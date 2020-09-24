import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { Form, Button } from 'react-bootstrap'

export const AddExpense = () => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [category, setCategory] = useState('');

    const { CreateExpense } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newExpense = {
            id: Math.floor(Math.random() * 10000000), // I would not do this in a producation application, this application is small enough that this will not cause problems
            name: name,
            cost: parseFloat(cost),
            category: category
        }

        CreateExpense(newExpense);
    }

    return (
        <>
            <h3>Add new expense</h3>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name..." />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text"  value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category..." />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cost</Form.Label>
                    <Form.Control type="number" value={cost} step="any" onChange={(e) => setCost(e.target.value)} placeholder="Enter cost..." />
                </Form.Group>

                <Button variant="success" type="submit" className="btn">Add expense</Button>
            </Form>  
        </>
    )
}
