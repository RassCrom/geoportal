var map = new maplibregl.Map({
    container: 'map-2',
    style:
    'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
    });
     
    var size = 200;
     
    // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
    // see https://maplibre.org/maplibre-gl-js-docs/api/properties/#customlayerinterface for more info
    var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
     
    // get rendering context for the map canvas when layer is added to the map
    onAdd: function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
    },
     
    // called once before every frame where the icon will be used
    render: function () {
    var duration = 1000;
    var t = (performance.now() % duration) / duration;
     
    var radius = (size / 2) * 0.1;
    var outerRadius = (size / 2) * 0.7 * t + radius;
    var context = this.context;
     
    // draw outer circle
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(
    this.width / 2,
    this.height / 2,
    outerRadius,
    0,
    Math.PI * 2
    );
    context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
    context.fill();
     
    // draw inner circle
    context.beginPath();
    context.arc(
    this.width / 2,
    this.height / 2,
    radius,
    0,
    Math.PI * 2
    );
    context.fillStyle = 'rgba(255, 100, 100, 1)';
    context.strokeStyle = 'white';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();
     
    // update this image's data with data from the canvas
    this.data = context.getImageData(
    0,
    0,
    this.width,
    this.height
    ).data;
     
    // continuously repaint the map, resulting in the smooth animation of the dot
    map.triggerRepaint();
     
    // return `true` to let the map know that the image was updated
    return true;
    }
    };
     

 
    var p = {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [
                              71.2628173828125,
                              51.24902276043772
                            ],
                            [
                              71.2353515625,
                              51.21118509795345
                            ],
                            [
                              71.28067016601562,
                              51.169872159530186
                            ],
                            [
                              71.24496459960938,
                              51.15178610143037
                            ],
                            [
                              71.23260498046875,
                              51.125074674086136
                            ],
                            [
                              71.24359130859375,
                              51.09144802136697
                            ],
                            [
                              71.24908447265625,
                              51.05175436468443
                            ],
                            [
                              71.33560180664062,
                              51.004249861455264
                            ],
                            [
                              71.44134521484374,
                              51.00079308917475
                            ],
                            [
                              71.56494140625,
                              51.05952319390127
                            ],
                            [
                              71.61849975585938,
                              51.09662294502995
                            ],
                            [
                              71.68853759765625,
                              51.08282186160978
                            ],
                            [
                              71.74209594726562,
                              51.10007257240614
                            ],
                            [
                              71.707763671875,
                              51.13455469147683
                            ],
                            [
                              71.63360595703125,
                              51.14230962196141
                            ],
                            [
                              71.57867431640625,
                              51.20086033547136
                            ],
                            [
                              71.57867431640625,
                              51.223227728996164
                            ],
                            [
                              71.62399291992188,
                              51.24644390808839
                            ],
                            [
                              71.58828735351562,
                              51.26878915771344
                            ],
                            [
                              71.54983520507812,
                              51.242145499474994
                            ],
                            [
                              71.47979736328125,
                              51.263633525637
                            ],
                            [
                              71.50177001953125,
                              51.282534682474655
                            ],
                            [
                              71.45919799804688,
                              51.286829315599924
                            ],
                            [
                              71.42074584960938,
                              51.26878915771344
                            ],
                            [
                              71.39328002929688,
                              51.293699893323726
                            ],
                            [
                              71.36306762695312,
                              51.303145259199056
                            ],
                            [
                              71.36444091796875,
                              51.273085075978415
                            ],
                            [
                              71.334228515625,
                              51.26878915771344
                            ],
                            [
                              71.31088256835938,
                              51.24042602354956
                            ],
                            [
                              71.29714965820312,
                              51.23182767977129
                            ],
                            [
                              71.2628173828125,
                              51.24902276043772
                            ]
                          ]
                    ]
                }
            }
        }

    map.on('load', function () {
        map.addSource('maine', p);
        map.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': 'maine',
            'layout': {},
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.8
            }
        });
    });

  
         
        var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
        polygon: true,
        trash: true
        }
        });
        map.addControl(draw);
         
        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);
         
        function updateArea(e) {
        var data = draw.getAll();
        var answer = document.getElementById('calculated-area');
        if (data.features.length > 0) {
        var area = turf.area(data);
        // restrict to area to 2 decimal points
        var rounded_area = Math.round(area * 100) / 100;
        answer.innerHTML =
        '<p><strong>' +
        rounded_area +
        '</strong></p><p>square meters</p>';
        } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete')
        alert('Use the draw tools to draw a polygon!');
        }
        }