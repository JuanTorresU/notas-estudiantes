// const http = require('http')
const cors = require( 'cors');
const { response } = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
app.use(express.json())
app.use( cors({ origin: true, credentials: true  }) );


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
    "note": 5,
    "autoevaluation": 0
  }
    ]


//HOME
app.get('/', (req, res) => {
    response.send('<h1>hello World</h1>')
})

/////API

//get unique student
app.get('/api/v1/students/:document',(req,res)=>{
    const document = req.params.document
    console.log(document)
    res.json(students.find(student => student.document === document))
})

//get students list
app.get('/api/v1/students',(req, res) => {
    if(!authentication(req.headers.auth, res)){return}

    res.json(students)
})

//delete student
app.delete('/api/v1/students/:id',(req,res)=>{

    if(!authentication(req.headers.auth, res)){return}

    const id = req.params.id
    console.log(id)
    students = students.filter(student => student.id !== id)
    console.log(students)
    res.status(204).end()
})
//post - create a new student 
app.post('/api/v1/students',(req, res) =>{
    const studentReg = req.body

    if(!authentication(req.headers.auth, res)){return}

    if(students.find(student=>student.document===studentReg.document)){
      res.status(202).end("Error: Numero de identificacion ya esta en uso")
      return
    } 

      const newStudent = {
        id: uuidv4(),
        complete_name:studentReg.complete_name,
        document:studentReg.document,
        age:studentReg.age,
        gender:studentReg.gender,
        note:studentReg.note,
        autoevaluation:0
      }
      students = [...students, newStudent]
      console.log(students)
      res.json(studentReg)
     
    
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

      if(!authentication(req.headers.auth, res)){return}

      if (!noteVerification(note)){
        res.status(202).end("La nota ingresada esta fuera del rango o no es un numero entero")
        return
      }
      students.map(student=>student.id===id?student.note=note:null)  
    }

    if(autoevaluation){
      if (!noteVerification(autoevaluation)){
        res.status(202).end("La nota ingresada esta fuera del rango o no es un numero entero")
        return
      }
      students.map(student=>student.id===id?student.autoevaluation=autoevaluation:null)  
    }

    console.log(students)
    res.status(200).end()
})

///Functions
const noteVerification = note => (note>=0)&&(note<=5)&&(Number.isInteger(note))?true:false

const authentication = (auth,res) => {
  if(auth!=='admin'){
    res.status(401).end("No esta autorizado")
    return false
  }else{
    return true
  }
}



// Average of all students
app.get('/api/v1/average/',(req,res)=>{
    const avg = (students.reduce((a,b)=>({note:a.note+b.note})).note/students.length).toFixed(2)
    res.json({promedio:avg})
})



const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`) 
})

 