class Oscilador {
	constructor(dist, freq, nombre, friccion, paramsDelay, gravedad) {
		this.tamCuerda = dist;
		this.angulo = PI / 2;
		this.velocidad = 0;
		this.aceleracion = 0;
		this.friccion = friccion;
		this.frecuencia = freq;
		this.nombre = nombre;
		this.paramsDelay = paramsDelay;
		this.gravedad = gravedad;
	}

	setOscilator() {
		let osc = new p5.Oscillator();
		let delay = new p5.Delay();
		osc.freq(this.frecuencia);
		osc.amp(0, 1);
		osc.start();
		delay.process(osc, this.paramsDelay.t, 0.4, this.frecuencia);
		return osc;
	}

	playOscilator() {
		pendulos.forEach(item => {
			if(item.oscilador.nombre === this.nombre) {
				let gravedad = this.gravedad;
				let sinAng = sin(this.angulo);
				this.aceleracion = (-1 * gravedad / this.tamCuerda) * sinAng;
				this.velocidad += this.aceleracion;
				this.velocidad *= this.friccion;
				this.angulo += this.velocidad;
				let amp = map(sinAng, -0.98, 0.98, -0.2, 0.2, true);
				let pan = map(sinAng, -0.98, 0.98, 1, -1, true);
				item.osc.amp(amp, 1);
				item.osc.pan(pan, 1);
			}
		});
	}

	stopOscillator() {
		pendulos.forEach(item => {
			if(item.oscilador.nombre === this.nombre) {
				item.osc.amp(0, 3);
				item.osc.pan(0, 1);
			}
		});
	}
}