import { useState } from 'react';
import {Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProductCard({productProp}) {

    const { _id, name, description, price} = productProp;



    // const [count, setCount] = useState(0);
    // console.log(useState(0));

    // const [seats, setSeats] = useState(10);

    // function enroll(){
    //     if (seats > 0) {
    //         setCount(count + 1);
    //         console.log('Enrollees: ' + count);
    //         setSeats(seats - 1);
    //         console.log('Seats: ' + seats)
    //     } else {
    //         alert("No more seats available");
    //     };
    // }

    return (

        <Row className="my-3">
            <Col xs={12} md={4}>
                
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        
                        <Card.Text>{description}</Card.Text>
                        
                        <Card.Text>PhP {price}</Card.Text>
                        <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}


ProductCard.propTypes = {
    
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}