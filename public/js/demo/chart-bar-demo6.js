// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart6");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["SP1", "SP2", "SP3", "SP4", "SP5", "SP6","SP7","SP8","SP9","SP10","SP11","SP12","SP13","SP14","SP15","SP16"],
    datasets: [{
      label: "Tổng sản phẩm",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [6, 21, 13, 41, 23, 12,23,16,24,31,14,8,12,24,12,12],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 16
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 80,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
