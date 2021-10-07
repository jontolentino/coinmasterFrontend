const labels = [
'1',
'2',
'3'
  ];

// data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
const data = {
  labels: labels,
  datasets: [{
    spanGaps: true,
    label: 'Price',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: ['4','5','6']
  }]
};

const config = {
  type: 'line',
  data,
  options: {}
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);