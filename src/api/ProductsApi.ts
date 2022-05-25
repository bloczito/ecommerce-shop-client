import { Product } from "../types";
import axios from "../config/AxiosConfig";

export const fetchProducts = async (
	category?: string,
	subcategory?: string
): Promise<Product[]> => {
	const categoryQ = category ? `category=${category}` : "";
	const subcategoryQ = subcategory ? `&subcategory=${subcategory}` : "";

	return await axios.get(`/products`, {
		params: {
			category,
			subcategory
		}
	})
}

export const fetchProductById = (id: number): Promise<Product> =>
	axios.get(`/products/${id}`)
