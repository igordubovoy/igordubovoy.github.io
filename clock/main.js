var secondArrow = document.querySelector('.second');
var minuteArrow = document.querySelector('.minute');
var hourArrow = document.querySelector('.hour');
var secStep = 360 / 60;
var seconds = 0
setInterval(function () {
  var date = new Date();
  seconds ? seconds++ : seconds = date.getSeconds() + 1;
  secondArrow.style.transform = 'rotate(' + (seconds * secStep - 90 ) + 'deg)'
  minuteArrow.style.transform = 'rotate(' + (date.getMinutes() * secStep - 90 + (date.getSeconds() * secStep / 60)) + 'deg)'
  hourArrow.style.transform = 'rotate(' + (date.getHours() * 360 / 12 - 90 + (date.getMinutes() * 30 / 60 ) + date.getSeconds() * 30 / 3600)+ 'deg)'
}, 1000)
