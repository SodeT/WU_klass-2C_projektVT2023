var currentSlide = 0;

window.onload = function init() {
    
    // automatic global variable
    smallHeader = document.getElementById("index-small-header"); 
    bigHeader = document.getElementById("index-big-header"); 
    slidein = document.getElementById("index-slidein");
    slideinDiv = document.getElementById("index-slidein-div");

    changeSlide(0); // initaialize slide
    
    setInterval(500, changeSlide(1));

    return;
}

window.onscroll = function scroll() {

    var scrollDist = window.pageYOffset;

    if (scrollDist >= bigHeader.offsetHeight - smallHeader.offsetHeight) {
        smallHeader.classList.add("small-header");
    }
    else {
        smallHeader.classList.remove("small-header");
    }

    
    // use sigoid curve here
    var slideOffset = slidein.offsetTop - scrollDist - slidein.offsetHeight/2;

    console.log(slideOffset);
    
    slideOffset = Math.max(slideOffset, 0);
    slideinDiv.style.left = slideOffset.toString() + "px";

    return;
}

function changeSlide(number) {
    var slides = document.getElementsByClassName("index-carousel-slide");
    
    currentSlide += number;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length -1;
    }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("visible");
    }
    slides[currentSlide].classList.add("visible");

    return;
}
