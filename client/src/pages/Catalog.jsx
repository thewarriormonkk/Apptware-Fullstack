import { useNavigate } from 'react-router-dom';
import ProductTable from "../components/ProductTable";

const Catalog = () => {
    const navigate = useNavigate();

    function addProduct() {
        console.log('clicked');
        navigate('/create');
    }

    return (
        <div className="catalog">
            <h2>Catalog</h2>
            <button onClick={addProduct}>Create</button>
            <ProductTable />
        </div>
    );
}

export default Catalog;