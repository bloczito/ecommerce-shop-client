import { Dispatch, SetStateAction } from "react";
import { BasketItem, CategoryWithSub, Product } from "./index";
import { NotificationType } from "./MiscTypes";
import { AlertColor } from "@mui/material";

export interface ShopContextState {
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
	type: AlertColor;
	openNotification: (msg: string, type?: AlertColor) => void;
	closeNotification: () => void;
}

export interface BasketContextState {
	items: BasketItem[];
	addItem: (newProduct: Product) => void;
	removeItem: (productId: number, all?: boolean) => void;
	clearBasket: () => void;
}

export interface UserContextState {
	token?: string;
	signOut: () => void;
	signIn: (token: string) => void;
}

export interface PaymentContextState {
	clientSecret?: string,
	createPayment: (amount: number) => void
}
