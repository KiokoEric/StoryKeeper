import React, { useState } from 'react';
import { useGetUserID } from "../Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import "../Header/Header.css"

const Header = () => {

    const [ExtendNavbar,setExtendNavbar ] = useState(true)
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
                <Link to="/" className='Logo' > 
                    <figure>
                        <i class="fa-solid fa-book-open"></i>
                    </figure>
                    <h2>Story Keeper</h2>
                </Link>
            </section>
            <section>
                <nav className={ExtendNavbar ? "CloseNavigation" : "OpenNavigation" } onClick={() => setExtendNavbar(false)}>
                    <Link Link to="/" className='Link Navigate'  >
                        Home
                    </Link>
                    <Link Link to="/Create" className='Link Navigate'  >
                        Create Book
                    </Link>
                    <Link to="/Registration" className='Link Navigate Hidden'>
                        Sign Up
                    </Link>
                    {
                        !Cookie.auth_token ?
                        (
                            <Link to="/Login" className='Link Navigate Hidden' >
                                <p>Login</p>
                            </Link>
                        ) : 
                        (
                            <p onClick={Logout} type="submit" className='Link Navigate Hidden' >Logout</p>
                        )
                    }
                </nav>
            </section>
            <section> 
                <figure onClick={()=> {setExtendNavbar((curr) => !curr)}}>
                    {ExtendNavbar ? <i id="Bars" class="fa-solid fa-bars"></i> : <i id='Bars' class="fa-solid fa-xmark"></i> }
                </figure>
                <Link to="/Registration" className='User' >
                    <button type="submit">Sign Up</button>
                </Link>
                {
                    !Cookie.auth_token ?
                    (
                        <Link to="/Login" className='User' >
                            <button type="submit">Login</button>
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