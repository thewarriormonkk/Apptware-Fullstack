const ProductDetails = ({ product }) => {
    return (
        <div className="details">
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
                    <tbody>
                        <tr>
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
                </table>
        </div>
    );
}

export default ProductDetails;