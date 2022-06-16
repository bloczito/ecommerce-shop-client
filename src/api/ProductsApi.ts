import { Product } from "../types";
import axios from "../config/AxiosConfig";

export const fetchProducts = async (params: {
	category?: string,
	subcategory?: string,
	random?: boolean
}): Promise<Product[]> => {

	return await axios.get(`/products`, {
		params
	})
}

export const fetchProductById = (id: number): Promise<Product> =>
	axios.get(`/products/${id}`)
