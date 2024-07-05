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
