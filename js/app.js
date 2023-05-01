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
        generateNodes();
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

class node {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.dx = Math.random() * 2 + 1;
        this.dy = Math.random() * 2 + 1;

        let rndx = Math.random();
        let rndy = Math.random();

        if (rndx > 0.5) {
            this.dx *= -1;
        }

        if (rndy > 0.5) {
            this.dy *= -1;
        }

    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > width) {
            this.dx *= -1;
        }

        if (this.y < 0 || this.y > height) {
            this.dy *= -1;
        }
    }
}

var res = setInterval(updateNodes, 5);

function generateNodes() {
    const canvas = document.getElementById("canvas");

    if (!canvas.getContext("2d")) {
        return;
    }

    width = window.innerWidth;
    height = 600;//window.innerHeight;
    
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = width;
    ctx.canvas.height = height;
    
    positions = []
    let i = 0;
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            var pos = new node(Math.random() * width, Math.random() * height);
            positions[i] = pos;
            i++;
        } 
    }
    
    ctx.fillStyle = "#20C20E";
    ctx.strokeStyle = "#f4ec04";
    ctx.lineWitdh = 10;
}


function updateNodes() {
    console.log("thing");
    ctx.clearRect(0,0,width, height);
    ctx.beginPath();
    for (let i = 0; i < positions.length; i++) {
        ctx.lineTo(positions[i].x, positions[i].y);
        positions[i].move();
    }
    ctx.closePath();
    ctx.stroke();
}

function getDistance(node1, node2) {
    let a2 = Math.pow(Math.abs(node1.x - node2.x), 2);
    let b2 = Math.pow(Math.abs(node1.y - node2.y), 2);
    let c = Math.sqrt(a2 + b2);
    return c;
}