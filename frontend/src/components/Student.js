import React from 'react'
import { useState, useEffect } from 'react'

export default function Student() {
    const [student, setStudent] = useState([])
    useEffect(()=>{
        getStudent(document).then(response => response.json())
        .then(result => setStudent(result))
        .catch(error => console.log('error', error));
    },[student])


    return (
        <div className="student">
            <div className="student__info">
                <p></p>

            </div>
            Student
        </div>
    )
}
const getStudent = (document) => {
    const myHeaders = new Headers();
    myHeaders.append("auth", "admin");
        
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }
    return fetch(`http://localhost:3001/api/v1/students/${document}`, requestOptions)
          
    }