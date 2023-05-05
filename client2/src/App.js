import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Employees from './components/Employees';

function App() {
const [name,setName]=useState('')
const [age,setAge]=useState(0)
const [country,setCountry]=useState('')
const [position,setPosition]=useState('')
const [employee,setEmployee]=useState([])
const [data,setData]=useState([])
const [showEmployee,setShowEmployee]=useState(false)





const displaaay=()=>{
  console.log(name)
  var obj={
    name:name,
    age:age,
    country:country,
    position:position
  }
  console.log(obj)

  axios.post('http://localhost:5000/create', obj)
  .then(()=>{
    setEmployee([...employee,{
      name:name,
      age:age,
      country:country,
      position:position
    }])

  })

}
function fetchData() {
  axios.get("http://localhost:5000/use")
    .then((res) => { 
      setEmployee(res.data);
      setShowEmployee(!showEmployee);
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(showEmployee);
}
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/employees/${id}`);
    setData((prevData) => prevData.filter((item) => item.id !== id));
  } catch (error) {
    console.error(error);
  }
};


;


// console.log(employee)
// useEffect(()=>{
// fetchData()
// },[])


  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <div className='information'>
      <label>name:</label>
     <input type='text'  onChange={(event)=>{setName(event.target.value)}}/>
     <label>age:</label>
     <input type='number'  onChange={(event)=>{setAge(event.target.value)}}/>
     <label>country:</label>
     <input type='text' onChange={(event)=>{setCountry(event.target.value)}}/>
     <label>position:</label>
     <input type='text' onChange={(event)=>{setPosition(event.target.value)}}/><br/>
     <button onClick={displaaay}>Add employee</button><br/>
     <button className='employee' onClick={fetchData}>See employee</button><br/>
     {showEmployee ?  <Employees employee={employee}/>:null}
     <div>
    {data.map((item) => (
      <div key={item.id}>
        <p>{item.name}</p>
        <button onClick={() => handleDelete(item.id)}>Delete</button>
      </div>
    ))}
  </div>

   

      

     </div>

    </div>
  );
}

export default App;


