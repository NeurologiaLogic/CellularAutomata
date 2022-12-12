import {
  Check
} from "./util.js";
class Node {
  constructor(x, y, size) {
    this.isAlive = 0;
    this.x = x;
    this.y = y;
    this.size = size;
    this.neighbors = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x * 5, this.y * 5, this.size, this.size);
    if (this.isAlive) {
      ctx.fillStyle = "black";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.fill();
  }
  setAlive(STATUS) {
    this.isAlive = STATUS;
  }
};

class CelullarAutomata {
  constructor(length, size) {
    this.length = length;
    this.states = [];
    this.computeStates = [];
    this.size = size;
    this.generation = 0;
    this.max_gen = 1000;
    this.b = [];
    this.s = [];
  }
  setMaxGeneration(gen) {
    this.max_gen = gen;
  }
  draw(ctx) {
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.length; j++) {
        this.states[i][j].draw(ctx);
      }
    }
  }
  generateEmpty() {
    for (let i = 0; i < this.length; i++) {
      this.states[i] = [];
      this.computeStates[i] = [];
      for (let j = 0; j < this.length; j++) {
        this.states[i][j] = new Node(i, j, this.size);
        this.computeStates[i][j] = new Node(i, j, this.size);
      }
    }
  }
  generateRandomMid() {
    for (let i = 0; i < this.length; i++) {
      this.states[i] = [];
      this.computeStates[i] = [];
      for (let j = 0; j < this.length; j++) {
        this.states[i][j] = new Node(i, j, this.size);
        this.computeStates[i][j] = new Node(i, j, this.size);
      }
    }
    this.states[this.length / 2][this.length / 2].setAlive(true);
    // this.computeStates[this.length/2-1][this.length/2-1].setAlive(true);
  }
  setRuleset(args) {
    if (args[0][0] == "B") {
      this.b = args[0].replace("B", "");
      this.s = args[1].replace("S", "");
    } else {
      this.b = args[1].replace("B", "");
      this.s = args[0].replace("S", "");
    }
  }

  generateRandomNoise() {
    for (let i = 0; i < this.length; i++) {
      this.states[i] = [];
      this.computeStates[i] = [];
      for (let j = 0; j < this.length; j++) {
        let random = Math.random() * 100 > 50;
        this.states[i][j] = new Node(i, j, this.size);
        this.states[i][j].setAlive(random);
        this.computeStates[i][j] = new Node(i, j, this.size);
        this.computeStates[i][j].setAlive(random);
      }
    }
    // console.log(this.states)
  }

  updateComputeStates(i, j) {
    this.computeStates[i][j].neighbors = 0;
    this.states[i][j].neighbors = 0;
    //get all 8 dir neighbor and assign it to dir
    let dir = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [1, 0],
      [0, -1],
      [1, 1],
      [0, 1],
      [-1, 1]
    ];
    //update the neightbours
    for (let k = 0; k < dir.length; k++) {
      let x = i + dir[k][0];
      let y = j + dir[k][1];
      if (Check.isOutOfBounds(x, y, this.length)) {
        continue;
      }
      this.computeStates[i][j].neighbors += (this.states[x][y].isAlive) ? 1 : 0;
    }
  }
  generatePatternFromRules(computeState, state) {
    for (let born of this.b.split("")) {
      if (computeState.neighbors == parseInt(born)) {
        state.setAlive(true);
        return;
        // console.log("born")
      }
    }
    for (let survive of this.s.split("")) {
      // console.log(survive)
      if (computeState.neighbors == parseInt(survive)) {
        state.setAlive(state.isAlive);
        return;
        // console.log("survive")
      }
    }
    state.setAlive(false);
  }
  updateSetAlive() {
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.length; j++) {
        // if(this.computeStates[i][j].neighbors == 3)
        //   this.states[i][j].setAlive(true);
        // else if(this.computeStates[i][j].neighbors>1&&this.computeStates[i][j].neighbors <=4)
        //   this.states[i][j].setAlive(this.states[i][j].isAlive);

        // if (this.computeStates[i][j].neighbors == 3) {
        //   this.states[i][j].setAlive(true);
        // } else if (this.computeStates[i][j].neighbors >= 1 && this.computeStates[i][j].neighbors <= 3)
        //   this.states[i][j].setAlive(this.states[i][j].isAlive);
        // else
        //   this.states[i][j].setAlive(false);
          this.generatePatternFromRules(this.computeStates[i][j], this.states[i][j]);
      }
    }
  }
  clear()
  {
    this.states = [];
    this.computeStates = [];
  }
  startSimulation() {
    if (this.generation < this.max_gen) {
      for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < this.length; j++) {
          this.updateComputeStates(i, j);
        }
      }
      this.updateSetAlive();
      this.generation++;
    }
  }
}

export {
  CelullarAutomata
}
//B3/S12345 and B3/S1234
//Maze and Mazectric