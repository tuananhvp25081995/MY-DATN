// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Hóa đơn 1", "Hóa đơn 2", "Hóa đơn 3", "Hóa đơn 4","Hóa đơn 5","Hóa đơn 6","Hóa đơn 7","Hóa đơn 8","Hóa đơn 9","Hóa đơn 10"],
    datasets: [{
      data: [5,10,5,15,4,6,15,20,13,7],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745','#3a1a1a','#e68989',"#172c42","#81d2a5","#9fd28a","#b1c127"],
    }],
  },
});
