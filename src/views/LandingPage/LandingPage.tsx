import React, { FC, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Product } from "../../types";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../api/ProductsApi";


const LandingPage: FC = () => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetchProducts(undefined, undefined, true)
			.then(setProducts)
	}, [])

	return (
		<Container sx={{marginTop: 2}}>
			<Typography
				variant="h4"
				marginBottom={3}
			>
				Polecane
			</Typography>

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

export default LandingPage;
