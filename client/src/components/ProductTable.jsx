import { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';
import { useProductsContext } from '../hooks/useProductsContext';

const ProductTable = () => {
    const { products, dispatch } = useProductsContext();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [searchBy, setSearchBy] = useState('');
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
    }, [dispatch, API_URL]);

    // search by product name
    const filteredProducts = products?.filter(product => {
            if (!searchBy || !searchKeyword) return true;
            
            return product[searchBy]?.toLowerCase().includes(searchKeyword.toLowerCase())
    }) || [];


    // sort by selected property
    const finalProductList = [...filteredProducts].sort((a, b) => {
        if (!sortBy) return 0;

        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        // string comparison
        if (typeof aVal === 'string') {
            return aVal.toLowerCase().localeCompare(bVal.toLowerCase());
        }

        // number comparison
        return aVal - bVal;
    });



    return (
        <div className="product-table">
            <div className="search-filter">
                 <input 
                    type='text'
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    value={searchKeyword}
                    placeholder='Search Here!'
                 />
                 <select onChange={(e) => setSearchBy(e.target.value)}>
                    <option value=''>Search By</option>
                    <option value='productName'>Product Name</option>
                    <option value='color'>Color</option>
                    <option value='dimension'>Dimension</option>
                    <option value='countryOfOrigin'>Country</option>
                 </select>
            </div>
            <div className="sorting">
                <select onChange={(e) => setSortBy(e.target.value)}>
                    <option>Sort By</option>
                    <option value="productName">Product Name</option>
                    <option value="price">Price</option>
                    <option value="color">Color</option>
                    <option value="countryOfOrigin">Country</option>
                </select>
            </div>
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
                    {finalProductList && finalProductList.map((product) => (
                        <ProductDetails key={product._id} product={product} />
                    ))}
            </table>
        </div>
    );
}

export default ProductTable;