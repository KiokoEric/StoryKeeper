import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import "../Profile/Profile.css";

const Profile = () => { 

    const [ Cookie, setCookie ] = useCookies(["auth_token"]); 

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Success, setSuccess] = useState("")
    const { _id } = useParams()

    const navigate = useNavigate()
    const ID = useGetUserID();

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
            Axios.get(`http://localhost:4000/User/${_id}`, {
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

    const EditUser = () => {
        navigate(`/MyProfile/${_id}`)
    } 

    const DeleteUser = (id) => {
        Axios.delete(`http://localhost:4000/Users/Delete/${id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(() => { 
            setSuccess("Deleted Successfully.")
        })
    }

return (
    <div className='Profile'>
        <section>
            <h1>Profile</h1>
        </section>
        <section>
            <form encType="multipart/form-data">
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
                <div>
                    <button onClick={EditUser} type="submit"><i class="fa-solid fa-pen-to-square"></i>Edit Details</button>
                    <button onClick={()=>DeleteUser(ID)}><i class="fa-solid fa-trash"></i>Delete My Profile</button>
                </div>
            </form>
        </section> 
    </div>
)
}

export default Profile