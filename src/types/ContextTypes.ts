import { Dispatch, SetStateAction } from "react";
import { BasketItem, CategoryWithSub, Product } from "./index";
import { NotificationType } from "./MiscTypes";

export interface ShopContextState {
	products: Product[];
	categories: CategoryWithSub[];
}

export interface ProductsContextState {
	products: Product[];
	setProducts: Dispatch<SetStateAction<Product[]>>;
	getById: (id: number) => (Product | undefined)
}

export interface NotificationContextState {
	isOpen: boolean;
	message: string | null;
	openNotification: (msg: string, type?: NotificationType) => void;
	closeNotification: () => void;
}

export interface BasketContextState {
	items: BasketItem[];
	addItem: (newProduct: Product) => void;
	removeItem: (productId: number, all?: boolean) => void;
}

