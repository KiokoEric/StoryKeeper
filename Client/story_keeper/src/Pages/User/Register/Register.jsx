import React from 'react';
import "../Register/Register.css";
import Axios from "axios";
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Register = () => { 

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Error, setError] = useState("")

    const navigate = useNavigate()

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    Axios.defaults.withCredentials = true;
    const onRegister = async (e) => {
        e.preventDefault()
        
        const data = {
            Name, Email, Password
        }
        try {
            setError(false)
            await Axios.post("http://localhost:4000/User/Registration", data) 
            .then(() => {
                alert("Registration Completed! Kindly Log in")
                navigate("/Login")
            }) 
        } catch (error) {
            setError("Invalid Username or Email!")  
            console.error(error)
        }
    }

return (
    <div className='Register' >
        <section>
            <h1>Sign Up</h1>
        </section>
        <section>
            <form onSubmit={onRegister} method="post" encType="multipart/form-data">
                <div>
                    <label for="">Name</label>
                    <input type="text" name="Name" id="Name" placeholder="Enter Name..." value={Name}  onChange={handleName} />
                </div>
                <div>
                    <label for="">Email</label>
                    <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} />
                </div>
                <div>
                    <label for="">Password</label>
                    <input type="Password" name="Password" id="Password" placeholder="Enter Password..." value={Password} onChange={handlePassword} />
                    <p className='Error'>{Error}</p>
                </div>
                <button onClick={onRegister} type="submit">Sign Up</button>
            </form>
        </section> 
    </div>
)
}

export default Register