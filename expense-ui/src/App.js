import React from 'react';
import './App.css';
import { Header } from './components/Header'
import { Balance } from './components/Balance'
import { ExpenseList } from './components/ExpenseList'
import { AddExpense } from './components/AddExpense'

import { GlobalProvider } from './context/GlobalState'
import { Container }  from 'react-bootstrap'


function App() {
  return (
    <GlobalProvider>
        <Container>
          <Header/>
          <Balance/>
          <ExpenseList/>
          <AddExpense/>
        </Container>
    </GlobalProvider>
  );
}

export default App;
