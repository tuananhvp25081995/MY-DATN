var countDownDate = new Date("Jul 02, 2019 00:00:00").getTime();
 
  var x = setInterval(function() { 
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("demo").innerHTML = days + "Ngày " + hours + "Giờ "
    + minutes + "Phút " + seconds + "Giây ";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "Thời gian sale đã kết thúc";
    }
  }, 1000);