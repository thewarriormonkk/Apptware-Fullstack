import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from '../hooks/useProductsContext';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [dimension, setDimension] = useState('');
    const [countryOfOrigin, setCountryOfOrigin] = useState('');

    const { dispatch } = useProductsContext();

    const navigate = useNavigate();


    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { productName, price, color, dimension, countryOfOrigin };
        const headers = {'Content-Type': 'application/json'};
        const response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (response.ok) {
            setProductName('');
            setPrice('');
            setColor('');
            setDimension('');
            setCountryOfOrigin('');
            
            dispatch({ type: 'CREATE_PRODUCT', payload: data })
            navigate('/catalog');

        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h2>Add a New Product</h2>

            <label>Product Name: </label>
            <input 
                type="text"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
            />
            <label>Price: </label>
            <input 
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            <label>Dimension: </label>
            <input 
                type="text"
                onChange={(e) => setDimension(e.target.value)}
                value={dimension}
            />

            <label>Color: </label>
            <input 
                type="text"
                onChange={(e) => setColor(e.target.value)}
                value={color}
            />

            <label>Country: </label>
            <input 
                type="text"
                onChange={(e) => setCountryOfOrigin(e.target.value)}
                value={countryOfOrigin}
            />
            <button>Add Product</button>
        </form>
    );
}

export default AddProduct;