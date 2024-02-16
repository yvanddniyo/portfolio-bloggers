 const hamburger = document.querySelector('.menus')
 const navbars = document.querySelector('.container-navbar-lists')

 hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    navbars.classList.toggle('active')
 })
 document.querySelector('.container-navbar-lists li').forEach(n => 
    n.addEventListener('click', () => {
    hamburger.classList.remove('active')
    navbars.classList.remove('active')
    }))
 