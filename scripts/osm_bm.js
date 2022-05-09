let map = L.map('map', {
	center: [51.769, 70.334],
	zoom: 7,
  minZoom: 7,
  maxZoom: 22,
});

let hash = new L.Hash(map);
let scaele = L.control.scale().addTo(map);
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
let userLoc = L.control.locate({locateOptions: {maxZoom: 19}}).addTo(map);

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

// var geoserver = L.tileLayer.wms("http://localhost:8080/geoserver/cite/wms", {
//   layers: 'cite:teest_geo',
//   format: 'image/png',
//   transparent: true,
//   attribution: "Lakes"
// }).addTo(map);

// FEATURES ON MAP
// LAKES 
var lakeStyle = {
  "color": "#cce0fe",
  "weight": 2,
  "opacity": 1
};

function getColor(grad) {
    return grad >= 66.2871 ? '#2c7bb6' :
            grad >= 35.2371 ? '#75b1d3' :
            grad >= 22.8259 ? '#b7dee3' :
            grad >= 13.5570 ? '#e7f4cb' :
            grad >= 7.4623 ? '#fee8a4' :
            grad >= 3.5450 ? '#fdba6e' :
            grad >= 0.9805 ? '#FFA500' : '#FF0000';
}

function style(el) {
  return {
      fillColor: getColor(el.properties.Shape_Area),
      weight: 1,
      opacity: 1,
      color: getColor(el.properties.Shape_Area),
      dashArray: '3',
      fillOpacity: 1
  };
}

let allLakes = L.geoJSON(osmLakes, {style: style});

var lakeStyle = {
  "color": "#cce0fe",
  "weight": 2,
  "opacity": 1
};

function getColorRiver(grad) {
    return grad >= 120387.97 ? '#2c7bb6' :
            grad >= 62560.36 ? '#75b1d3' :
            grad >= 37695.63 ? '#b7dee3' :
            grad >= 25112.70 ? '#e7f4cb' :
            grad >= 15447.16 ? '#fee8a4' :
            grad >= 8513.47 ? '#fdba6e' :
            grad >= 3291.30 ? '#FFA500' : '#FF0000';
}

function styleRiver(el) {
  return {
      fillColor: getColorRiver(el.properties.length),
      weight: 2.5,
      opacity: 1,
      color: getColorRiver(el.properties.length),
      fillOpacity: 1
  };
}

let riverLayer = L.geoJSON(rivers, {style: styleRiver});
// allLakes.addTo(map);

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

function hospStyle(feature, layer) {
  var popupContent2 = '<table>\
          <tr>\
              <td colspan="2"><strong>Тип объекта</strong><br />' + (feature.properties['fclass'] !== null ? autolinker.link(feature.properties['fclass'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2"><strong>Тип здания</strong><br />' + (feature.properties['type'] !== null ? autolinker.link(feature.properties['type'].toLocaleString()) : '') + '</td>\
          </tr>\
          <tr>\
              <td colspan="2"><strong>Название</strong><br />' + (feature.properties['name'] !== null ? autolinker.link(feature.properties['name'].toLocaleString()) : '') + '</td>\
          </tr>\
      </table>';
  layer.bindPopup(popupContent2, {maxHeight: 400});
}

// var hospital = new L.geoJson(hosp, {
//   attribution: '',
//   interactive: true,
//   dataVar: 'json_hosp',
//   layerName: 'Hospitals',
//   pane: 'Hospitals',
//   onEachFeature: hospStyle,
//   pointToLayer: function (feature, latlng) {
//     return L.marker(latlng,{icon: L.AwesomeMarkers.icon({icon: 'medkit', prefix: 'fa', markerColor: 'darkblue'}) });
// },
// }).addTo(map);

var greenIcon = L.icon({
  iconUrl: 'https://cdn.pixabay.com/photo/2020/12/02/07/58/tarantula-5796573_960_720.png',

  iconSize:     [26, 26], // size of the icon
  iconAnchor:   [8, 25], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
// let spider = L.marker([51.769, 70.334], {icon: greenIcon}).addTo(map);

let tarantul = L.geoJSON(json_tarantuls_1, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng,{icon: greenIcon });
  },
});

let scorpioIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/47/47325.png',
  iconSize: [26,26],
  iconAnchor: [8,25]
})

let scorpio = L.geoJSON(json_scorpio_2, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {icon: scorpioIcon})
  }
});

function pop_fishing_1(feature, layer) {
  var popupContent = '<table>\
          <tr>\
              <td colspan="2"><strong>Рыбы</strong><br />' + (feature.properties['Рыбы'] !== null ? autolinker.link(feature.properties['Рыбы'].toLocaleString()) : '') + '</td>\
          </tr>\
      </table>';
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_fishing_1_0() {
  return {
      pane: 'pane_fishing_1',
      rotationAngle: 0.0,
      rotationOrigin: 'center center',
      icon: L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Fish_icon.svg/1200px-Fish_icon.svg.png',
        iconSize: [23.560000000000013, 23.560000000000013]
      }),
      interactive: true,
  }
}
map.createPane('pane_fishing_1');
map.getPane('pane_fishing_1').style.zIndex = 401;
map.getPane('pane_fishing_1').style['mix-blend-mode'] = 'normal';
var layer_fishing_1 = new L.geoJson(json_fishing_1, {
  attribution: '',
  interactive: true,
  dataVar: 'json_fishing_1',
  layerName: 'layer_fishing_1',
  pane: 'pane_fishing_1',
  onEachFeature: pop_fishing_1,
  pointToLayer: function (feature, latlng) {
      var context = {
          feature: feature,
          variables: {}
      };
      return L.marker(latlng, style_fishing_1_0(feature));
  },
});
var cluster_fishing_1 = new L.MarkerClusterGroup({showCoverageOnHover: false,
  spiderfyDistanceMultiplier: 2});
cluster_fishing_1.addLayer(layer_fishing_1);

bounds_group.addLayer(layer_fishing_1);
cluster_fishing_1.addTo(map);
setBounds();
map.addControl(new L.Control.Search({
  layer: cluster_fishing_1,
  initial: false,
  hideMarkerOnCollapse: true,
  propertyName: 'Рыбы'}));
document.getElementsByClassName('search-button')[0].className +=
' fa fa-binoculars';

function pop__1(feature, layer) {
  var popupContent = '<table>\
          <tr>\
              <td colspan="2">' + (feature.properties['Название'] !== null ? autolinker.link(feature.properties['Название'].toLocaleString()) : '') + '</td>\
          </tr>\
      </table>';
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style__1_0() {
  return {
      pane: 'pane__1',
rotationAngle: 0.0,
rotationOrigin: 'center center',
icon: L.icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Icons8_flat_shop.svg/1200px-Icons8_flat_shop.svg.png',
  iconSize: [20.9, 20.9]
}),
      interactive: true,
  }
}
map.createPane('pane__1');
map.getPane('pane__1').style.zIndex = 401;
map.getPane('pane__1').style['mix-blend-mode'] = 'normal';
var layer__1 = new L.geoJson(json__1, {
  attribution: '',
  interactive: true,
  dataVar: 'json__1',
  layerName: 'layer__1',
  pane: 'pane__1',
  onEachFeature: pop__1,
  pointToLayer: function (feature, latlng) {
      var context = {
          feature: feature,
          variables: {}
      };
      return L.marker(latlng, style__1_0(feature));
  },
});
var cluster__1 = new L.MarkerClusterGroup({showCoverageOnHover: false,
  spiderfyDistanceMultiplier: 2});
cluster__1.addLayer(layer__1);

bounds_group.addLayer(layer__1);
cluster__1.addTo(map);
setBounds();

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

// map.addControl(new L.Control.Search({
//   layer: allReg,
//   position: 'topright',
//   initial: false,
//   hideMarkerOnCollapse: true,
//   propertyName: 'ADM2_RU',}));
// document.getElementsByClassName('search-button')[0].className +=
// ' fa fa-binoculars';

// Routing
let locPoint;
let nearest;
let path;
let closeRoute = document.getElementById('closeRoute');
let controls = document.getElementById('controls');
let userCircle;

function onLocationFound(e) {
  var radius = e.accuracy / 2;

  locPoint = L.marker(e.latlng).addTo(map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

  userCircle = L.circle(e.latlng, radius).addTo(map);
  nearest = leafletKnn(layer_fishing_1).nearest(L.latLng(locPoint._latlng.lat, locPoint._latlng.lng),1);
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});

function goToHospital () {
  controls.style.display = 'flex';

  if (typeof path === 'undefined') {
    path = L.Routing.control({
      router: L.routing.mapbox('pk.eyJ1IjoicmFzc2Nyb20iLCJhIjoiY2wyNzlrcDY2MGk5cDNqcW5wZW9mZW5kciJ9.zdI6zJ4KbGx-V8mq1KoUCg'),
      showAlternatives: false,
      lineOptions: { styles: [{ color: '#4caf50', weight: 7 }] },
      fitSelectedRoutes: true,
      altLineOptions: { styles: [{ color: '#ed6852', weight: 7 }] },
      // show: false,
      collapsible: false,
      routeWhileDragging: true,
      addWaypoints: false,
      waypoints: [
        L.latLng(locPoint._latlng.lat, locPoint._latlng.lng),
        L.latLng(nearest[0].lat, nearest[0].lon)
      ],
      reverseWaypoints: true,
    }).addTo(map);
    var routeBlock = path.onAdd(map);
    document.getElementById('mod').appendChild(routeBlock);	
  } else if (typeof path === 'object') {
    map.removeControl(path);
    path = undefined
    map.removeLayer(locPoint);
    map.removeLayer(userCircle);
  };
  let routeBug = document.querySelector('.leaflet-routing-container');
  routeBug.style.display = 'none';
  animateSideBar();
};

let goHosp = document.querySelector('.leaflet-bar-part-single');
// let wayHosp = document.getElementById('open-hos');

// wayHosp.addEventListener('click', goToHospital);

// ROUTE CLOSER
function closeRouteContainer() {
    controls.style.display = 'none';
    map.removeControl(path);
    path = undefined;
    map.removeLayer(locPoint);
    map.removeLayer(userCircle);
}

closeRoute.addEventListener('click', closeRouteContainer)