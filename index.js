let pendulos = [];
let isToggled = false;
let isPlaying = true;
let cont = 0;
let pendulo, oscilador;

let empezar = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  pendulos.forEach(item => {
    if(empezar) {
      item.pendulo.movimiento();
      item.oscilador.playOscilator();
    } else {
      item.oscilador.stopOscillator();
    }
  });
  background(0, 30);
}

function mousePressed(event) {
  
  cont = cont + 1;
  if(empezar) {
    const nombre = `osc${cont}`;
    const mapX = map(event.x, 0, width, 36, 84);
    const freq = midiToFreq(mapX);
    const radio = map(event.x, 0, width, random(100, 400), random(20, 2));
    const friccion = map(event.x, 0, width, 0.999, 0.99);
    const t = map(event.x, 0, width, 0.9, 0.1);
    const color = {r:  255, g: random(143, 249), b: random(0, 196)}
    const gravedad = random(0.001, 0.99);
    pendulo = new Pendulo(createVector(event.x, event.y), radio, color, friccion, gravedad);
    oscilador = new Oscilador(radio, freq, nombre, friccion, t, gravedad);
    const osc = oscilador.setOscilator();
    pendulos.push({ pendulo, oscilador, osc });
  }

  if(cont >= 20) {
    empezar = false;
    const contenedor = document.getElementById('contenedor');
    const elemento = document.getElementById('texto');
    const elemento1 = document.getElementById('texto2');
    const elemento2 = document.getElementById('texto3');
    contenedor.disabled = true;
    elemento.classList.remove('desaparecer');
    elemento.classList.add('texto');
    elemento1.classList.add('texto');
    elemento2.classList.add('texto');
    elemento.classList.remove('esconder');
    elemento1.classList.remove('esconder');
    elemento2.classList.remove('esconder');
  }
}

function handleClick() {
  setTimeout(() => empezar = true, 1000);
  const elemento = document.getElementById('texto');
  elemento.classList.add('desaparecer');
  elemento.classList.remove('texto');
  setTimeout(() => {
    elemento.classList.add('esconder');
  }, 2000);
}
