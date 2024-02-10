const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-items");
const newsletterButton = document.querySelectorAll(".newsletter");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const accordiontitles = document.querySelectorAll(".accordion .title");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});

newsletterButton.forEach(button => {
    button.addEventListener("click", () =>{
        modal.classList.add("show");
    });
});

close.addEventListener("click", event => {
     console.log("close button pressed");
     modal.classList.remove("show");
});


accordiontitles.forEach(title => {
  title.addEventListener("click", event => {
    console.log(event.target.classList);
    event.target.classList.toggle("active");
    event.target.nextElementSibling.classList.toggle("active");
  });
});

function updateCarrousel() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: window.innerWidth < 960 ? 1 : 3,
        spaceBetween: 30,
        slidesPerGroup: window.innerWidth > 960? 1 : 3,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
      });      
}

updateCarrousel();
window.onresize = () => {
    updateCarrousel();
};

