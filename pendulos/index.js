let pendulos = [];
let osciladores = [];
let allOscs = [];
let play = false;
let tono = 2000;
let mic;
let miMouseX;

function setup() {
  mic = new p5.AudioIn();
  randomSeed(mouseX);
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playOscillator);
}

function playOscillator() {
  mic.start();
  play = true;
  inicializaPendulos();
}

function inicializaPendulos() {
  if(play) {
    for(let i = 0; i < 30; i++) { 
      const distanciaBolas = 80 + i * 20;
      const nombreOsc = `osc${i}`;
      const puntoInicial = createVector(width/2, 0);
      const tonosColores = {
        r: random(i + 180),
        g: random(i + 80),
        b: random(i + 80),
      };
      tono = tono - tono / 4;
      if(tono < 80) tono = 800;
      pendulos[i] = new Pendulo(puntoInicial, distanciaBolas, tonosColores, tono, nombreOsc);
      pendulos[i].createOsc(); 
    }
    play = false;
  }
}

function draw() {
  background(0, 20);
  pendulos.forEach(pendulo => pendulo.movimiento());
  miMouseX = map(mouseY, height, 0, 0, 0.002);
  miMouseX2 = map(mouseX, 0, width, -0.01, 0.01);
  let modFreq = map(mouseX, width, 0, 0, 112);
  let modDepth = map(mouseY, 0, height, -150, 150);
  allOscs.forEach(item => {
    item.modulator.freq(modFreq);
    item.modulator.amp(modDepth);
  })
}

