import * as React from "react";
import {shallow} from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import "./i18nMock";

// configure({adapter: new Adapter()});

jest.mock("react-redux", () => ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useDispatch: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useSelector: jest.fn().mockImplementation((selector) => ({qwe: "qwe"}))
}));

describe("App Component", () => {
  const spy = jest.spyOn(global.console, "error");
  it("should exist", () => {
    expect(spy).not.toHaveBeenCalled();
    expect(shallow(<App />)).toBeTruthy();
  });

  it("should match snapshot", () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
