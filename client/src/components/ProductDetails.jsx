import { useProductsContext } from "../hooks/useProductsContext";
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({ product }) => {
    const navigate = useNavigate();

    const { dispatch } = useProductsContext();

    const API_URL = import.meta.env.VITE_API_URL;
    const productID = product._id;


    const handleDelete = async () => {
        const response = await fetch(`${API_URL}/${productID}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch({ type: 'DELETE_PRODUCT', payload: productID });
        }
    }

    const handleEdit = () => {
        navigate(`/edit/${productID}`);
        
    }
    
    return (
            <tbody>
                <tr >
                    <td>{product.productName}</td>
                    <td>{product.color}</td>
                    <td>{product.dimension}</td>
                    <td>{product.price}</td>
                    <td>{product.countryOfOrigin}</td>
                    <td>
                        <button onClick={handleDelete}>X</button>
                        <button onClick={handleEdit}>Edit</button>
                    </td>
                </tr>
            </tbody>
    );
}

export default ProductDetails;