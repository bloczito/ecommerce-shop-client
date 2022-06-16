import { CreateOrderResult, NewOrder, Order } from "../types";
import axios from "../config/AxiosConfig";
import moment from "moment";

interface OrderDto extends Omit<Order, "orderDate"> {
	orderDate: string
}

const fetchOrders = (): Promise<Order[]> => {
	return axios.get("/orders")
	// @ts-ignore
		.then((orders: OrderDto[]) => orders.map(o => ({...o, orderDate: moment(o.orderDate)})))
}


const createOrder = (newOrder: NewOrder): Promise<CreateOrderResult> => {
	return axios.post("/orders", newOrder)
}


export const ordersApi = {
	fetchOrders,
	createOrder,
}
