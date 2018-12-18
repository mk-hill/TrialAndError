/* eslint-disable no-bitwise */
/* eslint-disable no-console */
/* eslint-disable max-len */
const input = require('./input');

/**
 * --- Day 16: Chronal Classification ---
As you see the Elves defend their hot chocolate successfully, you go back to falling through time. This is going to become a problem.

If you're ever going to return to your own time, you need to understand how this device on your wrist works. You have a little while before you reach your next destination, and with a bit of trial and error, you manage to pull up a programming manual on the device's tiny screen.

According to the manual, the device has four registers (numbered 0 through 3) that can be manipulated by instructions containing one of 16 opcodes. The registers start with the value 0.

Every instruction consists of four values: an opcode, two inputs (named A and B), and an output (named C), in that order. The opcode specifies the behavior of the instruction and how the inputs are interpreted. The output, C, is always treated as a register.

In the opcode descriptions below, if something says "value A", it means to take the number given as A literally. (This is also called an "immediate" value.) If something says "register A", it means to use the number given as A to read from (or write to) the register with that number. So, if the opcode addi adds register A and value B, storing the result in register C, and the instruction addi 0 7 3 is encountered, it would add 7 to the value contained by register 0 and store the sum in register 3, never modifying registers 0, 1, or 2 in the process.

Many opcodes are similar except for how they interpret their arguments. The opcodes fall into seven general categories:

Addition:

addr (add register) stores into register C the result of adding register A and register B.
addi (add immediate) stores into register C the result of adding register A and value B.
Multiplication:

mulr (multiply register) stores into register C the result of multiplying register A and register B.
muli (multiply immediate) stores into register C the result of multiplying register A and value B.
Bitwise AND:

banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B.
bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B.
Bitwise OR:

borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B.
bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B.
Assignment:

setr (set register) copies the contents of register A into register C. (Input B is ignored.)
seti (set immediate) stores value A into register C. (Input B is ignored.)
Greater-than testing:

gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
Equality testing:

eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
Unfortunately, while the manual gives the name of each opcode, it doesn't seem to indicate the number. However, you can monitor the CPU to see the contents of the registers before and after instructions are executed to try to work them out. Each opcode has a number from 0 through 15, but the manual doesn't say which is which. For example, suppose you capture the following sample:

Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]
This sample shows the effect of the instruction 9 2 1 2 on the registers. Before the instruction is executed, register 0 has value 3, register 1 has value 2, and registers 2 and 3 have value 1. After the instruction is executed, register 2's value becomes 2.

The instruction itself, 9 2 1 2, means that opcode 9 was executed with A=2, B=1, and C=2. Opcode 9 could be any of the 16 opcodes listed above, but only three of them behave in a way that would cause the result shown in the sample:

Opcode 9 could be mulr: register 2 (which has a value of 1) times register 1 (which has a value of 2) produces 2, which matches the value stored in the output register, register 2.
Opcode 9 could be addi: register 2 (which has a value of 1) plus value 1 produces 2, which matches the value stored in the output register, register 2.
Opcode 9 could be seti: value 2 matches the value stored in the output register, register 2; the number given for B is irrelevant.
None of the other opcodes produce the result captured in the sample. Because of this, the sample above behaves like three opcodes.

You collect many of these samples (the first section of your puzzle input). The manual also includes a small test program (the second section of your puzzle input) - you can ignore it for now.

Ignoring the opcode numbers, how many samples in your puzzle input behave like three or more opcodes?
 */

const [input1, input2] = input.day16.split('\n\n\n');

const formattedP1Input = input1
  .split('\n\n')
  .map(str => str.split('\n'))
  .map((linesArr, i) => ({
    before: linesArr[0]
      .slice(9, -1)
      .split(', ')
      .map(str => Number(str)),
    after: linesArr[2]
      .slice(9, -1)
      .split(', ')
      .map(str => Number(str)),
    op: linesArr[1].split(' ').map(str => Number(str)),
    caseNum: i,
  }));

// Return ops that match
function getMatchingOpCodes({
  before, after, op, caseNum,
}) {
  const [opNum, a, b, c] = op;

  const opResults = {
    addr: before[a] + before[b],
    addi: before[a] + b,
    mulr: before[a] * before[b],
    muli: before[a] * b,
    banr: before[a] & before[b],
    bani: before[a] & b,
    borr: before[a] | before[b],
    bori: before[a] | b,
    setr: before[a],
    seti: a,
    gtir: a > before[b] ? 1 : 0,
    gtri: before[a] > b ? 1 : 0,
    gtrr: before[a] > before[b] ? 1 : 0,
    eqir: a === before[b] ? 1 : 0,
    eqri: before[a] === b ? 1 : 0,
    eqrr: before[a] === before[b] ? 1 : 0,
  };

  return {
    opNum,
    caseNum,
    matches: Object.keys(opResults).filter(opCode => after[c] === opResults[opCode]),
  };
}

function runTestCases(testCases = formattedP1Input) {
  // Map case numbers to matches under samples, op numbers to matching codes under opNums
  const map = { samples: {}, opNums: {} };
  testCases.forEach((testCase) => {
    const testResults = getMatchingOpCodes(testCase);
    map.samples[testResults.caseNum] = testResults.matches;
    // Assign matches array if empty, filter to leave only common matches if array exists
    map.opNums[testResults.opNum] = map.opNums[testResults.opNum]
      ? map.opNums[testResults.opNum].filter(existingMatch => testResults.matches.includes(existingMatch))
      : testResults.matches;
  });
  return [Object.entries(map.samples).filter(pair => pair[1].length > 2).length, map.opNums];
}

const [p1Answer, matchingOpCodes] = runTestCases();
console.group('Day 16');
console.log(`\x1b[32m${p1Answer}\x1b[0m samples behave like three or more opcodes.`); // 596

/**
 * Your puzzle answer was 596.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
Using the samples you collected, work out the number of each opcode and execute the test program (the second section of your puzzle input).

What value is contained in register 0 after executing the test program?
 */

// Remove codes that have been narrowed down to 1 from other match lists until all codes are known
function narrowMatches(map = matchingOpCodes) {
  while (Object.values(map).some(matchList => matchList.length > 1)) {
    const knownCodes = Object.values(map)
      .filter(matchList => matchList.length === 1)
      .map(ar => ar[0]);
    knownCodes.forEach((code) => {
      Object.values(map).forEach((ar) => {
        if (ar.includes(code) && ar.length > 1) ar.splice(ar.indexOf(code), 1);
      });
    });
  }
  // Pull out remaining single strings from arrays with length of 1
  Object.keys(map).forEach((code) => {
    [map[code]] = map[code];
  });
  return map;
}

const formattedP2Input = input2.split('\n').map(line => line.split(' ').map(char => Number(char)));

function getFinalRegister0Value(codes = narrowMatches(), instructions = formattedP2Input) {
  const regs = [0, 0, 0, 0];
  // Each function returns value to be assigned to regs[c]
  const ops = {
    addr: (a, b) => regs[a] + regs[b],
    addi: (a, b) => regs[a] + b,
    mulr: (a, b) => regs[a] * regs[b],
    muli: (a, b) => regs[a] * b,
    banr: (a, b) => regs[a] & regs[b],
    bani: (a, b) => regs[a] & b,
    borr: (a, b) => regs[a] | regs[b],
    bori: (a, b) => regs[a] | b,
    setr: (a, b) => regs[a],
    seti: (a, b) => a,
    gtir: (a, b) => (a > regs[b] ? 1 : 0),
    gtri: (a, b) => (regs[a] > b ? 1 : 0),
    gtrr: (a, b) => (regs[a] > regs[b] ? 1 : 0),
    eqir: (a, b) => (a === regs[b] ? 1 : 0),
    eqri: (a, b) => (regs[a] === b ? 1 : 0),
    eqrr: (a, b) => (regs[a] === regs[b] ? 1 : 0),
  };
  instructions.forEach((instruction) => {
    const [opNum, a, b, c] = instruction;
    regs[c] = ops[codes[opNum]](a, b);
  });
  return regs[0];
}

console.log(
  `Register 0 contains the value \x1b[32m${getFinalRegister0Value()}\x1b[0m after completing the program.`,
); // 554
console.groupEnd('Day 16');
