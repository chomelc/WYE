import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk"
import reducers from "./reducers";
import logger from 'redux-logger'

export const store: Store<any, any> & {
    dispatch: DispatchType
} = createStore(
    reducers,
    {},
    applyMiddleware(thunk, logger)
)