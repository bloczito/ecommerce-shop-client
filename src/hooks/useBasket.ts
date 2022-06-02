import { useState } from "react";
import { Product } from "../types";


const useBasket = (label: String) => {
	const [basket, setBasket] = useState<Product[]>([]);


	const addProduct = (product: Product) => {
		console.log("Adding", product)
		setBasket([...basket, product]);
	}
	const removeProduct = (productId: number) =>
		setBasket(prev => prev.filter(({id}) => productId !== id));

	return {
		products: basket,
		addProduct,
		removeProduct
	}
}

export default useBasket;
