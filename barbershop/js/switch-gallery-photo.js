var controls = document.querySelectorAll('.gallery-button');
var slides = document.querySelectorAll('.slide');

var next = document.querySelector('.gallery-button-next');
var previous = document.querySelector('.gallery-button-back');

var currentSlide = 0;

function nextSlide(){
    goToSlide(currentSlide+1);
}

function previousSlide(){
    goToSlide(currentSlide-1);
}

function goToSlide(n){
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide slide-show';
}

next.onclick = function(e){
    e.preventDefault()
    nextSlide();
};
previous.onclick = function(e){
    e.preventDefault();
    previousSlide();
};