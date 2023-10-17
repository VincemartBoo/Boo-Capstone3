import {Form, Button,} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function Register(){
	
	const {user} = useContext(UserContext);

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPassword, setVerifyPassword] = useState("");
	const [isActive, setIsActive] = useState(false);

	console.log(email);
	console.log(password);
	console.log(verifyPassword);

	function registerUser(e){

		e.preventDefault();

		fetch('https://boo-capstone2.onrender.com/b4/users/register', {
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
			console.log(data)
			
			if(data){
				setEmail("");
				setPassword("");
				setVerifyPassword("")

				Swal.fire({
                    title: "Register Successful!",
                    icon: "success",
                    text: "Thank you for registratrion"
                })
				navigate("/login")
			} 
			else {
				Swal.fire({
                    title: "Failed to Register",
                    icon: "error",
                    text: "error for registration"
                })
			}
		})

	}

	useEffect(()=>{
		if(email !== "" && password !=="" && verifyPassword !== "" && password === verifyPassword){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	},[email, password, verifyPassword])


	return(
		(user.id !== null) ?
			<Navigate to="/login" />
		:
			<div className="container">
			<Form onSubmit={(e) => registerUser(e)}>
		        <h1 className="my-5 text-center">Register</h1>
		            <Form.Group className="pb-3">
		                <Form.Label>Email:</Form.Label>
		                <Form.Control type="email" placeholder="Enter your email" required value={email} onChange={e => {setEmail(e.target.value)}}/>
		            </Form.Group>
		            <Form.Group className="pb-3">
		                <Form.Label>Password:</Form.Label>
		                <Form.Control type="password" placeholder="Enter your password" required value={password} onChange={e => {setPassword(e.target.value)}}/>
		            </Form.Group>
		            <Form.Group className="pb-3">
		                <Form.Label>Verify Password:</Form.Label>
		                <Form.Control type="password" placeholder="Verify your password" required value={verifyPassword} onChange={e => {setVerifyPassword(e.target.value)}}/>
		            </Form.Group>
		            
		            { 
		            	isActive

		            	?<Button variant="danger" type="submit" id="submitBtn" >Please enter your registration details</Button>
		            	:<Button variant="danger" type="submit" id="submitBtn" disabled>Please enter your registration details</Button>
		            }

	        </Form>
	        </div>
	)
}