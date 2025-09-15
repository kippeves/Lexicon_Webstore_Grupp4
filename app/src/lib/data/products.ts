import { Product, ThinProduct, ThinProductList } from "../types";
const baseURI = 'https://www.kippeves.se/';
const productURI = baseURI + 'products/';

const thinFilter = 'select=title,price,discountPercentage,thumbnail,rating,availabilityStatus';

export const getProduct = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${productURI}${id}`);
        return await response.json() as Product;
    } catch (e) {
        throw (e);
    }
}

export const getThinProduct = async (id: number): Promise<ThinProduct> => {
    try {
        const response = await fetch(`${productURI}${id}?${thinFilter}`);
        return await response.json() as ThinProduct;
    } catch (e) {
        throw (e);
    }
}

export const searchByName = async ({ name, page }: { name: string, page?: { number: number, perPage: number } }): Promise<ThinProductList> => {
    try {
        let URI = `${productURI}search?q=${name}&${thinFilter}`
        if (page)
            URI += `&skip=${page.perPage * (page.number - 1)}&limit=${page.perPage}`;
        const response = await fetch(URI);
        return await response.json() as ThinProductList;
    } catch (e) {
        throw (e);
    }
}

export const getProducts = async ({ limit }: { limit?: number }): Promise<ThinProduct[]> => {
    const filter = '?' + thinFilter;
    const limitFilter = limit !== undefined ? `${filter}&limit=${Math.ceil(limit / 4)}` : filter;
    const categories = ['smartphones', 'tablets', 'mobile-accessories', 'laptops'];
    const filterURIS = categories.map(categoryName => `${productURI}category/${categoryName}${limitFilter}`)

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