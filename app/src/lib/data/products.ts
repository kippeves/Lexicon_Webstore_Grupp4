import { Product, ProductsFilter, ThinProduct, ThinProductList } from "../types";
//const baseURI = 'https://dummyjson.com/products';
const baseURI = 'https://kippeves.se/products';
const thinFields = 'select=title,price,discountPercentage,thumbnail,rating,availabilityStatus';


export const getProduct = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${baseURI}/${id}`);
        return await response.json() as Product;
    } catch (e) {
        throw (e);
    }
}

export const getThinProduct = async (id: number): Promise<ThinProduct> => {
    try {
        const response = await fetch(`${baseURI}/${id}?${thinFields}`);
        return await response.json() as ThinProduct;
    } catch (e) {
        throw (e);
    }
}

export const searchByName = async ({ name, page }: { name: string, page?: { number: number, perPage: number } }): Promise<ThinProductList> => {
    try {
        let URI = `${baseURI}/search?q=${name}&${thinFields}`
        if (page)
            URI += `&skip=${page.perPage * (page.number - 1)}&limit=${page.perPage}`;
        const response = await fetch(URI);
        return await response.json() as ThinProductList;
    } catch (e) {
        throw (e);
    }
}

export const getProducts = async ({ limit }: { limit?: number }): Promise<ThinProduct[]> => {
    const filter = '?' + thinFields;
    const limitFilter = limit !== undefined ? `${filter}&limit=${Math.ceil(limit / 4)}` : filter;
    const categories = ['smartphones', 'tablets', 'mobile-accessories', 'laptops'];
    const filterURIS = categories.map(categoryName => `${baseURI}/category/${categoryName}${limitFilter}`)

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

export const getProductsByFilter = async (filter: ProductsFilter): Promise<ThinProductList> => {
    const { limit = 12, page = 1, sort = "id", order = "desc", categories = [], query } = filter;
    const paging = `&limit=${limit}&skip=${(page - 1) * limit}`;
    const ordering = `&sortBy=${sort}&order=${order}`;
    let categoring = "";
    // Remove 'all'
    const rm = categories.findIndex((val) => (val === "all"));
    if(rm >= 0) {
        categories.splice(rm, 1);
    }
    
    if (categories.length > 0) {
            categoring = `&categories=${categories.join()}`;
    }
    let uri = `${baseURI}?${thinFields}${paging}${ordering}${categoring}`;
    if (query) {
        uri = `${baseURI}/search?q=${query}&${thinFields}${paging}${ordering}${categoring}`;
    }

    try {
        const task = new Promise<ThinProductList>((resolve) => {
            setTimeout(async () => {
                const request = await fetch(uri);
                const list = await request.json() as ThinProductList;
                // Enforce limit as limit instead of potential result count
                list.limit = limit;
                resolve(list);
            }, 250);
        });
        return await task;

    } catch (e) {
        throw (e);
    }
}

// 'https://dummyjson.com/products/category/smartphones/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'
// 'https://dummyjson.com/products/category/tablets/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'
// 'https://dummyjson.com/products/category/mobile-accessories/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'
// 'https://dummyjson.com/products/category/laptops/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'