let inner = document.querySelector(".inner");
let out = document.querySelector(".out");
inner.addEventListener("input", function (e) {
  // console.log(this.value); //实时监听的值

  let arr = this.value.split("\n"); //先按行分割
  let obj = {}; //转化为一个对象
  arr.forEach((item) => {
    let headarr = item.split(":");
    obj[headarr[0]] = headarr[1]?.trim(); //可选链
  });
  let originStr = JSON.stringify(obj);
  originStr = originStr.replace("{", "");
  originStr = originStr.substring(0, originStr.length - 1);
  // 使用正则表达式找到所有的逗号，并在每个逗号后面添加换行符
  let handleStr = originStr.replace(/","/g, '",\n"');
  // console.log(handleStr);

  out.value = handleStr;
});
// 复制文字函数
async function copyTextToClipboard(text) {
  try {
    // 等待navigator.clipboard变得可用
    await navigator.clipboard.writeText(text);
    console.log("文本已成功复制到剪贴板");
  } catch (err) {
    console.error("无法复制文本: ", err);
  }
}
// 点击copy按钮
let copy = document.querySelector(".copy");
copy.addEventListener("click", function () {
  // 使用示例
  console.log(out.value);
  if (out.value.length <= 0) {
    return alert("输出文本为空,请先转换!");
  }
  copyTextToClipboard(out.value);
  alert("复制成功!");
});
