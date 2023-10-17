import {useState,useEffect, useContext} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import EditProduct from './EditProduct';
import ArchiveProduct from "./ArchiveProduct"

export default function AddCourse(){


    const [isActive, setIsActive] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    //input states
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");

    function createProduct(e){

        
        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch('https://boo-capstone2.onrender.com/b4/products/',{

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                name: name,
                description: description,
                price: price

            })
        })
        .then(res => res.json())
        .then(data => {

            
            console.log(data);

            if(data){
                Swal.fire({

                    icon:"success",
                    title: "Product Added"

                })

                navigate("/products");
            } else {
                Swal.fire({

                    icon: "error",
                    title: "Unsuccessful Product Creation",
                    text: data.message

                })
            }

        })

        setName("")
        setDescription("")
        setPrice(0);
    }

    return (

            (user.isAdmin === true)
            ?
            <>
                {['top'].map((placement) => (
                            <OverlayTrigger
                            key={placement}
                            placement={placement}
                            overlay={<Tooltip>Add New Product</Tooltip>}>
                                <Button variant="primary" className='p-2'  onClick={handleShow}>Add New Product</Button>
                            </OverlayTrigger>
                        ))}

                <Modal show={show} centered onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Add Product</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={e => createProduct(e)}>
                                    <Form.Group>
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Description:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group className='mb-5'>
                                        <Form.Label>Price:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                        { 
                                            isActive 
                                            ?<Button variant="primary" type="submit" onClick={handleClose} >Submit</Button>
                                            :<Button variant="primary" type="submit" disabled>Submit</Button>
                                        }
                                    </Modal.Footer>
                                    
                                    
                                </Form>
                            </Modal.Body>
                            
                        </Modal>
            </>
            :
            <Navigate to = "/products" />

    )


}
