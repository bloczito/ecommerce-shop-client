import { Product, ProductsContextState } from "../types";
import React, { useState } from "react";


const defaultState: ProductsContextState = {
	products: [],
	setProducts: () => {},
	getById: () => undefined
}


export const ProductsContext = React.createContext(defaultState);

export const ProductsContextProvider: React.FC<{children?: React.ReactElement | React.ReactElement[]}> = ({children}) => {
	const [products, setProducts] = useState<Product[]>([]);


	const providerValue: ProductsContextState = {
		products,
		setProducts,
		getById: id => products.find(p => p.id === id)
	}

	return (
		<ProductsContext.Provider value={providerValue}>
			{children}
		</ProductsContext.Provider>
	)
}
