import React, { useContext } from "react";
import { BasketItem } from "../../types";
import { Box, Card, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import { BasketContext } from "../../context/BasketContext";


interface BasketItemProps {
	item: BasketItem
}

const BasketItemCard: React.FC<BasketItemProps> = ({item}) => {
	const {product, quantity} = item;
	const {addItem, removeItem} = useContext(BasketContext)

	return (
		<Card
			elevation={0}
			sx={{
				display: "flex",
				gap: 5,
				marginTop: 3,
				marginBottom: 3,
			}}
		>
			<CardMedia
				component="img"
				sx={{maxWidth: 140, maxHeight: 150}}
				image="https://img01.ztat.net/article/spp-media-p1/6679a0aeaacd3e808aeefe9c52809b0d/f4ab0643612946ae885e511c53873da2.jpg?imwidth=1800&filter=packshot"
			/>

			<Grid container justifyContent="space-between">
				<Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
					<Grid>
						<Typography
							component="div"
							variant="subtitle1"
						>
							{product.brand.name}
						</Typography>

						<Typography
							component="div"
							variant="h6"
						>
							{product.name}
						</Typography>
					</Grid>

					<Grid>
						<Typography>
							{product.price * quantity} zł
						</Typography>
						<Typography variant="caption">
							{quantity} x {product.price}
						</Typography>
					</Grid>
				</Box>
				<Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
					<QuantityPicker
						quantity={quantity}
						addItem={() => addItem(product)}
						removeItem={() => removeItem(product.id)}
					/>

					<IconButton
						color="error"
						onClick={() => removeItem(product.id, true)}
					>
						<DeleteForeverIcon fontSize="large"/>
					</IconButton>
				</Box>

			</Grid>
		</Card>
	)
}


export default BasketItemCard;
