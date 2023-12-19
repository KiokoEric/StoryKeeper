import React from 'react';
import { useGetUserID } from "../Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import "../Header/Header.css"

const Header = () => {

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    const userID = useGetUserID();

    const navigate = useNavigate()

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/Login");
    }

return (
    <div className='Header' >
        <article>
            <section>
                <Link to="/" className='Link Logo' > 
                    <figure>
                        <i class="fa-solid fa-book-open"></i>
                    </figure>
                    <h2>Story Keeper</h2>
                </Link>
            </section>
            <section>
                <nav>
                    <Link to="/" className='Link' >Home</Link>
                    <Link to="/Create" className='Link' >Create Book</Link> 
                </nav>
            </section>
            <section>
                <Link to="/Registration" className='UserLink'>Sign Up</Link>
                {
                        !Cookie.auth_token ?
                        (
                            <Link to="/Login">
                                <button className='Logout' >Login</button>
                            </Link>
                        ) : 
                        (
                            <button onClick={Logout} type="submit" className='Logout'>Logout</button>
                        )
                    }
                    <Link to={`/Profile/${userID}`} >
                        <i id='User' class="fa-solid fa-user"></i>
                    </Link>
            </section>
        </article>
    </div>
)
}

export default Header