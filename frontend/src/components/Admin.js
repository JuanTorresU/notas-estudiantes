import React from 'react'
import { useState, useEffect } from 'react'



export default function Admin() {

    const [students, setStudents] = useState([])

    useEffect(()=>{
        getStudents().then(response => response.json())
        .then(result => setStudents(result))
        .catch(error => console.log('error', error));
    },[])

    function handleOnClick(number){
        console.log(number)
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
                        <tr onClick={() => handleOnClick(student.id)}>
                            <td>{student.document}</td>
                            <td>{student.complete_name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>{student.note}</td>
                            <td>{student.autoevaluation}</td>
                        </tr>
                    )
                })
            }
        </tbody>
            
        </table>
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
        'Access-Control-Allow-Origin': '*'
    }
    return fetch("http://localhost:3001/api/v1/students", requestOptions)
          
    }
  