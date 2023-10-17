import {CardGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts(){
	const [previews, setPreviews] = useState([])

	useEffect(() => {
		fetch(`https://boo-capstone2.onrender.com/b4/products/allActive`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			
			const numbers = []
			const featured = []

			
			const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.length)

				if(numbers.indexOf(randomNum) === -1){
					numbers.push(randomNum)
				}else{
					generateRandomNums()
				}
			}

			
			for(let i = 0; i < data.length; i++){
				generateRandomNums()

				
				featured.push(
					<PreviewProducts data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2} />
				)
			}

			
			setPreviews(featured)
		})
	}, [])

	return(
		<>
			<h2 className="text-center">Featured Products</h2>
			<CardGroup className="justify-content-center">
				{previews}
			</CardGroup>
		</>
	)
}