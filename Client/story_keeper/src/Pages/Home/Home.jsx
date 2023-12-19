import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";
import loadingGif from "../../Images/Books.gif";
import "../Home/Home.css";

const Home = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [isLoading, setIsLoading] = useState(true);
    const [Books, setBooks] = useState([])

    const userID = useGetUserID();

    Axios.defaults.withCredentials = true;
    useEffect(() => {

    const fetchBooks = async () => {
        await Axios.get(`http://localhost:4000/Books/AllBooks`, {
        headers: { authorization: Cookie.auth_token },
        }) 
        .then((Response) => {
            setBooks(Response.data)
        })
        setTimeout(() => {
            setIsLoading(false); 
        }, 1500);
    }


    if (userID) {
        fetchBooks()
    }

    },[userID])

    // Delete Book

    const handleDelete= (_id) => {
        Axios.delete(`http://localhost:4000/Books/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        }) 
        .then(
            window.location.reload()
        )
    }

return (
    <div className='Home' >
        <section>
            <h1>Story Keeper</h1>
        </section>
        <section>
        {isLoading ? (
                <div className='Gif' >
                    <img src={loadingGif} alt="Loading..." className='Loading' />
                </div>
            ) : (
            (Books.length > 0) ?  
            Books.map((Book) => { 
            return (
            <div key={Book.index} >
                <Link to={`/Information/${Book._id}`}  className='Information'> 
                    <figure>
                        <img src={Book.Image} alt="" />
                        <div>
                            <Link to={`/Edit/${Book._id}`} key={Book._id} >
                                <i id='Edit' class="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <i id='Delete' onClick={() => handleDelete(Book._id)} class="fa-solid fa-trash"></i>
                        </div>
                    </figure>
                    <figcaption  >
                        <h2>{Book.Title}</h2>
                    </figcaption>
                </Link>
            </div>
            )
            }) : <h2 className='Failure'>No Results Found.</h2> 
            )
            
            }
        </section>
    </div>
)
}

export default Home