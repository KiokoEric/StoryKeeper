import React, { useEffect } from 'react';
import Axios from "axios";
import { useCookies } from "react-cookie";
import "../EditDetails/EditDetails.css";
import {useNavigate, useParams} from "react-router-dom";
import { useState } from 'react';

const EditDetails = () => { 

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const { id } = useParams()
    const [Success, setSuccess] = useState("")

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

    useEffect(() => {

        const FetchUser =() => {
        try{
            Axios.get(`http://localhost:4000/User/${id}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Data) => { 
                setName(Data.data.Name)
                setEmail(Data.data.Email)
                setPassword(Data.data.Password)
            })
        }
        catch (Error){
            console.log(Error)
        }
        }

        FetchUser()
        
    }, [])

    const EditUser = (e) => {
        e.preventDefault()

        const data = {
            Name, Email, Password
        }
        try {
            Axios.put(`http://localhost:4000/User/${id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Succesffuly edited.")
            })
        } catch (error) {
            console.error(error) 
        }
    } 

return (
    <div className='MyProfile'>
        <section>
            <h1>My Profile</h1>
        </section>
        <section>
            <form onSubmit={EditUser} method="post" encType="multipart/form-data">
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
                </div>
                <h4 className='Success'>{Success}</h4>
                <button onClick={EditUser} type="submit">Save Changes</button>
            </form>
        </section> 
    </div>
)
}

export default EditDetails 