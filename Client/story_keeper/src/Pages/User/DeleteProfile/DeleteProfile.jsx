import React from 'react';
import Axios from "axios";
import "../DeleteProfile/DeleteProfile.css";
import { useSnackbar } from 'notistack';
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";

const DeleteProfile = () => {

    const [ Cookie, setCookie ] = useCookies(["auth_token"]); 
    const { enqueueSnackbar } = useSnackbar();

    const myID = useGetUserID();
    const navigate = useNavigate()

    const DeleteUser = () => {
        try{
            Axios.delete(`http://localhost:4000/User/Delete/${myID}`, {
                headers: { authorization: Cookie.auth_token }
            })
            .then(() => { 
                navigate("/Registration")
                window.localStorage.clear()
                enqueueSnackbar("Profile Deleted successfully!" , {variant: "success"} ) 
            })
        }
        catch (Error){
            enqueueSnackbar("Deleted unsuccessfuly!" , {variant: "error"} ) 
            console.log(Error)
        }
    }

return (
    <div className='DeleteProfile' >
        <section>
            <h1>We are sorry to see you go, but hope to see you again!</h1>
            <button onClick={DeleteUser}><i class="fa-solid fa-trash"></i>Confirm Delete</button> 
        </section>
    </div>
)
}

export default DeleteProfile