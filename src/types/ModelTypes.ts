export interface Product {
	id: number;
	name: string;
	price: number;
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
