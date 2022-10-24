// scroll effect
const navbar = document.querySelector('.navbar');
const page = document.querySelector('html');

document.addEventListener('scroll', (e) => {
    if (page.scrollTop > 200) navbar.classList.add('slide')
    else navbar.classList.remove('slide')
});

// copying links
const instalinks = document.querySelectorAll('.commands-section .block .block-card .block-card-title-section a')

instalinks.forEach(instalink => {
    let value = instalink.href
    instalink.addEventListener('click', (e) => {
        navigator.clipboard.writeText(value)
    })
});