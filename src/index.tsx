import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "./App";
import {store, sagaMiddleware} from "./store";
import rootSaga from "./sagas";
import "./i18n";

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
