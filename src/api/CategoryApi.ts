import { CategoryWithSub, Product } from "../types";
import axios from "../config/AxiosConfig";


export const fetchCategories = (): Promise<CategoryWithSub[]> => {
	return axios.get("/categories")
}
