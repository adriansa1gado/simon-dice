class Juego {
	//llamar los metodos al instanciar la clase
	constructor() {
		this.inicializar();
		this.generarSecuencia();
		this.siguienteNivel();
	}

	inicializar() {
		this.nivel = 10;
		btnEmpezar.textContent = this.nivel;
		this.enabled(btnEmpezar);
		this.colores = {
			yellow,
			green,
			red,
			blue,
		};
	}

	generarSecuencia() {
		//map no funciona con elementos indefinidos dentro de un array
		this.secuencia = new Array(10)
			.fill(0)
			.map(() => Math.floor(Math.random() * 4));
		console.log(this.secuencia);
	}

	siguienteNivel() {
		this.iluminarSecuencia();
	}

	transformarNumeroaColor(num) {
		switch (num) {
			case 0:
				return 'yellow';
			case 1:
				return 'green';
			case 2:
				return 'red';
			case 3:
				return 'blue';
		}
	}

	iluminarSecuencia() {
		for (let i = 0; i < this.nivel; i++) {
			let color = this.transformarNumeroaColor(this.secuencia[i]);
			setTimeout(() => this.iluminarColor(color), 1000 * i);
		}
	}

	iluminarColor(color) {
		this.colores[color].classList.add('light');
		setTimeout(() => this.apagarColor(color), 350);
	}

	apagarColor(color) {
		this.colores[color].classList.remove('light');
	}

	enabled(boton) {
		boton.disabled = true;
	}
}
