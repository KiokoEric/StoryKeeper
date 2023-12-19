import React, { useState } from 'react';
import Axios from "axios";
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import "../Create/Create.css";

const Create = () => {

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Category, setCategory] = useState("")
    const [Image, setImage] = useState("")
    const [Error, setError] = useState("")
    const [Success, setSuccess] = useState("")
    const [userOwner, setuserOwner] = useState(UserID)
    const [ErrorField, setErrorField] = useState("")

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleImage = (e) => {
        setImage(e.target.value)
    }

    Axios.defaults.withCredentials = true;

    const AddBook = async (e) => {
        e.preventDefault()

        if (!UserID) {
            setError('Kindly log in!') 
        }
        else {
            const data = {
                Title, Description, Category, Image, userOwner
            }
            try {
                Axios.post("http://localhost:4000/Books/AddBook", data , {
                    headers: { authorization: Cookie.auth_token },
                }) 
                .then(() => { 
                    setSuccess("Book successfully added.")
                })
            } catch (error) {
                console.error(error) 
            }
        }
    }  

return (
    <div className='Create' >
        <section>
            <h1>Create Book</h1>
        </section>
        <section>
            <form action="" method="post">
            <form onSubmit={AddBook} method="post" encType="multipart/form-data" >
                <div>
                    <label for="">Title</label> 
                    <input type="text" name="Subject" id="Subject" placeholder="Enter Title..." value={Title} onChange={handleTitle} required />
                </div>
                <div>
                    <label for="">Description</label>
                    <textarea type="text" className="Description" name='Description' id="Description" cols="1" rows="10" placeholder="Enter Description..."  value={Description} onChange={handleDescription} required ></textarea>
                </div>
                <div>
                    <label for="">Category</label>
                    <select name="" id="" value={Category} onChange={handleCategory} required >
                        <option value="">Select a Category</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Romance">Romance</option>
                        <option value="Self Help">Self Help</option>
                        <option value="Poetry">Poetry</option>
                    </select>
                </div>
                <div>
                    <label for="">Image</label>
                    <input type="text" name="Image" id="Image" placeholder='Enter Image Url...' value={Image} onChange={handleImage} required />
                </div>
                <div>
                    <h3 className='ErrorField' >{ErrorField}</h3>
                    <h4 className='Error'>{Error}</h4>
                    <h4 className='Success' >{Success}</h4>
                    <button onClick={AddBook} type="submit">Add Book</button>
                </div>
            </form>
            </form>
        </section>
    </div>
)
}

export default Create