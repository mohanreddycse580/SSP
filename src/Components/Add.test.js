import Add from "./Add";
import { shallow } from "enzyme";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<Add />);
});
