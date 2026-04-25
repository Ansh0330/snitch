import axios from "axios";

const productsApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true,
});


export const createProduct = async (formData) => {  
    try {
        const response = await productsApiInstance.post("/", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSellerProducts = async () => {
    try {
        const response = await productsApiInstance.get("/seller");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllProducts = async () => {
    try {
        const response = await productsApiInstance.get("/allProducts");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await productsApiInstance.get(`/detail/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
