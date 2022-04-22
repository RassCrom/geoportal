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
    rndm = document.getElementById('random')

const styleSideBar = window.getComputedStyle(leftBar)
const matrix = styleSideBar.transform || styleSideBar.webkitTransform || styleSideBar.mozTransform
const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

const animateSideBar = () => {
    let changeIcon = document.querySelector('.fas')
    if (leftBar.classList.contains('close-sidebar')) {
        anime({
            targets: '.left-sidebar',
            translateX: 0,
            opacity: 1,
            easing: 'easeInOutElastic(1, .6)'
        })
        leftBar.classList.remove('close-sidebar');
        changeIcon.classList.remove('fa-window-close');
        changeIcon.classList.add('fa-arrow-alt-circle-right');
    } else {
        anime({
            targets: '.left-sidebar',
            translateX: 560,
            opacity: 1,
            easing: 'easeInOutElastic(1, .6)'
        })
        leftBar.classList.add('close-sidebar');
        changeIcon.classList.remove('fa-arrow-alt-circle-right');
        changeIcon.classList.add('fa-window-close');
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

// Copy Clipboard
var clipboard = new ClipboardJS('#copy');
