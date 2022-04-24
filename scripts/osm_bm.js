var towns = L.layerGroup();

var map = L.map('map', {
	center: [51.166667, 71.433333],
	zoom: 10,
  minZoom: 3,
  maxZoom: 17,
	// layers: [changeBasemaps, towns]
});

var changeBasemaps = map.addControl(L.control.basemaps({
  basemaps: basemaps,
  tileX: 0,
  tileY: 0,
  tileZ: 1
}));

// var geoserver = L.tileLayer.wms("http://localhost:8080/geoserver/cite/wms", {
//   layers: 'cite:teest_geo',
//   format: 'image/png',
//   transparent: true,
//   attribution: "Lakes"
// }).addTo(map);

// var layerControl = L.control.layers(baseLayers, overlays).addTo(map);
// layerControl.addOverlay(geoserver, "geo");

// FEATURES ON MAP

var marker_test = L.marker([51.166667, 71.433333]).addTo(map).bindPopup('test');

// const marker = L.marker([51.5, -0.09]).addTo(map);
// const marker2 = L.marker([51.51, -0.09]);
// const marker3 = L.marker([51.52, -0.09]);
// const polygon = L.polygon([[51.51, -0.1],[51.5, -0.08],[51.53, -0.07],[51.50, -0.06]], {color: '#FF0000'}).addTo(map);
// const polygon2 = L.polygon([[51.51, -0.1],[51.5, -0.08],[51.53, -0.07],[51.50, -0.06]], {color: '#0122FF'}).addTo(map);

// const mylines = [{
//     "type": "LineString",
//     "coordinates": [[-0.1,51.51], [-0.07,51.53]]
// }, {
//     "type": "LineString",
//     "coordinates": [[-0.1,51.5], [-0.07,51.50]]
// }];
// const geojson = L.geoJSON(null).addTo(map);
// geojson.addData(mylines);

// const states = [{
//     "type": "Feature",
//     "properties": {"party": "Republican"},
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [-104.05, 48.99],
//             [-97.22,  48.98],
//             [-96.58,  45.94],
//             [-104.03, 45.94],
//             [-104.05, 48.99]
//         ]]
//     }
// }, {
//     "type": "Feature",
//     "properties": {"party": "Democrat"},
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [-109.05, 41.00],
//             [-102.06, 40.99],
//             [-102.03, 36.99],
//             [-109.04, 36.99],
//             [-109.05, 41.00]
//         ]]
//     }
// }, {
//     "type": "Feature",
//     "properties": {"party": "Democrat"},
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [-109.05, 41.00],
//             [-102.06, 40.99],
//             [-102.03, 36.99],
//             [-109.04, 36.99],
//             [-109.05, 41.00]
//         ]]
//     }
// }];

// const geojsonStates = L.geoJSON(states, {style: function(state) {
//     return (state.properties.party === 'Republican') 
//             ? {fillColor:'red', color:'red', opacity:1, legendLabel: state.properties.party} : {fillColor:'blue', color:'blue', opacity:1, legendLabel: state.properties.party}
// }}).addTo(map);

// const overlays = [
//   {name: 'Marker', layer: marker},
//   {name: 'Marker2', layer: marker2},
//   {name: 'polygon', layer: polygon},
//   {name: 'polygon2', layer: polygon2},
//   {name: 'geojson', layer: geojson},
//   {name: 'geojsonStates', layer: geojsonStates},
// ];

// const legend = L.multiControl(overlays, {position:'topright', label: 'Control panel'}).addTo(map);



// Coordinates 
var x = document.getElementById('xcoor')
var y = document.getElementById('ycoor')

function onMapClick(e) {
    y.innerHTML = e.latlng.lng.toFixed(5)
    x.innerHTML = e.latlng.lat.toFixed(5)
}
map.on('mousemove', onMapClick);

// console.log(cities.features[0].properties.Population)
// L.geoJSON(cities).addTo(map).bindPopup(`<b>${Object.getOwnPropertyNames(cities.features[0].properties)[0]}</b>` + ": " + cities.features[0].properties.City + '<br>' + Object.getOwnPropertyNames(cities.features[0].properties)[1] + ": " + cities.features[0].properties.Population);

var osmb = new OSMBuildings(map).load();

var myLayer = L.geoJSON().addTo(map);

//********************************************************

var
  now,
  date, time,
  timeRange, dateRange,
  timeRangeLabel, dateRangeLabel;

function changeDate() {
  var Y = now.getFullYear(),
    M = now.getMonth(),
    D = now.getDate(),
    h = now.getHours(),
    m = 0;

  timeRangeLabel.innerText = pad(h) + ':' + pad(m);
  dateRangeLabel.innerText = Y + '-' + pad(M+1) + '-' + pad(D);

  osmb.date(new Date(Y, M, D, h, m));
}

function onTimeChange() {
  now.setHours(this.value);
  now.setMinutes(0);
  changeDate();
}

function onDateChange() {
  now.setMonth(0);
  now.setDate(this.value);
  changeDate();
}

function pad(v) {
  return (v < 10 ? '0' : '') + v;
}

timeRange = document.getElementById('time');
dateRange = document.getElementById('date');
timeRangeLabel = document.querySelector('*[for=time]');
dateRangeLabel = document.querySelector('*[for=date]');

now = new Date;
changeDate();

// init with day of year
var Jan1 = new Date(now.getFullYear(), 0, 1);
dateRange.value = Math.ceil((now-Jan1)/86400000);

timeRange.value = now.getHours();

timeRange.addEventListener('change', onTimeChange);
dateRange.addEventListener('change', onDateChange );
timeRange.addEventListener('input', onTimeChange);
dateRange.addEventListener('input', onDateChange);

//************************************************************

// load extra information
function ajax(url, callback) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState !== 4) {
      return;
    }
    if (!req.status || req.status < 200 || req.status > 299) {
      return;
    }

    callback(JSON.parse(req.responseText));
  };
  req.open('GET', url);
  req.send(null);
}

// formatted json output
function formatJSON(json) {
  var html = '';
  for (var key in json) {
    html += '<em>'+ key +'</em> '+ json[key] +'<br>';
  }
  return html;
}

osmb.click(function(e) {
  var url = 'https://data.osmbuildings.org/0.2/uejws863/feature/'+ e.feature +'.json';
  ajax(url, function(json) {
    var content = '<b>OSM ID '+ e.feature +'</b>';
    for (var i = 0; i < json.features.length; i++) {
      content += '<br><em>OSM Part ID</em> '+ json.features[i].id;
      content += '<br>'+ formatJSON(json.features[i].properties.tags);
    }

    L.popup({ maxHeight:200, autoPanPaddingTopLeft:[50,50] })
      .setLatLng(L.latLng(e.lat, e.lon))
      .setContent(content)
      .openOn(map);
  });
});
