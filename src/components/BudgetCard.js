import React from 'react'
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import {numberFormatter} from "../utils";
const BudgetCard = ({name,amount,max, gray,onAddExpenseClick,hideButtons,onViewExpenseClick}) => {
    const classNames=[];
    if(parseInt(amount)  > parseInt(max)){

        console.log(`coming here ${amount} with max=${max}`);
        classNames.push(
            "bg-danger", "bg-opacity-10"
        );
    }
    else if(gray){
        console.log("in gray")
        classNames.push("bg-light")
    }
    return (
       <Card className={classNames.join(" ")}>
           <Card.Body>
               <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                   <div className='me-2'>{name}</div>
                   <div className='d-flex align-items-baseline'>{numberFormatter.format(amount)}
                   {max && <span className='text-muted fs-6 ms-1'>/{numberFormatter.format(max)}</span>}</div>
               </Card.Title>
              {max && <ProgressBar className='rounded-pill mb-3' variant={getProgressbarVaraint(amount,max)} min={0} max={max} now={amount} />}
              {!hideButtons && <Stack direction='horizontal' >
                   <Button variant='outline-primary' onClick={onAddExpenseClick} className='ms-auto'>Add Expense</Button>
                   <Button variant='outline-secondary' onClick={onViewExpenseClick} className='ms-2'>View Expenses</Button>
               </Stack>
}

           </Card.Body>
       </Card>
    )
}

function getProgressbarVaraint(amount,max){
    const ratio = amount/max;
    if(ratio<0.5){
        return "primary";
    }
    if(ratio < 0.75) return "warning";
     return "danger";
}
export default BudgetCard
