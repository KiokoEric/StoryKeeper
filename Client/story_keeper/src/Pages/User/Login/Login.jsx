import React from 'react';
import Axios from "axios";
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useCookies } from "react-cookie";
import "../Login/Login.css";

const Login = () => {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ Cookie, setCookie ] = useCookies(["auth_token"]);
    const [Error, setError] = useState("")
    const { enqueueSnackbar } = useSnackbar();

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    const onLogin = async (e) => {
        e.preventDefault()
        const data = {
            Email, Password
        }
        try {
            setError(false)
            const response = await Axios.post("http://localhost:4000/User/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , {variant: "success"} ) 
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , {variant: "error"}  ) 
            console.log(error) 
        }
    }

return (
    <div className='Login' > 
    <section>
        <h1>Login</h1>
    </section>
    <section>
        <form onSubmit={onLogin} method="post" encType="multipart/form-data">
            <div>
                <label for="">Email</label>
                <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} />
            </div>
            <div>
                <label for="">Password</label>
                <input type="Password" name="Password" id="Password" placeholder="Enter Password..." value={Password} onChange={handlePassword} />
                <p className='Error'>{Error}</p>
            </div>
            <button onClick={onLogin} type="submit">Login</button>
        </form>
    </section>
    </div>
)
}

export default Login