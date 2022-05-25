import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types";
import { ProductsContext } from "../../context/ProductsContext";
import { Button, Container, Grid, Typography } from "@mui/material";
import Image from "../../components/Image/Image";
import { fetchProductById } from "../../api/ProductsApi";
import { BasketContext } from "../../context/BasketContext";
import { useSnackbar } from "notistack";

const ProductsDetailsView: React.FC = () => {
	const [product, setProduct] = useState<Product | null>(null);
	const {enqueueSnackbar} = useSnackbar();
	const {id}  = useParams<ProductId>()
	const {getById} = useContext(ProductsContext)
	const {addItem} = useContext(BasketContext)

	useEffect(() => {
		if (id && isNumeric(id)) {
			const byId = getById(Number(id))
			if (byId) {
				setProduct(byId)
			} else {
				fetchProductById(Number(id))
					.then(res => setProduct(res))
			}
		}
	}, [id])

	const handleAddItem = () => {
		if (product) {
			addItem(product)
			enqueueSnackbar("Dodano do koszyka!", {variant: "success"})
		}
	}

	return (
		<Container>
			{product ? (
				<Grid container spacing={2} justifyContent="space-between" marginTop={3}>
					<Grid item xs={6}>
						<Grid container justifyContent="center">
							<Image/>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Typography
							component="div"
							fontSize={20}
							gutterBottom
							marginBottom={2}
						>
							{product.brand.name}
						</Typography>
						<Typography
							component="div"
							variant="h5"
							gutterBottom
							marginBottom={2}
						>
							{product.name}
						</Typography>

						<Typography
							marginBottom={20}
							variant="body1"
						>
							{product.description}
						</Typography>

						<Button
							variant="contained"
							color="secondary"
							fullWidth
							disableElevation
							onClick={handleAddItem}
						>
							Dodaj do koszyka
						</Button>
					</Grid>
				</Grid>
			) : (
				<>Coś poszło nie tak</>
			)}
		</Container>
	);
}


type ProductId = {
	id: string
}

const isNumeric = (stingNumber: string) => /^-?[0-9]+(?:\.[0-9]+)?$/.test(stingNumber+'');

export default ProductsDetailsView;
