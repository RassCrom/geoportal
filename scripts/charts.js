const ctx = document.getElementById('chart-test').getContext('2d')
const closeChart = document.getElementById('close-chart')

const chartNumOne = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2000', '2010', '2020', '2022'],
        datasets: [{
            label: 'Changing population',
            data: [cities.ast[3], cities.akk[3], cities.ere[3], cities.der[3]],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
})

closeChart.addEventListener('click', function() {
    anime({
        targets: '.chart-window',
        translateY: 100,
        opacity: 1,
        easing: 'easeInOutElastic(1, .6)'
    })
})

// WATER STATISTICS 
let showGraph = document.getElementById('show-graph');
let openStat = document.getElementById('open-stat');
let closeChartLake = document.getElementById('close-chart-lake');
let lakeCanvas = document.getElementById('lake-canvas');
let delayed;

openStat.addEventListener('click', function() {
    anime({
        targets: '.chart-lake',
        translateX: -1700,
        opacity: 1,
        easing: 'easeInOutElastic(1, .6)'
    })
})

closeChartLake.addEventListener('click', function() {
    anime({
        targets: '.chart-lake',
        translateX: 0,
        opacity: 1,
        easing: 'easeInOutElastic(1, .6)'
    })
})

let dataRegion = ['Аккольский', 'Aршалинский', 'Астраханский', 'Атбасарский', 'Биржан сал', 'Буландынский', 'Бурабайский', 'Егиндыкольский', 'Ерейментауский', 'Есильский', 'Кокшетау', 'Коргалжынский', 'Сандыктауский', 'Шортандинский', 'Степногорск', 'Целиноградский', 'Зерендинский', 'Жаксынский', 'Жаркаинский', 'Алматинский', 'Байконырский', 'Сарыаркинский']
let dataArea = [56.9421, 86.7123, 20.2437, 12.3048, 81.1989, 20.1627, 115.2387, 1656.711, 148.3605, 7.659, 16.317, 2197.2357, 10.3176, 22.086, 8.0478, 73.2645, 124.1496, 2.6532, 6.7293, 0.3627, 1.8045, 0.2313]

const data = {
  labels: dataRegion,
  datasets: [
    {
      label: 'Суммарная площадь водных объектов по регионам Акмолинской области, кв. км.',
      data: dataArea,
      backgroundColor: 'red',
    }
  ]
};

const chartNumTwo = new Chart(lakeCanvas, {
    type: 'bar',
    data: data,
    options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 50;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
})