const ProductDetails = ({ product }) => {
    const handleDelete = () => {

    }

    const handleEdit = () => {
        
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