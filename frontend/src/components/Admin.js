import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './Admin.css'
export default function Admin() {
    const { register, handleSubmit } = useForm()
    const [students, setStudents] = useState([])

    useEffect(()=>{
        getStudents().then(response => response.json())
        .then(result => setStudents(result))
        .catch(error => console.log('error', error));
    },[students])

    function studentRegister(newStudent){
        createStudent(newStudent)
    }


    if (!students) return <p>Cargando datos</p>
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Document</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Gender</td>
                        <td>Note</td>
                        <td>AutoEvaluation</td>
                    </tr>
                </thead>
                
                <tbody>
                
                {
                        students.map((student)=>{
                            return (
                                <Popup trigger={
                                    <tr >
                                        <td>{student.document}</td>
                                        <td>{student.complete_name}</td>
                                        <td>{student.age}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.note}</td>
                                        <td>{student.autoevaluation}</td>
                                    </tr>
                                } modal nested>
                                    {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}> &times; </button>

                                        <div className="header"> Asignar nota a: {student.complete_name} </div>

                                        <div className="content">
                                            <input name="note" type="number" />
                                        </div>

                                        <div className="actions">
                                            <button className="button" onClick={() => {
                                                let note = document.getElementsByName("note")[0].value;
                                                student.note=note
                                                putNote(student.id,note);
                                                close();
                                                }} >  Agregar 
                                            </button>                        
                                            <button className="button" onClick={() => {close()}} > Cancelar</button>
                                        </div>
                                    </div>
                                    )}
                                </Popup>
                                
                            )
                        })
                        
                    }
                </tbody>            
            </table>
                                <Popup trigger={
                                   <button>Agregar estudiante</button>
                                } modal nested>
                                    {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}> &times; </button>

                                        <div className="header"> Registro de estudiante  </div>
                                            <form onSubmit={handleSubmit(studentRegister)}>
                                                <label className="label">Name</label>
                                                <input className="input" placeholder="Student name" {...register("complete_name", { required: true })} />

                                                <label className="label">Document</label>
                                                <input className="input" placeholder="Student name" {...register("document", { required: true })} />

                                                <label className="label">Age</label>
                                                <input className="input" placeholder="Student name" {...register("age", { required: true })} />

                                                <label className="label">Gender</label>
                                                <input className="input" placeholder="Student name" {...register("gender", { required: true })} />

                                                <label className="label ">Note</label>
                                                <input className="input" placeholder="Student name" {...register("note", { required: true })} />

                                                <button className="button" type="submit" > Agregar </button>                        

                                            </form>
                                        <div className="content">
                                        </div>

                                        <div className="actions">
                                            <button className="button" onClick={() => {close()}} > Cancelar</button>
                                        </div>
                                    </div>
                                    )}
                                </Popup>
        </div>
    )
}


const getStudents = () => {
    const myHeaders = new Headers();
    myHeaders.append("auth", "admin");
        
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }
    return fetch("http://localhost:3001/api/v1/students", requestOptions)
          
    }

const putNote = (id,note) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth", "admin");
    var raw = JSON.stringify({"note":Number(note)});

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://localhost:3001/api/v1/students/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result);})
    .catch(error => console.log('error', error));
}

const createStudent = (student) =>{
    var myHeaders = new Headers();
    myHeaders.append("Auth", "admin");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "complete_name":student.complete_name,
        "document":student.document,
        "age":student.age,
        "gender":student.gender,
        "note":student.note
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3001/api/v1/students", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


const putAutoevaluation = (autoevaluation) =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"autoevaluation":5});

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3001/api/v1/students/dc2ff3b3-be00-4eb6-9332-152f6b2e2f64", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const getNoteAvg = () =>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:3001/api/v1/average", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}