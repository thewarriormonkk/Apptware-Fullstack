import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

export const productsReducer = (state, action ) => {
    switch(action.type) {
        case 'SET_PRODUCTS':
            return {
                products: action.payload
            }
        case 'CREATE_PRODUCT':
            return {
                products: [action.payload, ...state.products]
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, {
        products: null
    });

    return (
        <WorkoutsContext.Provider value={{...state, dispatch }}>
            { children }
        </WorkoutsContext.Provider>
    );
}