let card = document.querySelector(".card");
let p = document.querySelector(".card>p");
card.addEventListener("mouseover", function (e) {
  p.style.bottom = 0;
});
card.addEventListener("mouseout", function (e) {
  p.style.bottom = -60 + "px";
});
