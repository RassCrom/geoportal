var buffer = document.getElementById('buffer');
var bufferSettings = document.getElementById('buffer-settings')
var confirmBuffer = document.getElementById('confirmBuffer');
var numBuffer = document.getElementById('number');

const bufferFeature = () => {
    let valueBuffer = numBuffer.value;
    let data = marker_test.toGeoJSON();
    let buffered = turf.buffer((data), valueBuffer, {units: 'meters'});
    L.geoJson(buffered).addTo(map).bindPopup(`<b style="font-size: 16px">Buffer distance: </b> <span style="font-size: 16px">${valueBuffer} m</span>`).openPopup();
    bufferSettings.style.display = 'none'
}

buffer.addEventListener('click', function() {
    if (bufferSettings.style.display === 'none') {
        bufferSettings.style.display = 'flex';
    } else {
        bufferSettings.style.display = 'none';
    }
})

confirmBuffer.addEventListener('click', bufferFeature)