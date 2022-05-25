import React from "react";
import { Product } from "../../types";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
	product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
	const navigate = useNavigate()

	return (
		<Card sx={{maxWidth: 345}} elevation={0} style={{marginBottom: 20}}>
			<CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
				<CardMedia
					component="img"
					height={400}
					image="https://img01.ztat.net/article/spp-media-p1/1ce13c43ed1530699ef8943cdfdf5497/3281da7782f24a02a5b34ffff422af45.jpg?imwidth=1800"
					alt="blouse"
				/>
				<CardContent>
					<Typography
						// gutterBottom
						variant="subtitle1"
						component="div"
					>
						{product.name}
					</Typography>
					<Grid container justifyContent="space-between">
						<Typography variant="body1">
							{product.brand.name}
						</Typography>

						<Typography variant="button">
							{product.price} zł
						</Typography>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default ProductCard;
