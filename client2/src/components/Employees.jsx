import react from 'react';
import  './Employees.css'
import { useState } from 'react';
import axios from 'axios';


const Employees=(props) =>{
    const [newName,setNewName]=useState('')
    console.log("from employees",props)

    
    
    return(
        <div>
                {props.employee.map((e) => {
                    return (
                      <div className='emp' key={e.id}>
                        <h3>Name: {e.employee_name}</h3>
                        <h3>Age: {e.employee_age}</h3>
                        <h3>Country: {e.employee_country}</h3>
                       
            </div>
            )
        })}
        </div>
    )
}
export default Employees