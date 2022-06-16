import React, { useEffect, useState } from "react";
import { CategoryWithSub, ShopContextState } from "../types";
import { fetchCategories } from "../api/CategoryApi";

const defaultState: ShopContextState = {
	categories: []
}

export const ShopContext = React.createContext(defaultState)

export const ShopContextProvider:React.FC<{children: React.ReactElement}> = ({children}) => {
	const [categories, setCategories] = useState<CategoryWithSub[]>([]);

	useEffect(() => {
		fetchCategories().then(res => setCategories(res));
	}, [])

	const providerValue: ShopContextState = {
		categories
	}

	return (
		<ShopContext.Provider value={providerValue}>
			{children}
		</ShopContext.Provider>
	)
}
