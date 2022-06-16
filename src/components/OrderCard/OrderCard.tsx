import { FC } from "react";
import {
	Accordion, AccordionDetails,
	AccordionSummary,
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Typography,
	CardProps
} from "@mui/material";
import { CartItem, Order } from "../../types";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from "../Image/Image";

interface OrderCardProps {
	order: Order,
	defaultExpanded?: boolean,
}

const CardItem: FC<{item: CartItem} & CardProps> = ({item, ...props}) => (
	<Card {...props} sx={{...props.sx, padding: 2}} elevation={0} >
		<Box display="flex" justifyContent="space-between">
			<Box display="flex" justifyContent="flex-start">
				<Image url={item.product.url} height={180} marginRight={2}/>
				<Box>
					<Typography variant="subtitle1" fontWeight="bold" fontSize={18}>
						{item.product.name}
					</Typography>
					<Typography variant="body1">
						{item.product?.brand}
					</Typography>

					<Typography variant="body2" mt={2}>
						{item.product?.description && item.product?.description}
					</Typography>
				</Box>
			</Box>

			<Box display="flex" flexDirection="column" alignItems="end">
				<Typography>
					{item.quantity} x {item.product.price} zł
				</Typography>

				<Typography>
					{item.quantity * item.product.price} zł
				</Typography>
			</Box>
		</Box>
	</Card>
)

const OrderCard: FC<OrderCardProps> = ({order, defaultExpanded = false}) => {
	return (
		<Card sx={{marginBottom: 5}}>
			<CardContent>
				<Typography variant="h6">
					Zamówienie nr. {order.orderNumber}
				</Typography>

				<Divider sx={{marginTop: 1, marginBottom: 1}}/>

				<Grid container>
					<Grid item xs={4}>
						<Typography variant="subtitle1" fontWeight="bold">
							Adres dostawy:
						</Typography>
						<Typography mt={1}>
							{order.street}
							<br/>
							{order.postcode} {order.city}
						</Typography>
					</Grid>

					<Grid item xs={4}>
						<Typography variant="subtitle1" fontWeight="bold">
							Imię i nazwisko:
						</Typography>
						<Typography>
							{order.customerName}
						</Typography>

						<Typography variant="subtitle1" fontWeight="bold">
							Email:
						</Typography>
						<Typography>
							{order.email}
						</Typography>
					</Grid>
				</Grid>


				<Accordion elevation={0} defaultExpanded={defaultExpanded}>
					<AccordionSummary color="secondary" expandIcon={ <ExpandMoreIcon/> }>
						<Typography fontWeight="bold">Zamówione produkty</Typography>
					</AccordionSummary>

					<AccordionDetails>
						{order.items.map((item, idx, array) => (
							<>
								<CardItem key={item.id} item={item} sx={{marginBottom: 1}}/>

								{idx !== (array.length - 1) && <Divider key={idx}/>}
							</>
						))}
					</AccordionDetails>
				</Accordion>
			</CardContent>
		</Card>
	)
}


export default OrderCard
