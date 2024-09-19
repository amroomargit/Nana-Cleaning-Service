/*Note from the programmer: This is my first time coding a website, so some of the comments I've made on bits of code which might seem obvious
are for my learning purposes*/


//targets id and class created in index.html so that we can add javascript functionality to it
const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

//in the event someone clicks on the dropdown menu, this is the functionality we're adding
menu.addEventListener('click',function(){

    //toggles on the is-active css class once the click mentioned above happens
    menu.classList.toggle('is-active');
    //toggles on the active css class once the click mentioned above happens
    menuLinks.classList.toggle('active');
});
