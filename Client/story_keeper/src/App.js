import './App.css';
import { Routes, Route } from "react-router-dom"
import Header from './Components/Header/Header';
import Create from './Pages/Create/Create';
import Home from './Pages/Home/Home';
import Register from './Pages/User/Register/Register';
import Login from './Pages/User/Login/Login';
import Edit from './Pages/Edit/Edit';
import Details from './Pages/Details/Details';
import Profile from './Pages/User/Profile/Profile';
import EditDetails from './Pages/User/EditDetails/EditDetails';
import DeleteProfile from './Pages/User/DeleteProfile/DeleteProfile';
import { useGetUserID } from "./Components/Hooks/UseGetUserID";

function App() {

  const userID = useGetUserID();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={ userID ? <Home /> : <Login /> } />
        <Route path='/Create' element={ userID ? <Create /> : <Login />  } />
        <Route path='/Edit/:_id' element={<Edit />} />
        <Route path='/Information/:id' element={<Details />}  />
        <Route path='/Registration' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Profile/:_id' element={ userID ? <Profile /> : <Login /> } />
        <Route path='/MyProfile/:id' element={<EditDetails />} />
        <Route path='/DeleteProfile' element={<DeleteProfile />} />
      </Routes>
    </div>
  );
}

export default App;
