import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home(){
	
	const data = {
        title: "Straw Hat Pirates Store",
        content: "Opportunities for everyone, everywhere",
        destination: "/b4/products",
        label: "Buy now!"
    }

	return(
		<>
			<Banner data={data} />
			<FeaturedProducts />
			<Highlights />
		</>
	)
}
