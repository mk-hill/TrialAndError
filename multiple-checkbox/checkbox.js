const parentDiv = document.querySelector('.inbox');
const divArr = Array.from(document.querySelectorAll('.item'));

function checkOrUncheck(first, last, click, bool) {
  if (bool) {
    for (let i = first + 1; i < last; i++) {
      divArr[i].childNodes[1].checked = true;
    }
  } else {
    for (let i = last; i >= click; i--) {
      divArr[i].childNodes[1].checked = false;
    }
  }
}

function clickHandler(e) {
  if (e.target.type !== 'checkbox') return;
  if (!e.shiftKey) return;
  const checkedArr = divArr.map(item => item.childNodes[1].checked);
  const firstTrue = checkedArr.indexOf(true);
  const lastTrue = checkedArr.lastIndexOf(true);
  const clickIndex = e.target.dataset.index;
  const clickDidCheck = checkedArr[clickIndex];
  checkOrUncheck(firstTrue, lastTrue, clickIndex, clickDidCheck);
}

parentDiv.addEventListener('click', clickHandler);

// ! e.shiftKey appears to capture shift status, no need for variable and event listener !
// const shiftPressed = false;
// window.addEventListener('keydown', (e) => {
//   if ((e.keyCode = 16) && shiftPressed === false) {
//     shiftPressed = true;
//   }
// });
// window.addEventListener('keyup', (e) => {
//   if ((e.keyCode = 16)) {
//     shiftPressed = false;
//   }
// });
