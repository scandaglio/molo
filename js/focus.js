(function(){

  d3.selectAll('img').attr("class",'img-responsive img-incipit')

  var place = PLACE;

  var category = place.properties.category;

  mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';

  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/teo/ciu1f5enw00i52iol853ypazc',
      center: place.geometry.coordinates,
      zoom: 11,
      maxZoom:16,
      minZoom:10
  });

  map.on('load', function () {
      map.addSource("points", {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [place]
          }
      });

      map.addLayer({
          "id": "pointsBorder",
          "type": "circle",
          "source": "points",
          "paint": {
            "circle-radius": 8,
            "circle-color": "#000"
          }
      });

      map.addLayer({
          "id": "points",
          "type": "circle",
          "source": "points",
          "paint": {
            "circle-radius": 5,
            "circle-color": "#f00"
          }
      });

      map.setPaintProperty('water', 'fill-color', '#000');
      map.setPaintProperty('building', 'fill-color', '#000');
      map.setPaintProperty('landuse', 'fill-color', '#000');
      map.setPaintProperty('road', 'line-color', '#000');

  });
})();
