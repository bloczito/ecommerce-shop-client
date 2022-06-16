import { FC, useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { ordersApi } from "../../api/OrdersApi";
import { Order } from "../../types";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useLocation } from "react-router-dom";







const OrdersView: FC = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const orderId: number | null = parseInt(new URLSearchParams(useLocation().search).get("orderId") || "-1")

	useEffect(() => {
		ordersApi.fetchOrders().then(setOrders)
	}, [])


	return (
		<Container sx={{marginTop: 3}} maxWidth="md">
			<Typography variant="h5">
				Twoje zamówienia
			</Typography>

			<Divider sx={{marginTop: 2, marginBottom: 2}} />

			{orders.map(o => (
				<OrderCard key={o.id} order={o} defaultExpanded={o.id === orderId}/>
			))}

		</Container>
	)
}


export default OrdersView;
