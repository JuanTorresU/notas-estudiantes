import React from 'react'
import { useHistory } from 'react-router-dom'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './Home.css'
export default function Home() {
    const history = useHistory()


    const handleStudentButton = ()=>{
        history.push("/student")
    }

    const handleAdminButton =()=>{
        history.push("/admin")
    }
    return (
        <div className="home">
            <div className="home__entry">
                <h1 className="home__entry__title">¿What user are you?</h1>
                <Popup trigger={
                                    <button className="home__entry__button" onClick={handleStudentButton}>STUDENT</button>

                                } modal nested>
                                    {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}> &times; </button>

                                        <div className="header"> Asignar autoevaluacion  </div>
                                            <label htmlFor="document">Documento</label>
                                            <input name="document" type="text" />

                                            <label htmlFor="autoevaluation">Autoevaluacion</label>
                                            <input name="autoevaluation" type="text" />

                                        <div className="content">
                                        </div>

                                        <div className="actions">
                                            <button className="button" onClick={async () => {
                                                let documentStudent = document.getElementsByName("document")[0].value;
                                                let autoevaluation= document.getElementsByName("autoevaluation")[0].value;
                                                let student = await getStudent(documentStudent)
                                                putAutoevaluation(student.id,autoevaluation)

                                                }} >  Agregar 
                                            </button>                        
                                            <button className="button" onClick={() => {close()}} > Cancelar</button>
                                        </div>
                                    </div>
                                    )}
                                </Popup>
                
                <button className="home__entry__button" onClick={handleAdminButton}>ADMIN</button>                                           
            </div>
        </div>
    )
}


const getStudent = (document) => {
    const myHeaders = new Headers();
        
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }
    return fetch(`http://localhost:3001/api/v1/students/${document}`, requestOptions)
        .then(response => response.json())
        .then(result =>{ return result})
        .catch(error => console.log('error', error));
          
    }

    const putAutoevaluation = (id,autoevaluation) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("auth", "admin");
        var raw = JSON.stringify({"autoevaluation":Number(autoevaluation)});
    
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