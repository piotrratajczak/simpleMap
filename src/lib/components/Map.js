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
      view: this.view
    });

    this.map.on('click', evt => {
      let {onClick} = this.props,
      coordinate = ol.proj.transform(evt.coordinate,'EPSG:3857', 'EPSG:4326');
      onClick? onClick(coordinate) : console.log(coordinate);
    });
  }

  componentWillReceiveProps(nextProps){
    const {lng, lat} = nextProps;
    this.map.getView().setCenter(ol.proj.fromLonLat([lng, lat]))
  }

  componentDidMount(){
    this.map.setTarget(this.mapContainer)
  }

  componentWillUnmount() {
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
