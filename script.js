 const hamburger = document.querySelector('.menus')
 const navbars = document.querySelector('.container-navbar-lists')

 hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    navbars.classList.toggle('active')
 })
 document.querySelectorAll('.container-navbar-lists li').forEach(n => {
   n.addEventListener('click', () => {
       hamburger.classList.remove('active');
       navbars.classList.remove('active');
   });
});


    const scrollContainer = document.querySelector(".my-project");
    const backBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
   
    
    backBtn.addEventListener('click', () => {
       scrollContainer.style.scrollBehavior ="smooth"
        scrollContainer.scrollLeft += 500;
    });
    
    nextBtn.addEventListener('click', () => {
      scrollContainer.style.scrollBehavior ="smooth"
        scrollContainer.scrollLeft -=500;
    });
   
 