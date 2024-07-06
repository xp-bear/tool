// 获取time
let time = document.querySelector(".time");
let span1 = time.children[0];

let today = new Date(); //拿到当前的时间对象

// 创建一个数组，用于将数字映射到星期的中文名称
let daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
// 调用 getDay() 方法
let dayOfWeekNumber = today.getDay(); //星期几
let day = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 ";
span1.innerHTML = day + daysOfWeek[dayOfWeekNumber];

// 获取农历
const { getLunar } = chinese_lunar_calendar;
time.children[1].innerHTML = "农历: " + getLunar(today.getFullYear(), today.getMonth() + 1, today.getDate()).dateStr;

// 定时器时间显示 // 先赋值一次
let hh = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
let mm = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
let ss = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
time.children[2].innerHTML = hh + ":" + mm + ":" + ss;
setInterval(() => {
  let d = new Date(); //拿到当前的时间对象
  hh = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  ss = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

  time.children[2].innerHTML = hh + ":" + mm + ":" + ss;
}, 1000);
// ------------------------------------------------------------------

function timestampToDateTime(timestamp) {
  // 假设时间戳是毫秒数
  var date = new Date(timestamp);

  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从0开始，所以+1
  var day = ("0" + date.getDate()).slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
}

let inchuo = document.querySelector(".inchuo");
let inchuores = document.querySelector(".inchuores");
// 先处理一次
inchuo.value = Date.now(); //先付值
inchuores.value = timestampToDateTime(+inchuo.value);

inchuo.addEventListener("input", function (e) {
  if (this.value.length <= 0) {
    inchuores.value = "";
  } else {
    inchuores.value = timestampToDateTime(+this.value);
  }
});
// 监听粘贴事件
inchuo.addEventListener("paste", function (event) {
  // 如果你想阻止粘贴操作，可以取消事件的默认行为
  //   event.preventDefault();

  // 你可以在这里访问粘贴的数据，如果它是文本的话
  // 但需要注意的是，直接从事件中获取粘贴的文本并不直接，可能需要使用`.clipboardData`或`window.clipboardData`
  if (event.clipboardData) {
    let pastedData = event.clipboardData.getData("text");
    inchuores.value = timestampToDateTime(+pastedData);
  }
});

// 时间转换为时间戳

var inputs = document.querySelectorAll(".changetwo div > input");

inputs.forEach(function (input, index) {
  switch (index) {
    case 0:
      input.value = today.getFullYear();
      break;
    case 1:
      input.value = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
      break;
    case 2:
      input.value = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
      break;
    case 3:
      input.value = hh;
      break;
    case 4:
      input.value = mm;
      break;
    case 5:
      input.value = ss;
      break;
  }
});

let confirm = document.querySelector(".confirm");
let timeres = document.querySelector(".timeres");

confirm.addEventListener("click", function (e) {
  //   获取input的值
  let dayStr = "";
  inputs.forEach((item) => {
    dayStr += item.value + "-";
  });
  // 解析日期字符串
  let dateString = dayStr.slice(0, -1);
  let parts = dateString.split("-");

  // 提取年、月、日、小时、分钟和秒
  let year = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10) - 1; // 月份是从0开始的，所以需要减1
  let day = parseInt(parts[2], 10);
  let hours = parseInt(parts[3], 10);
  let minutes = parseInt(parts[4], 10);
  let seconds = parseInt(parts[5], 10);

  // 创建Date对象
  let date = new Date(year, month, day, hours, minutes, seconds);

  // 转换为时间戳
  let timestamp = date.getTime();

  timeres.value = timestamp;
});
