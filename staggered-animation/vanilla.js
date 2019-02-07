const divs = [...document.querySelectorAll('section div')];
const title = document.querySelector('h1');

const delay = time => new Promise(resolve => setTimeout(resolve, time));

divs.forEach((div, i) => {
  // Stagger using index
  delay(0).then(() => {
    setTimeout(() => {
      div.style.backgroundColor = 'lightblue';
    }, i * 100);
  });

  delay(1500).then(() => {
    setTimeout(() => {
      div.style.backgroundColor = 'rgb(228, 242, 255)';
      div.style.width = '90%';
    }, i * 100);
  });

  delay(2500).then(() => {
    title.style.opacity = 1;
    title.style.transform = 'none';
  });
});

console.log(divs);
