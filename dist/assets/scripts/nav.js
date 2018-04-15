const burgerBtn = document.getElementById('burger'), 
    nav = document.getElementById('nav');
nav.addEventListener('click', function (event) {
    if (event.target == this || event.target.className == 'nav__link') {
        burgerBtn.click();
        return;
    }
})
burgerBtn.onclick = function (event) {
    this.classList.toggle('nav__burger--active');
    this.closest('nav').classList.toggle('nav--mobile-open');
    document.querySelector('body').classList.toggle('noscroll');
}
