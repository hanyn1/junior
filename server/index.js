const express=require('express')

const cors=require('cors')
const app=express()
const mysql=require('mysql2')
var bodyParser = require('body-parser')

app.use(bodyParser.json())


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'project'
})

db.connect((err)=>{
    if(err){
        console.log(err)
    } else{
    console.log('connected')}
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/use',(req,res)=>{
    const sqlSelect="SELECT * FROM employee_db"
    db.query(sqlSelect, (err, result)=>{
        console.log('erreur',err)
        console.log('result',result)
        res.json(result)
    })

})

app.post('/create',(req,res)=>{
    // console.log(req.body)
    // const name=req.body.name
    // const age=req.body.age
    // const country=req.body.country
    // const position=req.body.position    
    // const sqlInsert="INSERT INTO employee_db (employee_name,employee_age,employee_country,employee_position)VALUES (?,?,?,?)"
    // db.query(sqlInsert ,[name,age,country,position],(err, result)=>{
    //     res.json(result)
        
    //     res.send('hello expert')
    // })
    const post =  req.body;
    console.log("creating post", post) 
    db.query(`INSERT INTO employee_db (employee_name,employee_age,employee_country,employee_position) VALUES (?,?,?,?)`,[post.name,post.age,post.country,post.position],
    (error,  results) => {
        if (error) console.log(error)
       res.json(results)
      });
})

app.put('/update',(req,res)=>{
    const id=req.body.id
    const name=req.body.name
    db.query(`UPDATE employee_db SET name = ? WHERE idemployee=? `, [name,id], (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    } )
})

app.delete('/employees/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM employee_db WHERE idemployee = ?', id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting employee');
      } else {
        res.send('Employee deleted successfully');
      }
    });
  });



app.listen(5000,()=>{
    console.log('here we go')
})
