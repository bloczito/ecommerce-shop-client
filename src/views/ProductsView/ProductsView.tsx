import React, { useContext, useEffect} from "react";
import { Container, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../../api/ProductsApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ProductsContext } from "../../context/ProductsContext";


const ProductsView: React.FC = () => {
	const {products, setProducts} = useContext(ProductsContext)
	// const {addItem} = useContext(BasketContext);
	// const {openNotification} = useContext(NotificationContext);
	const [params] = useSearchParams();

	useEffect(() => {
		fetchProducts(
			params.get("category") || undefined,
			params.get("subcategory") || undefined,
		).then(res => setProducts(res))
	}, [params, params.get("category"), params.get("subcategory")])


	return (
		<Container>
			<Grid container spacing={2}>
				{products.map(p => (
					<Grid key={p.id} item lg={3} md={4}>
						<ProductCard product={p}/>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}


export default ProductsView
