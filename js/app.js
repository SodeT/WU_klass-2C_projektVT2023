var currentSlide = 0;

window.onload = function init() {
    // getting elements present on every sub page
    nav = document.getElementsByTagName("nav")[0];
    hamIcon = document.getElementById("ham-icon");
    hamIcon.addEventListener("click", toggleNav);
    smallHeader = document.getElementById("small-header"); 
    bigHeader = document.getElementById("big-header");

    // getting specific sub page elements
    var path = window.location.pathname;
    subPage = path.substring(path.lastIndexOf('/') + 1);

    switch (subPage) {
    case "index.html":
        slidein = document.getElementById("index-slidein");
        slideInDiv = document.getElementById("index-slidein-div");
        break;

    case "jobs.html":
        carouselLeftBtn = document.getElementById("carousel-left");
        carouselRightBtn = document.getElementById("carousel-right");       
        
        carouselLeftBtn.addEventListener("click", function(){changeSlide(-1)});
        carouselRightBtn.addEventListener("click", function(){changeSlide(1)});

        changeSlide(0); // initaialize slide
        //setInterval(500, changeSlide(1));
        break;

    case "products.html":
        break;

    case "about.html":
        break;
    }

    return;
}

window.onscroll = function scroll() {
    var scrollDist = window.pageYOffset;
    
    if (scrollDist >= bigHeader.offsetHeight - smallHeader.offsetHeight) {
        smallHeader.classList.add("header-toggle");
        nav.classList.add("header-toggle");
    }
    else {
        smallHeader.classList.remove("header-toggle");
        nav.classList.remove("header-toggle");
        nav.classList.remove("nav-toggle")
    }

    switch (subPage) {
        case "index.html":
            var slideOffset = slidein.offsetTop - scrollDist - slidein.offsetHeight/2 + 350;
            slideOffset = Math.max(slideOffset, 0);
            slideInDiv.style.left = slideOffset.toString() + "px";
            break;
    }
    
    return;
}

function changeSlide(number) {
    var slides = document.getElementsByClassName("jobs-carousel-slide");
    
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

function toggleNav() {
    nav.classList.toggle("nav-toggle");
}