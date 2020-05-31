import React, {FC, Suspense} from "react";
import {hot} from "react-hot-loader/root";
import "./App.scss";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useTypedSelector} from "./store";

const App: FC<Props> = () => {
  const message = useTypedSelector((state) => state.common.message);
  const {t} = useTranslation();
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Error</p>}>
        <Switch>
          <Route
            exact
            pat="/"
            component={(): JSX.Element => <h1 className="app">{`${t("title")}: ${message}` || "Hello, World!"}</h1>}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

interface Props {
  message?: string;
}

export default hot<FC<Props>>(App);
