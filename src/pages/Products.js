import ProductCard from '../components/ProductCard';
import {useEffect, useState, useContext} from 'react';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';




export default function Products(){
	

	const { user } = useContext(UserContext);

	
	const [products, setProducts] = useState([]);

	const fetchData = () => {
	    fetch(`https://boo-capstone2.onrender.com/b4/products/allProducts`)
	    .then(res => res.json())
	    .then(data => {
	        
	        console.log(data);

	        
	        setProducts(data);

	    });
	}


	
	useEffect(() => {

	    fetchData()

	}, []);

	

	return(
	    <>
	        {
	        	
	            (user.isAdmin === true) ?
	                <AdminView productsData={products} fetchData={fetchData} />
					:
	             	<UserView productsData={products} />
			}
	    </>
	)
}