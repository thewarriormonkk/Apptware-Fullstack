const ProductDetails = ({ product }) => {
    return (
            <tbody>
                <tr >
                    <td>{product.productName}</td>
                    <td>{product.color}</td>
                    <td>{product.dimension}</td>
                    <td>{product.price}</td>
                    <td>{product.countryOfOrigin}</td>
                    <td>
                        <button>X</button>
                        <button>Edit</button>
                    </td>
                </tr>
            </tbody>
    );
}

export default ProductDetails;