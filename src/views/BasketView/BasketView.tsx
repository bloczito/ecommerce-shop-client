import React, { useContext } from "react";
import { Box, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { BasketContext } from "../../context/BasketContext";
import BasketItemCard from "../../components/BasketItem/BasketItemCard";
import { BasketItem } from "../../types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const getBasketValue = (items: BasketItem[]): number => items
		.map(({product, quantity}) => quantity * product.price)
		.reduce(((previousValue, currentValue) => previousValue + currentValue))

const BasketView: React.FC = () => {
	const navigate = useNavigate();
	const {items} = useContext(BasketContext);
	const {token} = useContext(UserContext);

	const handleFinishShopping = () => {
		if (!!token) {
			navigate("/payment")
		} else {
			navigate("/signIn?redirectPayment=true")
		}
	}


	return (
		<Container maxWidth="lg">
			<Typography
				variant="h4"
				marginBottom={3}
				marginTop={2}
			>
				Koszyk
			</Typography>

			{items.length ? (
				<Grid container spacing={5}>
					<Grid item sm={8}>
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
					</Grid>

					<Grid item sm={4}>
						<Box
							component={Paper}
							variant="outlined"
							padding={2}
						>
							<Typography variant="h6">
								Do zapłaty:
							</Typography>

							<Box
								display="flex"
								justifyContent="space-between"
								marginTop={2}
							>
								<Typography>
									Wartość produktów:
								</Typography>
								<Typography>
									{getBasketValue(items).toFixed(2)} zł
								</Typography>
							</Box>

							<Box
								display="flex"
								justifyContent="space-between"
								marginTop={2}
								marginBottom={2}
							>
								<Typography>
									Przesyłka:
								</Typography>
								<Typography>
									0.00 zł
								</Typography>
							</Box>

							<Divider/>

							<Button
								variant="contained"
								fullWidth
								disableElevation
								sx={{marginTop: 2}}
								onClick={handleFinishShopping}
							>
								Zapłać
							</Button>

						</Box>
					</Grid>
				</Grid>
			) : (
				<Typography variant="h5">Twój koszyk jest pusty</Typography>
			)}

		</Container>
	)
}

export default BasketView;
