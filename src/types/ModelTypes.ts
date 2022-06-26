import { Moment } from "moment";

export interface Product {
	id: number;
	name: string;
	price: number;
	url: string;
	description?: string;
	brand: Brand;
	category: Category;
	subCategory: Subcategory
}

export interface Brand {
	id: number,
	name: string,
}

export interface Category {
	name: string;
	title: string;
}

export interface Subcategory {
	name: string;
	title: string;
}

export interface CategoryWithSub extends Category{
	subcategories: Subcategory[]
}

export interface BasketItem {
	product: Product;
	quantity: number;
}

export interface ContactData {
	name: string,
	email: string,
	city: string,
	street: string,
	postcode: string
}

export interface AccountData {
	customerName?: string;
	email?: string;
	city?: string;
	street?: string;
	postcode?: string;
}

export interface Order {
	id: number;
	customerName: string;
	email: string;
	orderNumber: string;
	orderDate: Moment,
	city: string,
	street: string,
	postcode: string,
	items: CartItem[]
}

export interface CartProduct extends Omit<Product, "brand"> {
	brand: string;
}

export interface CartItem {
	id: number;
	quantity: number;
	product: CartProduct
}


export interface PaymentResponse {
	clientSecret: string
}

export interface NewOrder {
	customerName: string;
	email: string;

	city: string;
	street: string;
	postcode: string;

	items: {
		productId: number;
		quantity: number;
	}[]
}

export interface CreateOrderResult {
	orderId: number;
	orderNumber: string;
}

export interface SignUpDto {
	email: string;
	password: string;
	name?: string;
	street?: string;
	postcode?: string;
	city?: string;
}

export interface SignInDto {
	email: string;
	password: string;
}
