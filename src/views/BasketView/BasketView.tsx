import React, { useContext } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { BasketContext } from "../../context/BasketContext";
import BasketItemCard from "../../components/BasketItem/BasketItemCard";


const BasketView: React.FC = () => {
	const {items, addItem, removeItem} = useContext(BasketContext)

	return (
		<Container maxWidth="sm">
			<Typography
				variant="h5"
				marginBottom={3}
			>
				Koszyk
			</Typography>

			{items.map((i, index) => (
				<Box key={i.product.id}>
					<BasketItemCard
						key={i.product.id}
						item={i}
					/>
					{(index < items.length - 1) && (
						<Divider/>
					)}
				</Box>
			))}

		</Container>
	)
}

export default BasketView;
