var currentSlide = 1;
const slidesCount = 3;

function nextSlide(n) {
    return slideShow(currentSlide + n);
}

function slideShow(newSlide) {
    if(newSlide > slidesCount) {
        newSlide = 1;
    }
    else if(newSlide < 1) {
        newSlide = slidesCount;
    }
    else {
    }

    var oldSlide = document.getElementById('carousel-image-' + currentSlide);
    oldSlide.className = oldSlide.className.replace(/\b active\b/, '');
    document.getElementById('carousel-image-' + newSlide).className += ' active';

    currentSlide = newSlide;
}