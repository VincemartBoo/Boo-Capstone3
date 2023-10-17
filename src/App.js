import './App.css';
import {UserProvider} from './UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';



function App() {
  
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () =>{
    localStorage.clear();
  }

  useEffect(() => {
    console.log(user);
    fetch(`https://boo-capstone2.onrender.com/b4/users/userDetails`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(typeof data._id !== "undefined"){
        setUser({
            id: data._id,
            isAdmin: data.isAdmin
        });
      }else{
          setUser({
            id: null,
            isAdmin: null
          })
      }
    })
  }, [])


  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <Container fluid>
            <AppNavbar />
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/products" element={<Products/>} />
                  <Route path="/products/:productId" element={<ProductView/>} />
                  
              </Routes>
        </Container>
      </Router>
    </UserProvider>   
  );
}

export default App;
