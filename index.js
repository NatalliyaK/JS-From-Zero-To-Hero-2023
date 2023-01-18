const navHeader = document.querySelector('.header');
    menu = document.querySelector('.header__mob'),
    popup = document.querySelector('.popup'),
    navLists = document.querySelectorAll('.nav-list__item');

window.addEventListener('scroll', changeBackground);

menu.addEventListener('click', showMenu);

function showMenu() {
    menu.classList.toggle('open');
    popup.classList.toggle('active');
}

navLists.forEach(function (item) {
    item.addEventListener('click', closePopup);
});

function closePopup () {
    popup.classList.remove('active');
    menu.classList.remove('open');
    menu.classList.add('header__mob');
}

function changeBackground () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        navHeader.classList.toggle('banner--gradient');
    } else if (window.pageYOffset === 0 &&  navHeader.classList.contains('banner--gradient')) {
        navHeader.classList.remove('banner--gradient');
        navHeader.classList.add('header--background');
    }
}

window.addEventListener('load', function() {
    carouselRUN();
}, false);

let carousel = document.getElementById("carousel"),
    scene = document.getElementById("scene"),
    carouselItemsArray = document.getElementsByClassName("carousel_item"),
    carousel_btn = document.getElementById("carousel_btn"),
    n = carouselItemsArray.length,
    currCarouselItemsArray = 0,
    theta = Math.PI * 2 / n,
    interval = null,
    autoCarousel = carousel.dataset.auto;

function carouselRUN() {
    setupCarousel(n, parseFloat(getComputedStyle(carouselItemsArray[0]).width));
    window.addEventListener('resize', function() {
        clearInterval(interval);
        setupCarousel(n, parseFloat(getComputedStyle(carouselItemsArray[0]).width));
    }, false);
    setupNavigation();

    function setupCarousel(n, width) {
        let apothem = width / (2 * Math.tan(Math.PI / n));
        scene.style.transformOrigin = `50% 50% ${- apothem}px`;

        for (let i = 1; i < n; i++) {
            carouselItemsArray[i].style.transformOrigin = `50% 50% ${- apothem}px`;
            carouselItemsArray[i].style.transform = `rotateY(${i * theta}rad)`;
        }

        if (autoCarousel === "true") {
            setCarouselInterval();
        }
    }

    function setupNavigation() {
        carousel_btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let target = e.target;

            if (target.classList.contains('next')) {
                currCarouselItemsArray++;
            } else if (target.classList.contains('prev')) {
                currCarouselItemsArray--;
            }
            clearInterval(interval);
            scene.style.transform = `rotateY(${currCarouselItemsArray * -theta}rad)`;

            if (autoCarousel === "true") {
                setCarouselInterval();
            }
        }, true);
    }

    function setCarouselInterval() {
        interval = setInterval(function() {
            currCarouselItemsArray++;
            scene.style.transform = `rotateY(${(currCarouselItemsArray) * -theta}rad)`;
        }, 3000);
    }
}