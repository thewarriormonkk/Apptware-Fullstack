import { useProductsContext } from "../hooks/useProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';

const EditProduct = () => {

    const { productID } = useParams();
    const navigate = useNavigate();

    const { products, dispatch } = useProductsContext();

    let product = products.filter(product => product._id === productID)
    product = product[0];

    // console.log(product);

    const [ productToUpdate, setProductToUpdate ] = useState(product);


    const emptyFields = [];


    const API_URL = import.meta.env.VITE_API_URL;
    async function handleUpdate(e) {
        e.preventDefault();
        const response = await fetch(`${API_URL}/${productID}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productToUpdate)
        });
        const data = await response.json();
        if (response.ok) {
            console.log('updated successfully');
            dispatch({ type: 'UPDATE_PRODUCT', payload: data });
            navigate('/catalog');
        }
    }
    

    
    return (
        <form className="edit" onSubmit={handleUpdate}>
            <h2>Update Product Details</h2>

            <label>Product Name: </label>
            <input 
                type="text"
                onChange={(e) => setProductToUpdate({ ...productToUpdate, productName: e.target.value })}
                value={productToUpdate.productName}
                className={emptyFields.includes('productName') ? 'error' : '' }
            />
            <label>Price: </label>
            <input 
                type="text"
                onChange={(e) => setProductToUpdate({ ...productToUpdate, price: e.target.value })}
                value={productToUpdate.price}
                className={emptyFields.includes('price') ? 'error' : '' }
            />
            <label>Dimension: </label>
            <input 
                type="text"
                onChange={(e) => setProductToUpdate({ ...productToUpdate, dimension: e.target.value })}
                value={productToUpdate.dimension}
                className={emptyFields.includes('dimension') ? 'error' : '' }
            />

            <label>Color: </label>
            <input 
                type="text"
                onChange={(e) => setProductToUpdate({ ...productToUpdate, color: e.target.value })}
                value={productToUpdate.color}
                className={emptyFields.includes('color') ? 'error' : '' }
            />

            <label>Country: </label>
            <input 
                type="text"
                onChange={(e) => setProductToUpdate({ ...productToUpdate, countryOfOrigin: e.target.value })}
                value={productToUpdate.countryOfOrigin}
                className={emptyFields.includes('countryOfOrigin') ? 'error' : '' }
            />
            <button> Update </button>
        </form>
    );
}

export default EditProduct;