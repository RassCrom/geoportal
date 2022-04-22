var towns = L.layerGroup();
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mbUrl = 'https://api.mapbox.com/styles/v1/rasscrom/ckmq71yrq0tut17qhr0l6b28x/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmFzc2Nyb20iLCJhIjoiY2wyNzlrcDY2MGk5cDNqcW5wZW9mZW5kciJ9.zdI6zJ4KbGx-V8mq1KoUCg';

var grayscale = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
var map = L.map('map', {
	center: [51.166667, 71.433333],
	zoom: 10,
  minZoom: 3,
  maxZoom: 17,
	layers: [grayscale, towns]
});

var baseLayers = {
	'Grayscale': grayscale, 
};
// var geoserver = L.tileLayer.wms("http://localhost:8080/geoserver/cite/wms", {
//   layers: 'cite:teest_geo',
//   format: 'image/png',
//   transparent: true,
//   attribution: "Lakes"
// }).addTo(map);

var overlays = {
	'Cities': towns
};

var layerControl = L.control.layers(baseLayers, overlays).addTo(map);
// layerControl.addOverlay(geoserver, "geo");

var marker_test = L.marker([51.166667, 71.433333]).addTo(map).bindPopup('test');

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
