(function(){
  var category = CATEGORY,
      places = PLACES;

    var $affixElement = $('div[data-spy="affix"]');
    $affixElement.width($affixElement.parent().width());

  places.features = places.features.filter(function(d){
    return d.properties.category == category;
  });

  var bbox = turf.bbox(places);

  var centerPt = turf.center(places);

  mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';

  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/teo/ciu1f5enw00i52iol853ypazc',
      center: centerPt.geometry.coordinates,
      zoom: 14,
      maxZoom:16,
      minZoom:10
  });

  map.fitBounds([[
      bbox[0],
      bbox[1]
  ], [
      bbox[2],
      bbox[3]
  ]],{padding:100});

  map.on('load', function () {
      map.addSource("points", {
          "type": "geojson",
          "data": places
      });

      map.addLayer({
          "id": "pointsBorder",
          "type": "circle",
          "source": "points",
          "paint": {
            "circle-radius": 5,
            "circle-color": "#000"
          }
      });

      map.addLayer({
          "id": "points",
          "type": "circle",
          "source": "points",
          "paint": {
            "circle-radius": 3,
            "circle-color": "#ffffff"
          }
      });

      map.addLayer({
          "id": "label",
          "type": "symbol",
          "source": "points",
          "layout": {
              // "icon-image": "square-15",
              "text-field": "{condition_desc}",
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.3],
              "text-size": 14,
              "text-anchor": "top"
          },
          "paint":{
            "text-color": "#fff",
            "text-halo-color": "#000000",
            "text-halo-width": 2
          }
      });

  });

  $(window).resize(function () {
    var $affixElement = $('div[data-spy="affix"]');
    $affixElement.width($affixElement.parent().width());
  });
})()
