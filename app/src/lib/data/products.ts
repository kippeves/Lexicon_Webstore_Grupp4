import { Product, ProductsFilter, SidebarFilterValues, ThinProduct, ThinProductList } from "../types";
//const baseURI = 'https://dummyjson.com/products';
const baseURI = 'https://www.kippeves.se/products';
const thinFields = 'select=title,price,discountPercentage,thumbnail,rating,availabilityStatus';


export const getProduct = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${baseURI}/${id}`);
        return await response.json() as Product;
    } catch (e) {
        throw (e);
    }
}

export const getFilterValues = async (values: string[]) => {
    try {
        const params = values.join(',');
        const uri = `${baseURI}/distinct?select=${params}`;
        const response = await fetch(uri);
        return await response.json() as SidebarFilterValues;
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
    const params = new URLSearchParams();
    const { limit = 12, page = 1, sort = "id", order = "desc", categories, query, brand } = filter;
    params.set("limit", limit.toString())
    params.set("skip", `${(page - 1) * limit}`);
    params.set("sort", sort);
    params.set("order", order);

    if (query)
        params.set("q", query);
    if (brand)
        params.set("brand", brand.join())
    if (categories && !categories?.includes("all"))
        params.set("categories", categories.join())

    const uri = decodeURIComponent(`${baseURI}?${thinFields}&${params}`);
    const decoded = decodeURIComponent(uri);
    const request = await fetch(decoded);
    return await request.json() as ThinProductList;
}

// 'https://dummyjson.com/products/category/smartphones/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'
// 'https://dummyjson.com/products/category/tablets/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'
// 'https://dummyjson.com/products/category/mobile-accessories/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'
// 'https://dummyjson.com/products/category/laptops/?select=title,price,discountPercentage,thumbnail,rating,availabilityStatus'