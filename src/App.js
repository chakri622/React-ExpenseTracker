import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import './App.css';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId,setviewExpensesModalBudgetId]= useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(UNCATEGORIZED_BUDGET_ID);
  const {budgets, getBudgetExpenses} = useBudgets();
  function openAddExpenseModal(budgetId){
    console.log("here");
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  return <> <Container className='my-4'>
    <Stack direction='horizontal' gap="2" className='mb-4'>
      <h4 className='me-auto'>Budgets</h4>
      <Button variant="primary" onClick={()=>setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant="outline-primary" onClick={()=> openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}>Add Expense</Button>
   </Stack>
   <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr)", gap: "1rem", alignItems:"flex-start"}} >
     {budgets.map(budget => {
      const amount = getBudgetExpenses(budget.id).reduce((total,expense)=> total+expense.amount,0);
     return (
        <BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max}
        onAddExpenseClick={()=>openAddExpenseModal(budget.id)} onViewExpenseClick={()=>setviewExpensesModalBudgetId(budget.id)} 
        ></BudgetCard>
     );
})}
   <UncategorizedBudgetCard   onAddExpenseClick={()=>openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)} onViewExpenseClick={()=>setviewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
   <TotalBudgetCard />
   </div>
  </Container>
  <AddBudgetModal show={showAddBudgetModal} handleClose={()=>setShowAddBudgetModal(false)}/>
  <AddExpenseModal defaultBudgetId={addExpenseModalBudgetId} show={showAddExpenseModal} handleClose={()=>setShowAddExpenseModal(false)} />
  <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={()=>setviewExpensesModalBudgetId()}/>
  </>
}

export default App;
