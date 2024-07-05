// // 间隔动画
// let topEle = document.querySelector(".top");

// setInterval(() => {
//   topEle.className = "top ";

//   setTimeout(() => {
//     topEle.className = "top animationtada";
//   }, 1000);
// }, 3000);

// 移入动画
let lists = document.querySelectorAll(".list");

// 循环绑定事件
for (let i = 0; i < lists.length; i++) {
  lists[i].addEventListener("mouseover", function (e) {
    this.className = "list animationpulse";
  });
  lists[i].addEventListener("mouseout", function (e) {
    this.className = "list";
  });
}
