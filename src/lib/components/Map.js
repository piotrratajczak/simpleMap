import './Map.css'
import React, { Component} from 'react'
import  PropTypes  from 'prop-types'
import ol from 'openlayers'

class Map extends Component {

  constructor(props) {
    super(props);

    const { lat, lng, zoom } = props;

    this.view = new ol.View({
      center: ol.proj.fromLonLat([lng, lat]),
      zoom,
    });

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          name: 'default',
          source: new ol.source.OSM(),
        }),
      ],
      view: this.view,
      controls: []
    });

    this.map.on('click', evt => {
      let {onClick} = this.props,
      coordinate = ol.proj.transform(evt.coordinate,'EPSG:3857', 'EPSG:4326');
      onClick? onClick(coordinate) : console.log(coordinate);
    });
  }

  componentWillMount(){
    // for testing as package imported to angular6 app - remove this console.log
    // in next version
    console.log('will mount')
  }

  componentWillReceiveProps(nextProps){
    // for testing as package imported to angular6 app - remove this console.log
    // in next version
    console.log('receive props')
    const {lng, lat} = nextProps;
    this.map.getView().setCenter(ol.proj.fromLonLat([lng, lat]))
  }

  componentDidMount(){
    // for testing as package imported to angular6 app - remove this console.log
    // in next version
    console.log('did mount')
    this.map.setTarget(this.mapContainer)
  }

  componentWillUnmount() {
    // for testing as package imported to angular6 app - remove this console.log
    // in next version
    console.log('will unmount')
    this.map.setTarget(null)
  }

  render() {
    return (
      <div className="map">
        <div className="target" ref={(ref) => { this.mapContainer = ref }}/>
      </div>
    )
  }
}

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoom: PropTypes.number,
  onClick: PropTypes.func,
}

Map.defaultProps = {
  lat: 0,
  lng: 0,
  zoom: 1,
}

export default Map
