/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 * --- Day 7: The Sum of Its Parts ---
You find yourself standing on a snow-covered coastline; apparently, you landed a little off course. The region is too hilly to see the North Pole from here, but you do spot some Elves that seem to be trying to unpack something that washed ashore. It's quite cold out, so you decide to risk creating a paradox by asking them for directions.

"Oh, are you the search party?" Somehow, you can understand whatever Elves from the year 1018 speak; you assume it's Ancient Nordic Elvish. Could the device on your wrist also be a translator? "Those clothes don't look very warm; take this." They hand you a heavy coat.

"We do need to find our way back to the North Pole, but we have higher priorities at the moment. You see, believe it or not, this box contains something that will solve all of Santa's transportation problems - at least, that's what it looks like from the pictures in the instructions." It doesn't seem like they can read whatever language it's in, but you can: "Sleigh kit. Some assembly required."

"'Sleigh'? What a wonderful name! You must help us assemble this 'sleigh' at once!" They start excitedly pulling more parts out of the box.

The instructions specify a series of steps and requirements about which steps must be finished before others can begin (your puzzle input). Each step is designated by a single letter. For example, suppose you have the following instructions:

Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
Visually, these requirements look like this:


  -->A--->B--
 /    \      \
C      -->D----->E
 \           /
  ---->F-----
Your first goal is to determine the order in which the steps should be completed. If more than one step is ready, choose the step which is first alphabetically. In this example, the steps would be completed as follows:

Only C is available, and so it is done first.
Next, both A and F are available. A is first alphabetically, so it is done next.
Then, even though F was available earlier, steps B and D are now also available, and B is the first alphabetically of the three.
After that, only D and F are available. E is not available because only some of its prerequisites are complete. Therefore, D is completed next.
F is the only choice, so it is done next.
Finally, E is completed.
So, in this example, the correct order is CABDFE.

In what order should the steps in your instructions be completed?
 */

const instructions = input.day7.split('\n');

function mapOutSteps(steps) {
  const map = steps.reduce((tally, step) => {
    tally[step[5]] = tally[step[5]] || { reqs: {}, reqBy: {}, numReqs: 0 };
    tally[step[36]] = tally[step[36]] || { reqs: {}, reqBy: {}, numReqs: 0 };
    tally[step[36]].reqs[step[5]] = true;
    tally[step[5]].reqBy[step[36]] = true;
    return tally;
  }, {});
  Object.keys(map).forEach((step) => {
    map[step].numReqs = Object.keys(map[step].reqs).length;
  });
  // Adding for step 2
  Object.keys(map)
    .sort()
    .forEach((step, i) => {
      map[step].time = 61 + i;
    });
  return map;
}

function getCorrectOrder(steps) {
  const map = mapOutSteps(steps);
  const todo = Object.keys(map);
  const done = [];

  while (todo.length > 1) {
    todo.sort((x, y) => map[y].numReqs - map[x].numReqs);
    if (map[todo[todo.length - 1]].numReqs < map[todo[todo.length - 2]].numReqs) {
      Object.keys(map[todo[todo.length - 1]].reqBy).forEach((step) => {
        map[step].numReqs -= 1;
        delete map[step].reqs[todo[todo.length - 1]];
      });
      delete map[todo[todo.length - 1]];
      done.push(todo.pop());
    } else {
      // Choose by alphabetical order
      const letter = [...todo].filter(x => map[x].numReqs === 0).sort()[0];
      Object.keys(map[letter].reqBy).forEach((step) => {
        map[step].numReqs -= 1;
        delete map[step].reqs[letter];
      });
      delete map[letter];
      done.push(todo.splice(todo.indexOf(letter), 1));
    }
  }
  done.push(todo.pop());

  return done.join('');
}

console.group('Day 7');
console.log(`The correct order is: ${getCorrectOrder(instructions)}`); // BCADPVTJFZNRWXHEKSQLUYGMIO

/**
 * Your puzzle answer was BCADPVTJFZNRWXHEKSQLUYGMIO.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
As you're about to begin construction, four of the Elves offer to help. "The sun will set soon; it'll go faster if we work together." Now, you need to account for multiple people working on steps simultaneously. If multiple steps are available, workers should still begin them in alphabetical order.

Each step takes 60 seconds plus an amount corresponding to its letter: A=1, B=2, C=3, and so on. So, step A takes 60+1=61 seconds, while step Z takes 60+26=86 seconds. No time is required between steps.

To simplify things for the example, however, suppose you only have help from one Elf (a total of two workers) and that each step takes 60 fewer seconds (so that step A takes 1 second and step Z takes 26 seconds). Then, using the same instructions as above, this is how each second would be spent:

Second   Worker 1   Worker 2   Done
   0        C          .
   1        C          .
   2        C          .
   3        A          F       C
   4        B          F       CA
   5        B          F       CA
   6        D          F       CAB
   7        D          F       CAB
   8        D          F       CAB
   9        D          .       CABF
  10        E          .       CABFD
  11        E          .       CABFD
  12        E          .       CABFD
  13        E          .       CABFD
  14        E          .       CABFD
  15        .          .       CABFDE
Each row represents one second of time. The Second column identifies how many seconds have passed as of the beginning of that second. Each worker column shows the step that worker is currently doing (or . if they are idle). The Done column shows completed steps.

Note that the order of the steps has changed; this is because steps now take time to finish and multiple workers can begin multiple steps simultaneously.

In this example, it would take 15 seconds for two workers to complete these steps.

With 5 workers and the 60+ second step durations described above, how long will it take to complete all of the steps?
 */

function getCompletionTime(steps) {
  const map = mapOutSteps(steps);
  const todo = Object.keys(map);
  let timeElapsed = -2;
  const inProgress = [];
  const done = [];

  class Elf {
    constructor() {
      this.task = null;
      this.timeLeft = 0;
      this.isAvailable = true;
    }

    start(task) {
      inProgress.push(todo.splice(todo.indexOf(task), 1)[0]);
      this.task = task;
      this.timeLeft = map[task].time;
      this.isAvailable = false;
    }

    passTime() {
      this.timeLeft -= 1;
      if (this.task && this.timeLeft < 1) {
        done.push(inProgress.splice(inProgress.indexOf(this.task), 1));
        Object.keys(map[this.task].reqBy).forEach((step) => {
          map[step].numReqs -= 1;
        });
        this.task = null;
        this.isAvailable = true;
      }
    }
  }

  // const workers = Array(5).fill(new Elf()); - ref?
  const workers = [new Elf(), new Elf(), new Elf(), new Elf(), new Elf()];

  while (todo.length > 0 || inProgress.length > 0) {
    timeElapsed += 1;
    workers.forEach((elf) => {
      elf.passTime();
      const nextStep = todo.filter(x => map[x].numReqs === 0).sort()[0];
      if (nextStep && elf.isAvailable) {
        elf.start(nextStep);
      }
    });
  }

  return timeElapsed;
}

console.log(`It took ${getCompletionTime(instructions)} seconds for 5 elves to finish the sleigh.`); // 973
console.groupEnd('Day 7');
