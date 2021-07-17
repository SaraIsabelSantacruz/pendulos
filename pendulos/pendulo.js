class Pendulo {
	constructor(origen, dist, color, friccion, gravedad) {
		this.posOrigen = origen.copy();
		this.posicion = createVector();
		this.tamCuerda = dist;
		this.angulo = PI / 2;
		this.velocidad = 0;
		this.aceleracion = 0;
		this.friccion = friccion;
		this.bola = 2;
		this.color = color;
		this.gravedad = gravedad;
	}

	movimiento() {
		this.actualizacion();
		this.visualizacion();
	}

	actualizacion() {
		let gravedad = this.gravedad;
		this.aceleracion = (-1 * gravedad / this.tamCuerda) * sin(this.angulo);
		this.velocidad += this.aceleracion;
		this.velocidad *= this.friccion;
		this.angulo += this.velocidad;
	}

	visualizacion() {
		this.posicion.set(this.tamCuerda * sin(this.angulo), this.tamCuerda * cos(this.angulo), 0);
		this.posicion.add(this.posOrigen);
		ellipseMode(CENTER);
		stroke(this.color.r, this.color.g, this.color.b);
		fill(this.color.r, this.color.g, this.color.b);
		ellipse(this.posicion.x, this.posicion.y, this.bola, this.bola);
	}
}