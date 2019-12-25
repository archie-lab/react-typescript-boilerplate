import React, {FC} from "react";
import {hot} from "react-hot-loader/root";
import "./App.scss";

const App: FC<AppProps> = ({message}: AppProps) => {
  return <h1 className="app">{message || "Hello, World!"}</h1>;
};

interface AppProps {
  message?: string;
}

export default hot<FC<AppProps>>(App);
