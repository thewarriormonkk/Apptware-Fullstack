import { useEffect } from 'react';
import ProductDetails from './ProductDetails';
import { useProductsContext } from '../hooks/useProductsContext';

const ProductTable = () => {
    const { products, dispatch } = useProductsContext();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: data });
            }
        }
        fetchProducts();
    }, [dispatch]);

    return (
        <div className="product-table">
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Color</th>
                        <th>Dimension</th>
                        <th>Price</th>
                        <th>Country</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                    {products && products.map((product) => (
                        <ProductDetails key={product._id} product={product} />
                    ))}
            </table>
        </div>
    );
}

export default ProductTable;