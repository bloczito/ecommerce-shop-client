import { BasketContextState, BasketItem, Product } from "../types";
import React, { useEffect, useState } from "react";

const defaultValue: BasketContextState = {
	items: [],
	addItem: () => console.error("No function defined"),
	removeItem: () => console.error("No function defined"),
	clearBasket: () => console.error("No function defined")
};

export const BasketContext = React.createContext(defaultValue);

export const BasketContextProvider:React.FC<{children: React.ReactElement}> = ({children}) => {
	const [items, setItems] = useState<BasketItem[]>(localStorage.getItem("items") !== null ? JSON.parse(localStorage.getItem("items") || "[]") as BasketItem[] : [])
	// const [items, setItems] = useState<BasketItem[]>(localStorage.getItem("items") !== null ? JSON.parse(localStorage.getItem("items") || "[]") as BasketItem[] : [])


	useEffect(() => {
			localStorage.setItem("items", JSON.stringify(items))
	}, [items])

	const addItem = (newProduct: Product) => {
		if(items.map(({product}) => product.id).includes(newProduct.id)) {
			setItems(prev => prev
				.map(({product, quantity}) => {
					return product.id === newProduct.id ?
						{product, quantity: quantity + 1} : {product, quantity}
				})
			)
		} else {
			setItems(prev => [...prev, {product: newProduct, quantity: 1}]);
		}
	}

	const removeItem = (productId: number, all?: boolean) => {
		setItems(prev => prev
			.map(({product, quantity}) => {
				if (product.id === productId) {
					return all ? {product, quantity: 0} : {product, quantity: quantity - 1}
				}
				return {product, quantity}
			})
			.filter(({quantity}) => !!quantity)
		)
	}

	const clearBasket = () => {
		setItems([]);
	}

	return (
		<BasketContext.Provider
			value={{
				items,
				addItem,
				removeItem,
				clearBasket
			}}
		>
			{children}
		</BasketContext.Provider>
	)
}
