import React from 'react';
import { render } from "react-dom";
import { Map } from "./lib";

const App = () => (
  <div>
    <Map lat={52.4144} lng={16.96110} zoom={18}/>
  </div>
);

render(<App />, document.getElementById("root"));
