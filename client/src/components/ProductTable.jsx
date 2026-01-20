import { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';

const ProductTable = () => {
    const [products, setProducts] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (response.ok) {
                setProducts(data);
                console.log(data);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className="product-table">
            {products && products.map((product) => (
                <ProductDetails key={product._id} product={product} />
            ))}
        </div>
    );
}

export default ProductTable;