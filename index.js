const redux = require('redux');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDErrRED';
const CAKE_RESTOCKED = 'Cake Restocked';
const ICECREAM_ORDERS = 'icecream ordered';
const ICECREAM_RESTOCKED = 'icecream restocked';



//Action creator function that returns an object
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIcecream() {
    return {
        type: ICECREAM_ORDERS,
        payload: 1
    }
}

function icecreamRestocked(qty) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const initialCakeState = {
    numOfCakes: 10,
}

const initialIcecreamState = {
    numOfIcecreams: 20
}

//Reducer function which takes state and action as arguements
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state, //to create a copy first and then update use spread operator
                numOfCakes: state.numOfCakes - 1
            }

        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

const icecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERS:
            return {
                ...state, //to create a copy first and then update use spread operator
                numOfIcecreams: state.numOfIcecreams - 1
            }

        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams + action.payload
            }

        case CAKE_ORDERED:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams - 1
            }
        default:
            return state
    }
}

const rootReducer = combineReducers(
    {
        cake: cakeReducer,
        icecream: icecreamReducer
    }
)

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial State', store.getState());

//anytime the store updates we log it to the console.
// const unsubscribe = store.subscribe(() => {console.log('Updated State', store.getState())});
const unsubscribe = store.subscribe(() => { });

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))

store.dispatch(orderIcecream())
store.dispatch(orderIcecream())
store.dispatch(orderIcecream())
store.dispatch(orderIcecream())
store.dispatch(orderIcecream())
store.dispatch(icecreamRestocked(4))

unsubscribe()


