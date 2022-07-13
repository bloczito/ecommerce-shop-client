import axios from "../config/AxiosConfig";
import { PaymentResponse } from "../types";



const createPayment = (amount: number): Promise<PaymentResponse> =>
	axios.post("/payments", {amount})


export const paymentApi = {
	createPayment
}
