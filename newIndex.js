const  Immer  = require('immer');
const redux = require('redux');
const createStore = redux.createStore;
const produce = Immer.produce


const STREET_UPDATE = 'STREET UPDATE';

const updateStreet = (street) => {
    return {
        type: STREET_UPDATE,
        payload: street
    }
}

const initialState = {
    name: 'Nishant Krishna Ghadigaonkar',
    address: {
        area: 'Navapada',
        street: 'Subhash Road',
        city: 'Dombivli'
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATE:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }

            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default: {
            return state
        }
    }
}

const store = createStore(reducer);
console.log('Initial State', store.getState());
const unSubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState())
})
store.dispatch(updateStreet('Cranberry Road'));
unSubscribe();