import React, { useState, useEffect } from 'react';
import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      return JSON.parse(storedExpenses).map((expense) => ({
        ...expense,
        date: new Date(expense.date), // Convert date string back to Date object
      }));
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
