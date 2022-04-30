let map = L.map('map', {
	center: [51.166667, 71.433333],
	zoom: 10,
  minZoom: 3,
  maxZoom: 17,
	// layers: [changeBasemaps, towns]
});

let hash = new L.Hash(map);
let scaele = L.control.scale().addTo(map);
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

let changeBasemaps = map.addControl(L.control.basemaps({
  basemaps: basemaps,
  tileX: 0,
  tileY: 0,
  tileZ: 1
}));

// OSM GEOCODER, search places & SEARCH FOR LAYERS
var geocoder = L.Control.geocoder({
  position: 'topleft'
}).addTo(map);

// let searchLayer = L.layerGroup().addTo(map)


// var geoserver = L.tileLayer.wms("http://localhost:8080/geoserver/cite/wms", {
//   layers: 'cite:teest_geo',
//   format: 'image/png',
//   transparent: true,
//   attribution: "Lakes"
// }).addTo(map);

// var layerControl = L.control.layers(baseLayers, overlays).addTo(map);
// layerControl.addOverlay(geoserver, "geo");

// FEATURES ON MAP
// var myLayer = L.geoJSON(img1).addTo(map);

// let rndmPoints = {
// "type": "FeatureCollection",
// "name": "rndm",
// "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
// "features": [
// { "type": "Feature", "properties": { "title": 1 }, "geometry": { "type": "Point", "coordinates": [ 58.950784263533372, 51.371370795084758 ] } },
// { "type": "Feature", "properties": { "title": -12 }, "geometry": { "type": "Point", "coordinates": [ 71.254925399166638, 49.963426855288837 ] } },
// { "type": "Feature", "properties": { "title": 123 }, "geometry": { "type": "Point", "coordinates": [ 57.583657470685239, 46.434269783536195 ] } }
// ]
// }

// let markersLayer = new L.LayerGroup();

// let sL = L.geoJSON(rndmPoints).addTo(map);

// LAKES 
var lakeStyle = {
  "color": "#cce0fe",
  "weight": 2,
  "opacity": 1
};
let allLakes = L.geoJSON(lakes, {style: lakeStyle}).addTo(map);


// map.addControl( new L.Control.Search({
//   layer: layer_kaz_admbnda_adm2_2019_1,
//   position: 'topright',
//   zoom: 10,
//   propertyName: 'ADM2_RU',
//   animate: true
// }) );

map.addControl(new L.Control.Search({
  layer: allReg,
  position: 'topright',
  initial: false,
  hideMarkerOnCollapse: true,
  propertyName: 'ADM2_RU'}));
document.getElementsByClassName('search-button')[0].className +=
' fa fa-binoculars';

// L.marker([51.930454,4.527054], {icon: L.AwesomeMarkers.icon({icon: 'glass', prefix: 'fa', markerColor: 'green'}) }).addTo(map);
// L.marker([51.941196,4.512291], {icon: L.AwesomeMarkers.icon({icon: 'spinner', prefix: 'fa', markerColor: 'red', spin:true}) }).addTo(map);
// L.marker([51.927913,4.521303], {icon: L.AwesomeMarkers.icon({icon: 'coffee', prefix: 'fa', markerColor: 'red', iconColor: '#f28f82'}) }).addTo(map);
// L.marker([51.936063,4.502077], {icon: L.AwesomeMarkers.icon({icon: 'cog', prefix: 'fa', markerColor: 'purple', iconColor: 'black'}) }).addTo(map);
// L.marker([51.932835,4.506969], {icon: L.AwesomeMarkers.icon({icon: 'glass', prefix: 'fa', markerColor: 'green'}) }).addTo(map);
// L.marker([51.930295,4.515209], {icon: L.AwesomeMarkers.icon({icon: 'shopping-cart', prefix: 'fa', markerColor: 'blue'}) }).addTo(map);
// L.marker([51.930083,4.507742], {icon: L.AwesomeMarkers.icon({icon: 'info', prefix: 'fa', markerColor: 'orange'}) }).addTo(map);
// L.marker([51.930454,4.527054], {icon: L.AwesomeMarkers.icon({icon: 'group', prefix: 'fa', markerColor: 'darkred'}) }).addTo(map);
// L.marker([51.929607,4.527054], {icon: L.AwesomeMarkers.icon({icon: 'arrow-right', prefix: 'fa', markerColor: 'darkblue'}) }).addTo(map);
// L.marker([51.928919,4.528856], {icon: L.AwesomeMarkers.icon({icon: 'twitter', prefix: 'fa', markerColor: 'cadetblue'}) }).addTo(map);
// L.marker([51.930295,4.530745], {icon: L.AwesomeMarkers.icon({icon: 'phone', prefix: 'fa', markerColor: 'darkpurple'}) }).addTo(map);
// L.marker([51.925055,4.512806], {icon: L.AwesomeMarkers.icon({icon: 'ambulance', prefix: 'fa', markerColor: 'darkgreen'}) }).addTo(map);
// L.marker([51.925902,4.505768], {icon: L.AwesomeMarkers.icon({icon: 'medkit', prefix: 'fa', markerColor: 'darkblue'}) }).addTo(map);
// L.geoJSON(json_kaz_admbnda_adm2_2019_1).addTo(map);
// L.geoJSON(json_kaz_admbnda_adm1_2019_2).addTo(map);

// AKMOLA BOUNDARIES 
var bounds_group = new L.featureGroup([])
function setBounds() {
}
function pop_kaz_admbnda_adm2_2019_1(feature, layer) {
  var popupContent = '<table>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM0_EN'] !== null ? autolinker.link(feature.properties['ADM0_EN'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM0_KK'] !== null ? autolinker.link(feature.properties['ADM0_KK'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM0_RU'] !== null ? autolinker.link(feature.properties['ADM0_RU'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM0_PCODE'] !== null ? autolinker.link(feature.properties['ADM0_PCODE'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM1_EN'] !== null ? autolinker.link(feature.properties['ADM1_EN'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM1_KK'] !== null ? autolinker.link(feature.properties['ADM1_KK'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM1_RU'] !== null ? autolinker.link(feature.properties['ADM1_RU'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM1_PCODE'] !== null ? autolinker.link(feature.properties['ADM1_PCODE'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM2_EN'] !== null ? autolinker.link(feature.properties['ADM2_EN'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM2_KK'] !== null ? autolinker.link(feature.properties['ADM2_KK'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM2_RU'] !== null ? autolinker.link(feature.properties['ADM2_RU'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM2_PCODE'] !== null ? autolinker.link(feature.properties['ADM2_PCODE'].toLocaleString()) : '') + '</td>\
          </tr>\
      </table>';
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_kaz_admbnda_adm2_2019_1_0() {
  return {
      pane: 'pane_kaz_admbnda_adm2_2019_1',
      opacity: 1,
      color: 'rgba(233,35,100,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 2.0, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(243,166,178,0.0)',
      interactive: true,
  }
}
map.createPane('pane_kaz_admbnda_adm2_2019_1');
map.getPane('pane_kaz_admbnda_adm2_2019_1').style.zIndex = 401;
map.getPane('pane_kaz_admbnda_adm2_2019_1').style['mix-blend-mode'] = 'normal';
var allReg = new L.geoJson(json_kaz_admbnda_adm2_2019_1, {
  attribution: '',
  interactive: true,
  dataVar: 'json_kaz_admbnda_adm2_2019_1',
  layerName: 'allReg',
  pane: 'pane_kaz_admbnda_adm2_2019_1',
  onEachFeature: pop_kaz_admbnda_adm2_2019_1,
  style: style_kaz_admbnda_adm2_2019_1_0,
});
bounds_group.addLayer(allReg);
map.addLayer(allReg);

function pop_kaz_admbnda_adm1_2019_2(feature, layer) {
  var popupContent = '<table>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM0_EN'] !== null ? autolinker.link(feature.properties['ADM0_EN'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM0_KK'] !== null ? autolinker.link(feature.properties['ADM0_KK'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM0_RU'] !== null ? autolinker.link(feature.properties['ADM0_RU'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM0_PCODE'] !== null ? autolinker.link(feature.properties['ADM0_PCODE'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM1_EN'] !== null ? autolinker.link(feature.properties['ADM1_EN'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM1_KK'] !== null ? autolinker.link(feature.properties['ADM1_KK'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM1_RU'] !== null ? autolinker.link(feature.properties['ADM1_RU'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2">' + (feature.properties['ADM1_PCODE'] !== null ? autolinker.link(feature.properties['ADM1_PCODE'].toLocaleString()) : '') + '</td>\
          </tr>\
      </table>';
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_kaz_admbnda_adm1_2019_2_0() {
  return {
      pane: 'pane_kaz_admbnda_adm1_2019_2',
      opacity: 1,
      color: 'rgba(35,255,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 2.0, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(200,202,200,0.0)',
      interactive: true,
  }
}
map.createPane('pane_kaz_admbnda_adm1_2019_2');
map.getPane('pane_kaz_admbnda_adm1_2019_2').style.zIndex = 402;
map.getPane('pane_kaz_admbnda_adm1_2019_2').style['mix-blend-mode'] = 'normal';
var allObl = new L.geoJson(json_kaz_admbnda_adm1_2019_2, {
  attribution: '',
  interactive: true,
  dataVar: 'json_kaz_admbnda_adm1_2019_2',
  layerName: 'allObl',
  pane: 'pane_kaz_admbnda_adm1_2019_2',
  onEachFeature: pop_kaz_admbnda_adm1_2019_2,
  style: style_kaz_admbnda_adm1_2019_2_0,
});
bounds_group.addLayer(allObl);
map.addLayer(allObl);
setBounds();
// map.addControl(new L.Control.Search({
//   layer: layer_kaz_admbnda_adm2_2019_1,
//   initial: false,
//   hideMarkerOnCollapse: true,
//   propertyName: 'ADM2_RU'}));
// document.getElementsByClassName('search-button')[0].className +=
// ' fa fa-binoculars';




// var marker_test = L.marker([51.166667, 71.433333], {icon: L.AwseomeMarkers.icon({icon:'glass', prefix: 'fa', markerColor: 'green'})}).addTo(map).bindPopup('test');
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



// ECO MAP 
function pop_3_2(feature, layer) {
  var popupContent = '<table>\
          <tr>\
              <td colspan="2"><strong>Организация</strong><br />' + (feature.properties['Организация'] !== null ? autolinker.link(feature.properties['Организация'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2"><strong>Категория</strong><br />' + (feature.properties['Категория'] !== null ? autolinker.link(feature.properties['Категория'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2"><strong>Адрес</strong><br />' + (feature.properties['Адрес'] !== null ? autolinker.link(feature.properties['Адрес'].toLocaleString()) : '') + '</td>\
          </tr>\
      </table>';
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_3_2_0() {
  return {
      pane: 'pane_3_2',
rotationAngle: 0.0,
rotationOrigin: 'center center',
icon: L.icon({
  iconUrl: 'markers/ecology-flask-svgrepo-com.svg',
  iconSize: [19.0, 19.0]
}),
      interactive: true,
  }
}
map.createPane('pane_3_2');
map.getPane('pane_3_2').style.zIndex = 402;
map.getPane('pane_3_2').style['mix-blend-mode'] = 'normal';
var layer_3_2 = new L.geoJson(json_3_2, {
  attribution: '',
  interactive: true,
  dataVar: 'json_3_2',
  layerName: 'layer_3_2',
  pane: 'pane_3_2',
  onEachFeature: pop_3_2,
  pointToLayer: function (feature, latlng) {
      var context = {
          feature: feature,
          variables: {}
      };
      return L.marker(latlng, style_3_2_0(feature));
  },
});
var cluster_3_2 = new L.MarkerClusterGroup({showCoverageOnHover: false,
  spiderfyDistanceMultiplier: 2});
cluster_3_2.addLayer(layer_3_2);

bounds_group.addLayer(layer_3_2);
// cluster_3_2.addTo(map);
function pop_2_3(feature, layer) {
  var popupContent = '<table>\
          <tr>\
              <td colspan="2"><strong>Организация</strong><br />' + (feature.properties['Организация'] !== null ? autolinker.link(feature.properties['Организация'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2"><strong>Категория</strong><br />' + (feature.properties['Категория'] !== null ? autolinker.link(feature.properties['Категория'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2"><strong>Информация</strong><br />' + (feature.properties['Информация'] !== null ? autolinker.link(feature.properties['Информация'].toLocaleString()) : '') + '</td>\
          </tr>\
      </table>';
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_2_3_0() {
  return {
      pane: 'pane_2_3',
rotationAngle: 0.0,
rotationOrigin: 'center center',
icon: L.icon({
  iconUrl: 'markers/ecology-svgrepo-com.svg',
  iconSize: [19.0, 19.0]
}),
      interactive: true,
  }
}
map.createPane('pane_2_3');
map.getPane('pane_2_3').style.zIndex = 403;
map.getPane('pane_2_3').style['mix-blend-mode'] = 'normal';
var layer_2_3 = new L.geoJson(json_2_3, {
  attribution: '',
  interactive: true,
  dataVar: 'json_2_3',
  layerName: 'layer_2_3',
  pane: 'pane_2_3',
  onEachFeature: pop_2_3,
  pointToLayer: function (feature, latlng) {
      var context = {
          feature: feature,
          variables: {}
      };
      return L.marker(latlng, style_2_3_0(feature));
  },
});
var cluster_2_3 = new L.MarkerClusterGroup({showCoverageOnHover: false,
  spiderfyDistanceMultiplier: 2});
cluster_2_3.addLayer(layer_2_3);

bounds_group.addLayer(layer_2_3);
// cluster_2_3.addTo(map);
function pop_1_4(feature, layer) {
  var popupContent = '<table>\
          <tr>\
              <td colspan="2"><strong>Организация</strong><br />' + (feature.properties['Организация'] !== null ? autolinker.link(feature.properties['Организация'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2"><strong>Категория</strong><br />' + (feature.properties['Категория'] !== null ? autolinker.link(feature.properties['Категория'].toLocaleString()) : '') + '</td>\
          </tr>\
      </table>';
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_1_4_0() {
  return {
      pane: 'pane_1_4',
rotationAngle: 0.0,
rotationOrigin: 'center center',
icon: L.icon({
  iconUrl: 'markers/ecology-svgrepo-com (1).svg',
  iconSize: [19.0, 19.0]
}),
      interactive: true,
  }
}
map.createPane('pane_1_4');
map.getPane('pane_1_4').style.zIndex = 404;
map.getPane('pane_1_4').style['mix-blend-mode'] = 'normal';
var layer_1_4 = new L.geoJson(json_1_4, {
  attribution: '',
  interactive: true,
  dataVar: 'json_1_4',
  layerName: 'layer_1_4',
  pane: 'pane_1_4',
  onEachFeature: pop_1_4,
  pointToLayer: function (feature, latlng) {
      var context = {
          feature: feature,
          variables: {}
      };
      return L.marker(latlng, style_1_4_0(feature));
  },
});
var cluster_1_4 = new L.MarkerClusterGroup({showCoverageOnHover: false,
  spiderfyDistanceMultiplier: 2});
cluster_1_4.addLayer(layer_1_4);

bounds_group.addLayer(layer_1_4);
// cluster_1_4.addTo(map);
