const ctx = document.getElementById('chart-test').getContext('2d')
const closeChart = document.getElementById('close-chart')

const chartNumOne = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2000', '2010', '2020', '2022'],
        datasets: [{
            label: 'Changing population',
            data: [cities[nameCity][3], cities.akk[3], cities.ere[3], cities.der[3]],
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