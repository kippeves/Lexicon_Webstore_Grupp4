import { Product, ProductList, ThinProduct, ThinProductList } from "../types";
const baseURI = 'https://dummyjson.com/products/';


export const getProduct = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${baseURI}${id}`);
        return await response.json() as Product;
    } catch (e) {
        throw (e);
    }
}

export const searchByNameList = async (name: string): Promise<ThinProductList> => {
    try {
        const response = await fetch(`${baseURI}search?q=${name}&select=title,price,discountPercentage,thumbnail,rating,availabilityStatus`);
        return await response.json() as ThinProductList;
    } catch (e) {
        throw (e);
    }
}

export const searchByNameFull = async (name: string): Promise<ProductList> => {
    try {
        const response = await fetch(`${baseURI}search?q=${name}`);
        return await response.json() as ProductList;
    } catch (e) {
        throw (e);
    }
}


export const getProducts = async ({ limit }: { limit?: number }): Promise<ThinProduct[]> => {
    const filter = '?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus';
    const limitFilter = limit !== undefined ? `${filter}&limit=${Math.ceil(limit / 4)}` : filter;
    const categories = ['smartphones', 'tablets', 'mobile-accessories', 'laptops'];
    const filterURIS = categories.map(categoryName => `${baseURI}category/${categoryName}${limitFilter}`)

    try {
        const tasks = filterURIS.map(async uri => {
            return new Promise<ThinProductList>((resolve) => {
                setTimeout(async () => {
                    const request = await fetch(uri);
                    const list = await request.json() as ThinProductList;
                    resolve(list);
                }, 250);
            });
        });

        const data = await Promise.all(tasks);
        const returnItems = data.reduce((accumulator, currentValue) => {
            return { ...accumulator, products: accumulator?.products?.concat(currentValue.products) }
        }).products;

        return limit ? returnItems.slice(0, limit) : returnItems;

    } catch (e) {
        throw (e);
    }
}

// 'https://dummyjson.com/products/category/smartphones/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'
// 'https://dummyjson.com/products/category/tablets/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'
// 'https://dummyjson.com/products/category/mobile-accessories/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'
// 'https://dummyjson.com/products/category/laptops/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'