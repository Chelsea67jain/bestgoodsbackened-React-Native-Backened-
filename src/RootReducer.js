const initialState = {
    products: {},
    customers: {}

}

export default function RootReducer(state = initialState, action) {

    switch (action.type) {
        case 'ADD_PRODUCT':
            state.products[[action.payload[0]]] = action.payload[1]

            return ({ products: state.products })
        case 'EDIT_PRODUCT':
            state.products[[action.payload[0]]] = action.payload[1]

            return ({ products: state.products })
        case 'DELETE_PRODUCT':
            delete state.products[[action.payload[0]]]

            return ({ products: state.products })

        case 'ADD_CUSTOMER':
            state.customers[[action.payload[0]]] = action.payload[1]

            return ({ customers: state.customers })
            case 'EDIT_CUSTOMER':
                state.customers[[action.payload[0]]] = action.payload[1]
    
                return ({customers: state.customers  })
            case 'DELETE_CUSTOMER':
                delete state.customers[[action.payload[0]]]
    
                return ({customers: state.customers})

        default:
            return ({ customers: state.customers })
    }

}