var counter = 1;
var interval;

function startAutoSlider() {
  interval = setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
      counter = 1;
    }
  }, 5000);
}

function manualSlide(dotNumber) {
  clearInterval(interval); 
  counter = dotNumber; 
  document.getElementById('radio' + dotNumber).checked = true;
  startAutoSlider(); 
}

startAutoSlider();

document.getElementById('radio1').addEventListener('click', function() { manualSlide(1); });
document.getElementById('radio2').addEventListener('click', function() { manualSlide(2); });
document.getElementById('radio3').addEventListener('click', function() { manualSlide(3); });
document.getElementById('radio4').addEventListener('click', function() { manualSlide(4); });
