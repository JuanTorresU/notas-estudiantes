import React from 'react'
import { useHistory } from 'react-router-dom'

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
                <button className="home__entry__button" onClick={handleStudentButton}>STUDENT</button>
                <button className="home__entry__button" onClick={handleAdminButton}>ADMIN</button>
            </div>
        </div>
    )
}
