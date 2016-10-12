(function(){

  d3.json('/molo/media/places.json', function(data){

    var panoid = getUrlParameter('panoid'),
        heading = 0,
        pitch = 20;

    var place = data.features.filter(function(d){
      return d.properties.panoId == panoid;
    })[0];

    var category = place.properties.category;

    var url = LUOGHI_DICT[category].url,
        breadcrumb = LUOGHI_DICT[category].title;

    d3.select('.navbar-header')
      .append('a')
      .attr("class", "navbar-brand")
      .attr("href", BASE_URL + '/places/' + url)
      .text(breadcrumb)

    var catFilter = data.features.filter(function(d){
      return d.properties.category == category;
    });

    var placeIndex = catFilter.map(function(d){return d.properties.panoId})
    placeIndex = placeIndex.indexOf(panoid);

    var catFilterLength = catFilter.length-1;

    var next,
        prev;

    if(placeIndex+1 <= catFilterLength){
      next = catFilter[placeIndex+1].properties.panoId;
      d3.select('.arrows.next').append('a')
        .attr('href', '/molo/places/timemachine?panoid=' + next)
        .html('<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>')
    }

    if(placeIndex-1 >= 0){
      prev = catFilter[placeIndex-1].properties.panoId;
      d3.select('.arrows.prev').append('a')
        .attr('href', '/molo/places/timemachine?panoid=' + prev)
        .html('<span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>')
    }

    var info = d3.select('.panoInfo')

    info.append('p').attr('class','panoName').text(place.properties.condition_desc)
    info.append('p').text(place.properties.address)

    mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/teo/ciu1f5enw00i52iol853ypazc',
        center: place.geometry.coordinates,
        zoom: 14,
        interactive: false
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
              "circle-color": "#ffffff"
            }
        });

    });


    var selection = d3.select('.panoTimeline');

    var height = 70,
        width = selection.node().getBoundingClientRect().width - 30;

    var margin = {top: 20, right: 30, bottom: 20, left: 30},
      chartWidth = width - margin.left - margin.right,
      chartHeight = height - margin.top - margin.bottom;

    chart = selection.append('svg')
      .attr('width', width)
      .attr('height', height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var timelineData = place.properties.timemachine;


    var parseTime = d3.timeParse("%b %Y");
    var formatTime = d3.timeFormat("%m/%Y")

    var selDate = parseTime(timelineData[timelineData.length-1].date);

    timelineData.forEach(function(d){
      d.dateString = d.date;
      d.date = parseTime(d.date);
    })

    timelineData.sort(function(a,b){
      return d3.ascending(a.date, b.date)
    })

    var xMin = d3.min(timelineData, function(d) {return d.date}),
        xMax = d3.max(timelineData, function(d) {return d.date});

    var x = d3.scaleTime()
        .domain([xMin,xMax])
        .range([0, chartWidth]);

    var radius = 6,
        linewidth = 2;

    var points = chart.selectAll(".point")
      .data(timelineData)
      .enter().append("circle")
      .attr("class","point")
      .attr("cx", function(d){return x(d.date)})
      .attr("r", radius)
      .attr("fill-opacity", function(d){
        if(selDate.getTime() == d.date.getTime()){
          return 1
        }else {
          return 0
        }
      })
      .attr('stroke', '#fff')
      .attr('fill', 'white')
      .style('cursor', 'pointer')
      .on('click', function(d,i){
        panorama.setPano(d.panoid)
        selDate = d.date;
        count = i;
        points.attr("fill-opacity", function(e){
          if(selDate.getTime() == e.date.getTime()){
            return 1
          }else {
            return 0
          }
        })
      })

      chart.append("g")
        .attr("transform", "translate(0," + (chartHeight-5) + ")")
        .selectAll(".date")
        .data(timelineData)
        .enter().append("text")
        .attr("class","date")
        .attr("x", function(d){return x(d.date)})
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-family", "'Space Mono', monospace")
        .attr("font-size", 13)
        .each(function(d){
          d3.select(this).append('tspan').text(d.dateString.split(' ')[0]).attr("x", function(d){return x(d.date)})
          d3.select(this).append('tspan').text(d.dateString.split(' ')[1]).attr("dy","1.2em").attr("x", function(d){return x(d.date)})
        })

    var lineData = [];

    timelineData.forEach(function(d,i){
      if(timelineData[i+1]){
        var elm = [
          {x: d.date, y:0},
          {x: timelineData[i+1].date,y:0}
        ]
        lineData.push(elm)
      }
    })

   var lineFunction = d3.line()
                    .x(function(d,i) {
                      if(i==0){
                        return x(d.x)+(radius+linewidth/2);
                      }else{
                        return x(d.x)-(radius+linewidth/2);

                      }
                    })
                    .y(function(d) { return d.y; });

   chart.append('g')
     .selectAll('.timeLine')
     .data(lineData)
     .enter().append("path")
     .attr("class", "timeLine")
     .attr("d", function(d){
       return lineFunction(d);
     })
     .attr("stroke-width", linewidth)
     .attr("stroke", "white")
     .attr("fill", "none")

    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
          pano: panoid,
           pov: {
              heading: heading,
              pitch: pitch
           },
          motionTracking: false,
          motionTrackingControl: false,
          linksControl: false,
          panControl: false,
          zoomControl: false,
          addressControl: false,
          fullscreenControl:false,
          enableCloseButton: false,
          disableDefaultUI: true,
          showRoadLabels: false,
          clickToGo:false,
          scrollwheel: false
        });

    var count = timelineData.length-1,
        totPano = timelineData.length;

    var autoRotate = function(){

      var pov = panorama.getPov();

      heading = pov.heading + 0.1;
      heading = heading>=360?0:heading;
      if(heading == 0 ){
        count++;
        if(count>=totPano){
          count = 0;
          panorama.setPano(timelineData[count].panoid)
          selDate = timelineData[count].date;
          points.attr("fill-opacity", function(d){
            if(selDate.getTime() == d.date.getTime()){
              return 1
            }else {
              return 0
            }
          })
        }else{
          panorama.setPano(timelineData[count].panoid)
          selDate = timelineData[count].date;
          points.attr("fill-opacity", function(d){
            if(selDate.getTime() == d.date.getTime()){
              return 1
            }else {
              return 0
            }
          })
        }

      }

      if(pov.pitch){
        pitch = pov.pitch;
      }else{
        pitch = 20;
      }
      panorama.setPov({
        heading: heading,
        pitch: pitch
      })

    }

    var rotateMapAnim = setInterval(autoRotate, 10);
    var stopRotation = function(){
      clearInterval(rotateMapAnim);
    }

    if(!place.properties.focus){
      d3.select('.controls .btnContFocus').style('display','none')
    }

    d3.select('.controls .play')
      .on('click', function(d){
        var btn = $(this).find('span').hasClass('glyphicon-play');
        if(btn){
          rotateMapAnim = setInterval(autoRotate, 10);
          $(this).find('span').removeClass('glyphicon-play')
          $(this).find('span').addClass('glyphicon-pause')
        }else{
          stopRotation()
          $(this).find('span').addClass('glyphicon-play')
          $(this).find('span').removeClass('glyphicon-pause')
        }

      })

  })

  function getUrlParameter(param){
    var pattern = new RegExp('[?&]'+param+'((=([^&]*))|(?=(&|$)))','i');
    var m = window.location.search.match(pattern);
    return m && ( typeof(m[3])==='undefined' ? '' : m[3] );
  }
})();
