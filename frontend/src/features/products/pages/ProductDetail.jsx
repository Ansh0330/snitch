import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router'
import { useProducts } from '../hook/useProducts'

const ProductDetail = () => {
  const {productId} = useParams()

  const [product,setProduct] = useState(null)
  const { handleGetProductById } = useProducts();
  
  const fetchProductDetails = async () => {
    try{
        const data = await handleGetProductById(productId);
        setProduct(data);
    }catch(error){
        console.log(error);
    }
  }


  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  return (
    <div>ProductDetail</div>
  )
}

export default ProductDetail