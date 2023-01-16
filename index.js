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