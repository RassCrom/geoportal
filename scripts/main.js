var sideIcon = document.getElementById('side-icon');
    btnSideBar = document.getElementById('btn');
    leftBar = document.getElementById('left-sidebar');
    ast = document.getElementById('ast');
    akk = document.getElementById('akk');
    atb = document.getElementById('atb');
    der = document.getElementById('der');
    ere = document.getElementById('ere');
    esi = document.getElementById('esi');
    kok = document.getElementById('kok');
    mak = document.getElementById('mak');
    ste = document.getElementById('ste');
    stp = document.getElementById('stp');
    shu = document.getElementById('shu');
    btnFullscreen = document.getElementById('btn-fullscreen');
    rndm = document.getElementById('random');
    home = document.getElementById('btn-home');

const styleSideBar = window.getComputedStyle(leftBar);
const matrix = styleSideBar.transform || styleSideBar.webkitTransform || styleSideBar.mozTransform
const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

const animateSideBar = () => {
    let changeIconSide = document.getElementById('side-bar')
    if (leftBar.classList.contains('close-sidebar')) {
        anime({
            targets: '.left-sidebar',
            translateX: 0,
            opacity: 1,
            easing: 'easeInOutElastic(1, .6)'
        })
        leftBar.classList.remove('close-sidebar');
        changeIconSide.classList.remove('fa-arrow-alt-circle-left')
        changeIconSide.classList.add('fa-arrow-alt-circle-right');
    } else {
        anime({
            targets: '.left-sidebar',
            translateX: 560,
            opacity: 1,
            easing: 'easeInOutElastic(1, .6)'
        })
        leftBar.classList.add('close-sidebar');
        changeIconSide.classList.remove('fa-arrow-alt-circle-right');
        changeIconSide.classList.add('fa-arrow-alt-circle-left');
    }
}

btnSideBar.addEventListener('click', animateSideBar)

var nameCity = 'ast';

const zoomToCity = () => {
    switch (event.target.attributes.id.nodeValue) {
        case 'akk':
            nameCity = 'akk';
            break;
        case 'atb':
            nameCity = 'atb';
            break;
        case 'der':
            nameCity = 'der';
            break;
        case 'ere':
            nameCity = 'ere';
            break;
        case 'esi':
            nameCity = 'esi';
            break;
        case 'kok':
            nameCity = 'kok';
            break;
        case 'mak':
            nameCity = 'mak';
            break;
        case 'ste':
            nameCity = 'ste';
            break;
        case 'stp':
            nameCity = 'stp';
            break;
        case 'shu':
            nameCity = 'shu';
            break;
        case 'ast':
            nameCity = 'ast';
            break;
        default:
            break;
    }
    map.flyTo([cities[nameCity][0], cities[nameCity][1]], cities[nameCity][2])
    anime({
        targets: '.chart-window',
        translateY: 550,
        opacity: 1,
        easing: 'easeInOutElastic(1, .6)'
    })
    chartNumOne.data.datasets[0].data[3] = cities[nameCity][3]
    chartNumOne.data.datasets[0].data[2] = cities[nameCity][4]
    chartNumOne.data.datasets[0].data[1] = cities[nameCity][5]
    chartNumOne.data.datasets[0].data[0] = cities[nameCity][6]
    chartNumOne.update();
}

ast.addEventListener('click', zoomToCity)
akk.addEventListener('click', zoomToCity)
atb.addEventListener('click', zoomToCity)
der.addEventListener('click', zoomToCity)
ere.addEventListener('click', zoomToCity)
esi.addEventListener('click', zoomToCity)
kok.addEventListener('click', zoomToCity)
mak.addEventListener('click', zoomToCity)
ste.addEventListener('click', zoomToCity)
stp.addEventListener('click', zoomToCity)
shu.addEventListener('click', zoomToCity)

// View map fullscreen
function fullScreenToggler() {
    let doc = document;
        elm = document.body;
        changeIconFull = document.getElementById('full');
    
    if (!doc.fullscreenElement) {
        elm.requestFullscreen()
        changeIconFull.classList.remove('fa-expand')
        changeIconFull.classList.add('fa-compress')
    } else {
        doc.exitFullscreen()
        changeIconFull.classList.remove('fa-compress')
        changeIconFull.classList.add('fa-expand')
    }

    // !doc.fullscreenElement ? elm.requestFullscreen() : doc.exitFullscreen();

}

btnFullscreen.addEventListener('click', fullScreenToggler)

// Zoom to the random place
const rndmGenerator = arr => {
    return (Math.random() * arr.length).toFixed(0)
}

const rndmFly = () => {
    let flyToRndmCity = rndmGenerator(rndmCities);
    map.flyTo([rndmCities[flyToRndmCity].lat, rndmCities[flyToRndmCity].lng], 15)
}


rndm.addEventListener('click', rndmFly)

// FLY TO HOME POSITION 
const flyToHome = () => {
    map.flyTo([51.769, 70.334], 7)
}

home.addEventListener('click', flyToHome)


// // Copy Clipboard
// var clipboard = new ClipboardJS('#copy');


// ACCORDION
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active-map");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + 120 + "px";
    }
  });
};


// Custom control 
let mL = {
    _eco: ['#toggle-eco', '#opacity-eco', [cluster_1_4, cluster_2_3, cluster_3_2]],
    _lake: ['#toggle-lake', '#opacity-lake', allLakes],
    _obl: ['#toggle-obl', '#opacity-obl', allObl],
    _reg: ['#toggle-reg', '#opacity-reg', allReg],
    get eco() {
        return this._eco;
    },
    get lake() {
        return this._lake;
    },
    get obl() {
        return this._obl;
    },
    get reg() {
        return this._reg;
    },
}

$(mL.lake[0]).on('change', function() {
    if($(this).is(':checked')) {
        mL.lake[2].addTo(map);
    } else {
        map.removeLayer(allLakes);
    } 
})

$(mL.lake[1]).on('change', function() {
    let val = $(this).val();
    let opa = val / 100;
    // console.log(opa)
    mL.lake[2].setStyle({fillOpacity: c, opacity: opa})
})

$(mL.eco[0]).on('change', function() {
    if($(this).is(':checked')) {
        mL.eco[2][0].addTo(map);
        mL.eco[2][1].addTo(map);
        mL.eco[2][2].addTo(map);
    } else {
        map.removeLayer(mL.eco[2][0]);
        map.removeLayer(mL.eco[2][1]);
        map.removeLayer(mL.eco[2][2]);
    } 
})

$(mL.eco[1]).on('change', function() {
    let val = $(this).val();
    let opa = val / 100;
    console.log(opa)
    mL.eco[2][0].setStyle({fillOpacity: opa, opacity: opa})
    mL.eco[2][1].setStyle({fillOpacity: opa, opacity: opa})
    mL.eco[2][2].setStyle({fillOpacity: opa, opacity: opa})
})

$(mL.obl[0]).on('change', function() {
    if($(this).is(':checked')) {
        mL.obl[2].addTo(map);
    } else {
        map.removeLayer(mL.obl[2]);
    } 
})

$(mL.obl[1]).on('change', function() {
    let val = $(this).val();
    let opa = val / 100;
    mL.obl[2].setStyle({fillOpacity: opa, opacity: opa})
})

$(mL.reg[0]).on('change', function() {
    if($(this).is(':checked')) {
        mL.reg[2].addTo(map);
        console.log(mL.reg[2])
    } else {
        map.removeLayer(mL.reg[2]);
    } 
})

$(mL.reg[1]).on('change', function() {
    let val = $(this).val();
    let opa = val / 100;
    mL.reg[2].setStyle({fillOpacity: opa, opacity: opa})
})



