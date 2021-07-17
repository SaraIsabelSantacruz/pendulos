class Pendulo {
	constructor(origen, dist, colores, tono, nombre) {
		this.posOrigen = origen.copy();
		this.posicion = createVector();
		this.tamCuerda = dist;
		this.angulo = PI / 2;
		this.velocidad = 0;
		this.aceleracion = 0;
		this.friccion = 0.999;
		this.bola = 4;
		this.colores = colores;
		this.tone = tono;
		this.nombre = nombre;
		this.gravedad = 0.9;
	}

	movimiento() {
		this.actualizacion();
		this.visualizacion();
		this.setAmplitud();
	};

	actualizacion() {
		let gravedad = 0.15;
		this.aceleracion = (-1 * gravedad / this.tamCuerda) * sin(this.angulo);
		this.velocidad += this.aceleracion;
		this.velocidad *= this.friccion + miMouseX2;
		this.angulo += this.velocidad;
	}

	visualizacion() {
		this.posicion.set(this.tamCuerda * sin(this.angulo), this.tamCuerda * cos(this.angulo), 0);
		this.posicion.add(this.posOrigen);
		ellipseMode(CENTER);
		stroke(this.colores.r, this.colores.g, this.colores.b);
		fill(this.colores.r, this.colores.g, this.colores.b);
		ellipse(this.posicion.x, this.posicion.y, this.bola, this.bola);
	}
	
	setAmplitud() {
		allOscs.forEach(obj => {
			if(obj.nombre === this.nombre) {
				const amp = map(this.angulo, -1.5, 1.5, 0, 0.5) * miMouseX;
				const pan = map(this.angulo, -1.5, 1.5, 1, -1);
				if(pan <= 1 && pan >= -1) {
					obj.osc.pan(pan, 1);
				}
				if(amp <= 0.5 && amp >= 0) {
					obj.env.set(5, 0.001, 0.1, 0.1, 0, 0.001);
					obj.osc.amp(amp, 1);
				}
			}
		})
	}

	createOsc() {
		let osc = new p5.Oscillator();
		let modulator = new p5.Oscillator();
		let env = new p5.Envelope(5, 0.001, 0, 0);

		osc.freq(this.tone);
		osc.start();
		osc.pan(1, 1);
		osc.amp(0, 1);

		modulator.start();
		modulator.disconnect();
  	osc.freq(modulator);

		env.play(osc);
		let objOsc = { nombre: this.nombre, osc, modulator, env }
		allOscs.push(objOsc);
	}
}