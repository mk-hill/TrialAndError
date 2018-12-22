/* eslint-disable no-bitwise */
/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 * --- Day 21: Chronal Conversion ---
You should have been watching where you were going, because as you wander the new North Pole base, you trip and fall into a very deep hole!

Just kidding. You're falling through time again.

If you keep up your current pace, you should have resolved all of the temporal anomalies by the next time the device activates. Since you have very little interest in browsing history in 500-year increments for the rest of your life, you need to find a way to get back to your present time.

After a little research, you discover two important facts about the behavior of the device:

First, you discover that the device is hard-wired to always send you back in time in 500-year increments. Changing this is probably not feasible.

Second, you discover the activation system (your puzzle input) for the time travel module. Currently, it appears to run forever without halting.

If you can cause the activation system to halt at a specific moment, maybe you can make the device send you so far back in time that you cause an integer underflow in time itself and wrap around back to your current time!

The device executes the program as specified in manual section one and manual section two.

Your goal is to figure out how the program works and cause it to halt. You can only control register 0; every other register begins at 0 as usual.

Because time travel is a dangerous activity, the activation system begins with a few instructions which verify that bitwise AND (via bani) does a numeric operation and not an operation as if the inputs were interpreted as strings. If the test fails, it enters an infinite loop re-running the test instead of allowing the program to execute normally. If the test passes, the program continues, and assumes that all other bitwise operations (banr, bori, and borr) also interpret their inputs as numbers. (Clearly, the Elves who wrote this system were worried that someone might introduce a bug while trying to emulate this system with a scripting language.)

What is the lowest non-negative integer value for register 0 that causes the program to halt after executing the fewest instructions? (Executing the same instruction multiple times counts as multiple instructions executed.)
 */

const [ipDeclaration, ...instructionStrings] = input.day21.split('\n');

const cpu = {
  regs: [0, 0, 0, 0, 0, 0],
  ipReg: Number(ipDeclaration.slice(-1)),
  instructions: instructionStrings.map(str => str.split(' ').map((item, i) => (i === 0 ? item : Number(item)))),
  isHalted: false,

  fetchNextInstruction(execute = true) {
    if (this.isHalted) throw new Error('Attempting to run halted cpu');
    const instruction = this.instructions[this.regs[this.ipReg]];
    if (!instruction) this.isHalted = true;
    if (execute && !this.isHalted) return this.execute(instruction);
  },

  execute(instruction) {
    const [opCode, a, b, c] = instruction;
    this.regs[c] = this.ops[opCode](a, b);
    this.regs[this.ipReg] += 1;
    // The only instruction that uses reg 0 is instruction 28, returning reg 1 value when it is executed
    if (this.instructions.indexOf(instruction) === 28) {
      return this.regs[1];
    }
  },

  ops: {
    addr: (a, b) => cpu.regs[a] + cpu.regs[b],
    addi: (a, b) => cpu.regs[a] + b,
    mulr: (a, b) => cpu.regs[a] * cpu.regs[b],
    muli: (a, b) => cpu.regs[a] * b,
    banr: (a, b) => cpu.regs[a] & cpu.regs[b],
    bani: (a, b) => cpu.regs[a] & b,
    borr: (a, b) => cpu.regs[a] | cpu.regs[b],
    bori: (a, b) => cpu.regs[a] | b,
    setr: (a, b) => cpu.regs[a],
    seti: (a, b) => a,
    gtir: (a, b) => (a > cpu.regs[b] ? 1 : 0),
    gtri: (a, b) => (cpu.regs[a] > b ? 1 : 0),
    gtrr: (a, b) => (cpu.regs[a] > cpu.regs[b] ? 1 : 0),
    eqir: (a, b) => (a === cpu.regs[b] ? 1 : 0),
    eqri: (a, b) => (cpu.regs[a] === b ? 1 : 0),
    eqrr: (a, b) => (cpu.regs[a] === cpu.regs[b] ? 1 : 0),
  },
};

function getReg1Values() {
  const reg1values = [];
  while (!cpu.isHalted) {
    const nextReg1Value = cpu.fetchNextInstruction();
    if (reg1values.includes(nextReg1Value)) {
      return {
        found: true,
        firstReg1: reg1values[0],
        lastUniqueReg1: reg1values.pop(),
      };
    }
    if (nextReg1Value) reg1values.push(nextReg1Value);
  }
  return { found: false };
}

/*
function runUntilHalt(reg0 = 0) {
  cpu.regs = [reg0, 0, 0, 0, 0, 0];
  let executions = 0;
  while (!cpu.isHalted) {
    cpu.fetchNextInstruction();
    executions += 1;
  }
  return executions;
}

function testValues({ firstReg1, lastUniqueReg1, found }) {
  if (!found) throw new Error('Values not found');
  const testRunResults = [runUntilHalt(firstReg1), runUntilHalt(lastUniqueReg1)];
  if (testRunResults[0].executions >= testRunResults[1].executions) throw new Error('Values found were incorrect');
  return [firstReg1, lastUniqueReg1];
}

const testResults = testValues(getReg1Values());
*/

const results = getReg1Values();

console.group('Day 21');
console.log(
  `The quickest halt is produced by setting register 0 to \x1b[32m${results.firstReg1}\x1b[0m.`,
); // 11285115

/**
 * Your puzzle answer was 11285115.

--- Part Two ---
In order to determine the timing window for your underflow exploit, you also need an upper bound:

What is the lowest non-negative integer value for register 0 that causes the program to halt after executing the most instructions? (The program must actually halt; running forever does not count as halting.)
 */

console.log(
  `The process continues longest before halting when register 0 is set to \x1b[32m${
    results.lastUniqueReg1
  }\x1b[0m.`,
); // 2947113
console.groupEnd('Day 21');
