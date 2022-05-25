import React, { useEffect, useState } from "react";
import { CategoryWithSub, Product, ShopContextState } from "../types";
import { fetchProducts } from "../api/ProductsApi";
import { fetchCategories } from "../api/CategoryApi";

const defaultState: ShopContextState = {
	products: [],
	categories: []
}

export const ShopContext = React.createContext(defaultState)

export const ShopContextProvider:React.FC<{children: React.ReactElement}> = ({children}) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<CategoryWithSub[]>([]);

	useEffect(() => {
		fetchProducts().then(res => setProducts(res));
		fetchCategories().then(res => setCategories(res));
	}, [])

	const providerValue: ShopContextState = {
		products,
		categories
	}

	return (
		<ShopContext.Provider value={providerValue}>
			{children}
		</ShopContext.Provider>
	)
}
