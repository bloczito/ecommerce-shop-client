import { Product } from "../types";
import axios from "../config/AxiosConfig";

export const fetchProducts = async (
	category?: string,
	subcategory?: string
): Promise<Product[]> => {
	return await axios.get(`/products`, {
		params: {
			category,
			subcategory
		}
	})
}

export const fetchProductById = (id: number): Promise<Product> =>
	axios.get(`/products/${id}`)
