/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-bitwise */
const input = require('./input');

/**
 * --- Day 19: Go With The Flow ---
With the Elves well on their way constructing the North Pole base, you turn your attention back to understanding the inner workings of programming the device.

You can't help but notice that the device's opcodes don't contain any flow control like jump instructions. The device's manual goes on to explain:

"In programs where flow control is required, the instruction pointer can be bound to a register so that it can be manipulated directly. This way, setr/seti can function as absolute jumps, addr/addi can function as relative jumps, and other opcodes can cause truly fascinating effects."

This mechanism is achieved through a declaration like #ip 1, which would modify register 1 so that accesses to it let the program indirectly access the instruction pointer itself. To compensate for this kind of binding, there are now six registers (numbered 0 through 5); the five not bound to the instruction pointer behave as normal. Otherwise, the same rules apply as the last time you worked with this device.

When the instruction pointer is bound to a register, its value is written to that register just before each instruction is executed, and the value of that register is written back to the instruction pointer immediately after each instruction finishes execution. Afterward, move to the next instruction by adding one to the instruction pointer, even if the value in the instruction pointer was just updated by an instruction. (Because of this, instructions must effectively set the instruction pointer to the instruction before the one they want executed next.)

The instruction pointer is 0 during the first instruction, 1 during the second, and so on. If the instruction pointer ever causes the device to attempt to load an instruction outside the instructions defined in the program, the program instead immediately halts. The instruction pointer starts at 0.

It turns out that this new information is already proving useful: the CPU in the device is not very powerful, and a background process is occupying most of its time. You dump the background process' declarations and instructions to a file (your puzzle input), making sure to use the names of the opcodes rather than the numbers.

For example, suppose you have the following program:

#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5
When executed, the following instructions are executed. Each line contains the value of the instruction pointer at the time the instruction started, the values of the six registers before executing the instructions (in square brackets), the instruction itself, and the values of the six registers after executing the instruction (also in square brackets).

ip=0 [0, 0, 0, 0, 0, 0] seti 5 0 1 [0, 5, 0, 0, 0, 0]
ip=1 [1, 5, 0, 0, 0, 0] seti 6 0 2 [1, 5, 6, 0, 0, 0]
ip=2 [2, 5, 6, 0, 0, 0] addi 0 1 0 [3, 5, 6, 0, 0, 0]
ip=4 [4, 5, 6, 0, 0, 0] setr 1 0 0 [5, 5, 6, 0, 0, 0]
ip=6 [6, 5, 6, 0, 0, 0] seti 9 0 5 [6, 5, 6, 0, 0, 9]
In detail, when running this program, the following events occur:

The first line (#ip 0) indicates that the instruction pointer should be bound to register 0 in this program. This is not an instruction, and so the value of the instruction pointer does not change during the processing of this line.
The instruction pointer contains 0, and so the first instruction is executed (seti 5 0 1). It updates register 0 to the current instruction pointer value (0), sets register 1 to 5, sets the instruction pointer to the value of register 0 (which has no effect, as the instruction did not modify register 0), and then adds one to the instruction pointer.
The instruction pointer contains 1, and so the second instruction, seti 6 0 2, is executed. This is very similar to the instruction before it: 6 is stored in register 2, and the instruction pointer is left with the value 2.
The instruction pointer is 2, which points at the instruction addi 0 1 0. This is like a relative jump: the value of the instruction pointer, 2, is loaded into register 0. Then, addi finds the result of adding the value in register 0 and the value 1, storing the result, 3, back in register 0. Register 0 is then copied back to the instruction pointer, which will cause it to end up 1 larger than it would have otherwise and skip the next instruction (addr 1 2 3) entirely. Finally, 1 is added to the instruction pointer.
The instruction pointer is 4, so the instruction setr 1 0 0 is run. This is like an absolute jump: it copies the value contained in register 1, 5, into register 0, which causes it to end up in the instruction pointer. The instruction pointer is then incremented, leaving it at 6.
The instruction pointer is 6, so the instruction seti 9 0 5 stores 9 into register 5. The instruction pointer is incremented, causing it to point outside the program, and so the program ends.
What value is left in register 0 when the background process halts?
 */

const [ipDeclaration, ...instructionStrings] = input.day19.split('\n');

const cpu = {
  regs: [0, 0, 0, 0, 0, 0],
  ipReg: Number(ipDeclaration.slice(-1)),
  instructions: instructionStrings.map(str => str.split(' ').map((item, i) => (i === 0 ? item : Number(item)))),
  isHalted: false,

  fetchNextInstruction(debug = false, execute = true) {
    if (this.isHalted) throw new Error('Attempting to run halted cpu');
    const instruction = this.instructions[this.regs[this.ipReg]];
    if (!instruction) this.isHalted = true;
    if (execute && !this.isHalted) this.execute(debug, instruction);
  },

  execute(debug, [opCode, a, b, c]) {
    this.regs[c] = this.ops[opCode](a, b);
    this.regs[this.ipReg] += 1;
    // testing p2
    if (debug) explain([opCode, a, b, c], this.regs);
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

function runInstructionsUntilHalt() {
  while (!cpu.isHalted) {
    cpu.fetchNextInstruction();
  }
  return {
    ipValue: cpu.regs[cpu.ipReg],
    reg0: cpu.regs[0],
  };
}

console.group('Day 19');

const p1 = runInstructionsUntilHalt();

console.log(`Instruction ${p1.ipValue} not found. Register 0: \x1b[32m${p1.reg0}\x1b[0m.`); // 1248

/**
 * Your puzzle answer was 1248.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
A new background process immediately spins up in its place. It appears identical, but on closer inspection, you notice that this time, register 0 started with the value 1.

What value is left in register 0 when this new background process halts?
 */

function explain(instruction, regs) {
  const [opCode, a, b, c] = instruction;
  let msg;
  switch (opCode) {
    case 'eqrr':
      msg = `****************************************************
 regs[${c}] = regs[${a}] === regs[${b}] ? 1 : 0`;
      break;
    case 'addr':
      msg = `regs[${c}] = regs[${a}] + regs[${b}].`;
      break;
    case 'addi':
      msg = `regs[${c}] = regs[${a}] + ${b}`;
      break;
    case 'gtrr':
      msg = `regs[${c}] = regs[${a}] > regs[${b}] ? 1 : 0`;
      break;
    case 'seti':
      msg = `regs[${c}] = ${a}`;
      break;
    case 'mulr':
      msg = `regs[${c}] = regs[${a}] * regs[${b}]`;
      break;
    default:
      msg = `${opCode} wasn't being repeated, no explanation written yet.`;
      break;
  }
  const instructionIndex = instructionStrings.indexOf(instruction.join(' '));
  console.group(`Instruction ${instructionIndex}`);
  console.log(' Ran', instruction, '\n', `\x1b[36m${msg}\x1b[0m`, '\n', 'Resulting regs', regs);
  console.groupEnd(`Instruction ${instructionIndex}`);
}

function debug() {
  cpu.regs = [1, 0, 0, 0, 0, 0];
  cpu.isHalted = false;
  let testCounter = 0;
  while (!cpu.isHalted && testCounter < 1000) {
    // Debug flag false until last few runs
    cpu.fetchNextInstruction(testCounter > 990);
    testCounter += 1;
  }
  /**
  console.log('******************************************************');
  cpu.regs[5] = cpu.regs[4];
  // cpu.regs[3] = cpu.regs[4] + 1;
  // cpu.regs[1] = cpu.regs[4] + 1;
  cpu.regs[2] = 4; // 10, 5
  while (!cpu.isHalted && testCounter < 1020) {
    cpu.fetchNextInstruction(true);
    testCounter += 1;
  }
   */
}

debug();

/**
 * reg 5 gets set to 1 if its equal to reg 4 (0 otherwise)
 * reg 2 (ip) gets incremented by 1 if reg 5 was equal to reg 4
 * ! if it was, reg 0 += reg 1, skip line below (ip already got incremented automatically)
 * reg 2 (ip) gets incremented by 1
 * reg 3 gets incremented by 1
 * reg 5 gets set to 1 if reg 3 > reg 4 (0 otherwise)
 * reg 2 (ip) gets incremented by 1 if reg 3 was greater than reg 4
 * ! if it was:
 * ---- reg 1 += 1
 * ---- reg 5 = reg 1 > reg 4 ? 1 : 0
 * ---- reg 2 (ip) gets incremented by 1 if reg 1 was greater than reg 4
 * !--- If it was:
 * --------- reg 1 += 1
 * --------- reg 5 = reg 1 > reg 4 ? 1 : 0
 * --------- reg 2 (ip) gets incremented by 1 again if reg 1 was greater than reg 4
 * --------- reg 2 (ip) *= reg 2 (most likely to halt execution)
 * ---- reg 2 (ip) gets set to 1 (resulting in instruction 2 being ran)
 * ---- reg 3 = 1, skip line below (ip already incremented)
 * reg 2 (ip) gets set to 2 (resulting in instruction 3 being ran when its automatically incremented)
 * reg 5 = reg 1 * reg 3 (essentially gets set to reg 3 while reg 1 is 1)
 * ! Reg 0 only gets incremented by the value  of reg 1, and only if reg 1 * reg 3 was equal to reg 4.
 * ! Adding up divisors of the value held in reg 4.
 */

const addUpDivisorsWithoutBeingRidiculouslyInefficient = (n = cpu.regs[4]) => Array(n)
  .fill()
  .map((undef, i) => i + 1)
  .reduce((total, m) => (n % m === 0 ? total + m : total), 0);

console.log(
  `Register 0 at heat death: \x1b[32m${addUpDivisorsWithoutBeingRidiculouslyInefficient()}\x1b[0m.`,
); // 14952912
console.groupEnd('Day 19');
