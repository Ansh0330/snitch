import { setError,setSellerProducts,setLoading } from "../state/products.slice";
import { createProduct, getSellerProducts } from "../service/products.api";
import { useDispatch } from "react-redux";

export const useProducts = () => {
    const dispatch = useDispatch();

    const handleCreateProduct = async (formData) => {
        dispatch(setLoading(true));
        try {
            const data = await createProduct(formData);
            return data.product;
        } catch (error) {
            dispatch(setError(error));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetSellerProducts = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products));
        } catch (error) {
            dispatch(setError(error));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleCreateProduct, handleGetSellerProducts };
}