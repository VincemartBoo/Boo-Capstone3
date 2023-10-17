import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Login(props) {
    const {user, setUser} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(true);

    function authenticate(e) {

       
        e.preventDefault();
        fetch('https://boo-capstone2.onrender.com/b4/users/login',{
		method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

           email: email,
           password: password

           })
       })
       .then(res => res.json())
       .then(data => {

           console.log(data); 

           if(typeof data.access !== "undefined"){
                
                localStorage.setItem('token', data.access);

                
                retrieveUserDetails(data.access)

                Swal.fire({
                    title: "Login Successful!",
                    icon: "success",
                    text: "Welcome Pirate!"
                })

                setUser({
                    access: localStorage.getItem('token')
                })


               
           } else {

                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Check your login details and try again"
                })
           }
       })
       setEmail('');
       setPassword('');


    }

    const retrieveUserDetails = (token) => {
        
        fetch('https://boo-capstone2.onrender.com/b4/users/userDetails', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
    }




    useEffect(() => {

       if(email !== '' && password !== ''){
           setIsActive(true);
       }else{
           setIsActive(false);
       }

    }, [email, password]);

    return ( 
        (user.id !== null) ?
            <Navigate to="/" />
        :   
        	<div className="container">
            <Form onSubmit={(e) => authenticate(e)}>
               <h1 className="my-5 text-center">Log in</h1>
               <Form.Group controlId="userEmail" class="pb-3">
                   <Form.Label>Email:</Form.Label>
                   <Form.Control 
                       type="email" 
                       placeholder="Enter your email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                   />
               </Form.Group>

               <Form.Group controlId="password" class="pb-3">
                   <Form.Label>Password:</Form.Label>
                   <Form.Control 
                       type="password" 
                       placeholder="Enter your password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                   />
               </Form.Group>
               { isActive ?
                   <Button variant="primary" type="submit" id="submitBtn">
                       Submit
                   </Button>
                   :
                   <Button variant="primary" type="submit" id="submitBtn" disabled>
                       Submit
                   </Button>
                }
           </Form>
           </div>
    )
}