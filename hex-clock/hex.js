const rowMain = document.querySelector('.row-main');
const nextRows = [...document.getElementsByClassName('row-next')];
const prevRows = [...document.getElementsByClassName('row-prev')];

const getStr = n => (n < 10 ? `0${n}` : `${n}`);

const refresh = () => {
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const string = `#${getStr(h)}${getStr(m)}${getStr(s)}`;
  nextRows.forEach((row, i) => {
    const newS = s + i + 1;
    const newString = newS < 60
      ? `#${getStr(h)}${getStr(m)}${getStr(newS)}`
      : `#${getStr(h)}${getStr(m + 1)}${getStr(newS % 60)}`;
    row.style.backgroundColor = newString;
  });
  prevRows.forEach((row, i) => {
    const newS = s - (i + 1);
    const newString = newS >= 0
      ? `#${getStr(h)}${getStr(m)}${getStr(newS)}`
      : `#${getStr(h)}${getStr(m - 1)}${getStr(60 + newS)}`;
    row.style.backgroundColor = newString;
  });
  rowMain.textContent = string;
  rowMain.style.backgroundColor = string;
};

document.addEventListener('DOMContentLoaded', refresh);
setInterval(refresh, 1000);
