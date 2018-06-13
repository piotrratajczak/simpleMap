import React, {Component} from 'react';
import { render } from "react-dom";
import { Map } from "./lib";


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      data:[
        {lat:40.6971, lng:-73.9796, name: 'New York', country: 'US'},
        {lat:52.4144 , lng:16.96110, name: 'Merix', country: 'PL'},
        {lat:53.6719, lng: 23.8229, name: 'Grodno', country: 'BE'}
      ],
      active: 0,
    }

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  next(){
    let {active, data} = this.state,
    newVal = active < data.length - 1 ? active +1 : 0;
    this.setState({active: newVal})
  }

  prev(){
    let {active, data} = this.state,
    newVal = active > 0 ? active - 1 : data.length - 1;
    this.setState({active: newVal})
  }

  handleMapClick(coordinate){
    console.log('Map clicked!!!!',coordinate);
  }

  render() {
    const {data, active} = this.state;
    return (
      <div>
        <Map {...data[active]} zoom={18} onClick={this.handleMapClick}/>
        <div style={{display:'flex'}}>
          <button onClick={this.prev} style={{margin:'auto'}}> Prev </button>
          <button onClick={this.next} style={{margin: 'auto'}}> Next </button>
        </div>
      </div>
    );
  }

}


render(<App />, document.getElementById("root"));
