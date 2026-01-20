import { useContext } from 'react';
import { WorkoutsContext } from '../context/ProductsContext';

export const useProductsContext = () => {
    const context = useContext(WorkoutsContext);

    if (!context) {
        throw Error('useProductsContext must be used inside an ProductsContextProvider');
    }

    return context;
}