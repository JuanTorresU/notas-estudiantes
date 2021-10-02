// const http = require('http')
const { response } = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
app.use(express.json())

let students = [
  {
    "id": "dc2ff3b3-be00-4eb6-9332-152f6b2e2f64",
    "complete_name": "Andres Lopez",
    "document": "100134",
    "age": 26,
    "gender": "Male",
    "note": 4,
    "autoevaluation": 0
  },
  {
    "id": "dc2ff3b3-be00-4eb6-9332-152f6b2e2f65",
    "complete_name": "Daniela Perez",
    "document": "100135",
    "age": 23,
    "gender": "Female",
    "note": 5,
    "autoevaluation": 0
  },
  {
    "id": "dc2ff3b3-be00-4eb6-9332-152f6b2e2f66",
    "complete_name": "Marco Antonio Solis",
    "document": "100136",
    "age": 28,
    "gender": "Male",
    "note": 3,
    "autoevaluation": 0
  },
  {
    "id": "dc2ff3b3-be00-4eb6-9332-152f6b2e2f67",
    "complete_name": "Zacarias Piedras Del Rio",
    "document": "100137",
    "age": 26,
    "gender": "Male",
    "note": 2,
    "autoevaluation": 0
  },
  {
    "id": "dc2ff3b3-be00-4eb6-9332-152f6b2e2f68",
    "complete_name": "Miranda Calles",
    "document": "100138",
    "age": 27,
    "gender": "Female",
    "note": 8,
    "autoevaluation": 0
  }
    ]


//HOME
app.get('/', (req, res) => {
    response.send('<h1>hello World</h1>')
})

/////API

//get unique student
app.get('/api/v1/students/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    res.json(students.find(student => student.id === id))
})

//get students list
app.get('/api/v1/students',(req, res) => {
    res.json(students)
})

//delete student
app.delete('/api/v1/students/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    students = students.filter(student => student.id !== id)
    console.log(students)
    res.status(204).end()
})
//post - create a new student 
app.post('/api/v1/students',(req, res) =>{
    const student = req.body
    console.log(student)
    const newStudent = {
        id: uuidv4(),
        complete_name:student.complete_name,
        document:student.document,
        age:student.age,
        gender:student.gender,
        note:student.note,
        autoevaluation:0
        
    }
    students = [...students, newStudent]
    console.log(students)
    res.json(student)
})
//Add note to student and add autoevaluation
app.put('/api/v1/students/:id',(req,res)=>{
    console.log(req.headers)
    console.log(req.params)
    console.log(req.body)

    const id = req.params.id
    const note = req.body.note
    const autoevaluation = req.body.autoevaluation

    if(note){
      students.map(student=>student.id===id?student.note=note:null)  
    }
    if(autoevaluation){
      students.map(student=>student.id===id?student.autoevaluation=autoevaluation:null)  
    }

    console.log(students)
    res.status(200).end()

})

// Average of all students
app.get('/api/v1/average/',(req,res)=>{

    const avg = (students.reduce((a,b)=>({note:a.note+b.note})).note/students.length).toFixed(2)
    res.json(avg)
})



const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`) 
})

 