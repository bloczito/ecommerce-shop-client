import React, { useContext } from "react";
import { BasketItem } from "../../types";
import { Box, Card, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import { BasketContext } from "../../context/BasketContext";


interface BasketItemProps {
	item: BasketItem,
	summary?: boolean
}

const BasketItemCard: React.FC<BasketItemProps> = ({item, summary}) => {
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
				image={item.product.url}
			/>

			<Grid container justifyContent="space-between">
				<Box sx={{display: "flex", flexDirection: "column", justifyContent: summary ? "flex-start" : "space-between"}}>
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

					{!!summary ? (
						<Typography mt={2} variant="body2">
							{item.product.description}
						</Typography>
					) : (
						<Grid>
							<Typography>
								{product.price * quantity} zł
							</Typography>
							<Typography variant="caption">
								{quantity} x {product.price}
							</Typography>
						</Grid>
					)}
				</Box>
				<Box sx={{display: "flex", flexDirection: "column", justifyContent: summary ? "flex-start" : "space-between"}}>
					{!!summary ? (
						<>
							<Grid>
								<Typography>
									{product.price * quantity} zł
								</Typography>
								<Typography variant="caption">
									{quantity} x {product.price}
								</Typography>
							</Grid>
						</>
					) : (
						<>
							<QuantityPicker
								quantity={quantity}
								addItem={() => addItem(product)}
								removeItem={() => removeItem(product.id)}
							/>

							<Box sx={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
								<IconButton
									color="error"
									onClick={() => removeItem(product.id, true)}
									sx={{width: 55}}
								>
									<DeleteForeverIcon fontSize="large"/>
								</IconButton>
							</Box>
						</>
					)}
				</Box>

			</Grid>
		</Card>
	)
}


export default BasketItemCard;
