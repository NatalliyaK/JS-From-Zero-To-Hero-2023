const navHeader = document.querySelector('.header');
const menu = document.querySelector('.header__mob');
const popup = document.querySelector('.popup');

window.addEventListener('scroll', changeBackground);

menu.addEventListener('click', showMenu);

function showMenu() {
    menu.classList.toggle('open');
    popup.classList.toggle('active');
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

function carouselRUN() {
    var carousel = document.getElementById("carousel");
    var scene = document.getElementById("scene");
    var carousel_items_arrey = document.getElementsByClassName("carousel_item");
    var carousel_btn = document.getElementById("carousel_btn");
    var n = carousel_items_arrey.length;
    var curr_carousel_items_arrey = 0;
    var theta = Math.PI * 2 / n;
    let interval = null;
    var autoCarousel = carousel.dataset.auto;

    setupCarousel(n, parseFloat(getComputedStyle(carousel_items_arrey[0]).width));
    window.addEventListener('resize', function() {
        clearInterval(interval);
        setupCarousel(n, parseFloat(getComputedStyle(carousel_items_arrey[0]).width));
    }, false);
    setupNavigation();


    function setupCarousel(n, width) {
        let apothem = width / (2 * Math.tan(Math.PI / n));
        scene.style.transformOrigin = `50% 50% ${- apothem}px`;

        for (let i = 1; i < n; i++) {
            carousel_items_arrey[i].style.transformOrigin = `50% 50% ${- apothem}px`;
            carousel_items_arrey[i].style.transform = `rotateY(${i * theta}rad)`;
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
                curr_carousel_items_arrey++;
            } else if (target.classList.contains('prev')) {
                curr_carousel_items_arrey--;
            }
            clearInterval(interval);
            scene.style.transform = `rotateY(${curr_carousel_items_arrey * -theta}rad)`;

            if (autoCarousel === "true") {
                setCarouselInterval();
            }
        }, true);
    }

    function setCarouselInterval() {
        interval = setInterval(function() {
            curr_carousel_items_arrey++;
            scene.style.transform = `rotateY(${(curr_carousel_items_arrey) * -theta}rad)`;
        }, 3000);
    }
}