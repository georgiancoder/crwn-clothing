import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root-reducer";
import {logger} from "redux-logger/src";

const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
