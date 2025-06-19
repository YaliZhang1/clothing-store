import { productFilter } from "../filters/productFilter";
import { getProductsFromApi } from "../api/getProductsFromApi";

export async function categoriePage() {

    productFilter();

    getProductsFromApi("products");

}