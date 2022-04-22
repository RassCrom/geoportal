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

const styleSideBar = window.getComputedStyle(leftBar)
const matrix = styleSideBar.transform || styleSideBar.webkitTransform || styleSideBar.mozTransform
const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

const animateSideBar = () => {
    var changeIcon = document.querySelector('.fas')
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
            translateX: 550,
            opacity: 1,
            easing: 'easeInOutElastic(1, .6)'
        })
        leftBar.classList.add('close-sidebar');
        changeIcon.classList.remove('fa-arrow-alt-circle-right');
        changeIcon.classList.add('fa-window-close');
    }
}

btnSideBar.addEventListener('click', animateSideBar)

const zoomToCity = () => {
    let nameCity = 'ast'
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