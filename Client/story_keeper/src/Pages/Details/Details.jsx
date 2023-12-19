import React, { useEffect, useState } from 'react';
import "../Details/Details.css";
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import { Link  } from 'react-router-dom';
import Axios from "axios";

const Details = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]); 
    const [Books, setBooks] = useState([])
    const { id } = useParams()

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get(`http://localhost:4000/Books/${id}`, {
        headers: { authorization: Cookie.auth_token }
        }) 
        .then((Response) => {
            setBooks(Response.data)
        })
    },[])

return (
    <div >
        <div key={Books._id} className='MoreInformation' >
                <figure>
                    <img src={Books.Image} alt="" width="300px" height="300px" />
                    <div>
                        <Link to={`/Edit/${Books._id}`} key={Books._id} >
                            <i id='Edits' class="fa-solid fa-pen-to-square"></i>
                        </Link>
                    </div>
                </figure>
                <figcaption>
                    <h2>{Books.Title} <span>({Books.Category})</span></h2>
                    <h3>Description</h3>
                    <pre>{Books.Description}</pre>
                </figcaption>
            </div>
    </div>
)
}   

export default Details