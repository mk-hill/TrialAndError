const fs = require('fs');

const q1a = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa');
    const input = data.toString();
    const answer = input.match(/\(/g).length - input.match(/\)/g).length;
    console.log(`q1a = ${answer}`);
    console.timeEnd('santa');
  });
};

const q1b = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa2');
    const inputArr = data.toString().split('');
    const result = inputArr.reduce(
      (acc, val) => (val === '(' ? (acc += 1) : val === ')' ? (acc -= 1) : acc),
      0,
    );
    console.log(`q1b = ${result}`);
    console.timeEnd('santa2');
  });
};

const q1c = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa3');
    const inputArr = data.toString().split('');
    const result = inputArr.reduce((acc, val) => {
      if (val === '(') {
        acc += 1;
      }
      if (val === ')') {
        acc -= 1;
      }
      return acc;
    }, 0);
    console.log(`q1c = ${result}`);
    console.timeEnd('santa3');
  });
};

const q2a = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa4');
    let position = 0;
    const inputArr = data.toString().split('');
    const result = inputArr.reduce((acc, val) => {
      if (acc >= 0) {
        if (val === '(') {
          acc += 1;
        }
        if (val === ')') {
          acc -= 1;
        }
        position++;
        return acc;
      }
    }, 0);
    console.log(`q2a = ${position}`);
    console.timeEnd('santa4');
  });
};

const q2b = () => {
  fs.readFile('./santa.txt', (err, data) => {
    console.time('santa5');
    let acc = 0;
    let position = 0;
    const inputArr = data.toString().split('');
    const result = inputArr.some((val) => {
      if (val === '(') {
        acc += 1;
      }
      if (val === ')') {
        acc -= 1;
      }
      position++;
      return acc < 0;
    }, 0);
    console.log(`q2b = ${position}`);
    console.timeEnd('santa5');
  });
};

q1a();
q1b();
q1c();
q2a();
q2b();
