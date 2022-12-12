import {
  CelullarAutomata
} from "./CelullarAutomata.js";
/** @type {HTMLCanvasElement} */
(function () {

  let canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  let start = document.getElementById('start');
  let generation = document.getElementById('generations');
  let ruleset = document.getElementById('ruleset');
  let clear = document.getElementById('clear');

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "white";
    update();
  });


  let ca = new CelullarAutomata(100,5);
  ca.generateRandomNoise();

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ca.draw(ctx);
    ca.startSimulation();
    requestAnimationFrame(update);
  }

  function init() {
    update();
  }
  // init()
  //event handler
  start.addEventListener('click', () => {
    ca.generation = 0;
    ca.generateRandomNoise();
    if(generation.value=="")
    {
      console.log("null")
      ca.setMaxGeneration(1000);
      ca.setRuleset("B3/S12345".split("/"))
      init();
    }
    else
    {
      console.log("exist")
      console.log(generation.value)
      ca.setMaxGeneration(generation.value);
      if(ruleset.value=="")
      {
        ca.setRuleset("B3/S12345".split("/"))
      }
      else{
        ca.setRuleset(ruleset.value.split("/"))
      }
      init();
    }
  })


  clear.addEventListener('click', () => {
    ca.generateEmpty();
    ca.clear();
    ca.generation = 0;
  })
})()