import {createLogger} from "redux-logger";
import createSagaMiddleware from "redux-saga";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit";
import CommonReducer from "./common/commonReducer";

const rootReducer = combineReducers({
  common: CommonReducer
});

// https://react-redux.js.org/using-react-redux/static-typing#defining-the-root-state-type
export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const logger = createLogger({
  duration: true
});

export const sagaMiddleware = createSagaMiddleware();

const developmentMode = process.env.NODE_ENV === "development";

const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

if (developmentMode) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: developmentMode
});
