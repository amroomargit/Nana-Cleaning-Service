fetch('../header_footer/navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar').innerHTML = data;

    //targets id and class created in index.html so that we can add javascript functionality to it
    const menu = document.querySelector('#mobile-menu')
    const menuLinks = document.querySelector('.navbar__menu')
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('#navbar__logo img');

    //in the event someone clicks on the dropdown menu, this is the functionality we're adding
    menu.addEventListener('click',function(){
        
        //toggles on the is-active css class once the click mentioned above happens
        menu.classList.toggle('is-active');
        //toggles on the active css class once the click mentioned above happens
        menuLinks.classList.toggle('active');
        //toggles on the active css class for navbar once the click mentioned above happens
        navbar.classList.toggle('active');

        //for the logo change:
        if(navbar.classList.contains('active')){
            logo.src = '../images/Nana logo 2.png';
        }
        else{
            logo.src = '../images/Nana logo.png';
        }
    
    });

})
.catch(error => console.error('Issue loading up the navbar:', error));

