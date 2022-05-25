import { BasketContextState, BasketItem, Product } from "../types";
import React, { useState } from "react";

const defaultValue: BasketContextState = {
	items: [],
	addItem: () => {},
	removeItem: () => {}
};

export const BasketContext = React.createContext(defaultValue);

export const BasketContextProvider:React.FC<{children: React.ReactElement}> = ({children}) => {
	const [items, setItems] = useState<BasketItem[]>([]);

	const addItem = (newProduct: Product) => {
		if(items.map(({product}) => product).includes(newProduct)) {
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

	return (
		<BasketContext.Provider
			value={{
				items,
				addItem,
				removeItem
			}}
		>
			{children}
		</BasketContext.Provider>
	)
}
