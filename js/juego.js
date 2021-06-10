class Juego {
	//llamar los metodos al instanciar la clase
	constructor() {
		this.inicializar = this.inicializar.bind(this);
		this.inicializar();
		this.generarSecuencia();
		setTimeout(this.siguienteNivel, 500);
	}

	inicializar() {
		//definir el contexto
		this.siguienteNivel = this.siguienteNivel.bind(this);
		this.elegirColor = this.elegirColor.bind(this);
		this.nivel = 1;
		// this.toggleEnabled();
		this.mostrarNivel();
		this.colores = {
			yellow,
			green,
			red,
			blue,
		};
	}

	generarSecuencia() {
		//map no funciona con elementos indefinidos dentro de un array
		this.secuencia = new Array(ULTIMO_NIVEL)
			.fill(0)
			.map(() => Math.floor(Math.random() * 4));
	}

	siguienteNivel() {
		this.subnivel = 0;
		this.iluminarSecuencia();
		this.agregarEventosClick();
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

	transformarColoraNumero(color) {
		switch (color) {
			case 'yellow':
				return 0;
			case 'green':
				return 1;
			case 'red':
				return 2;
			case 'blue':
				return 3;
		}
	}

	iluminarSecuencia() {
		for (let i = 0; i < this.nivel; i++) {
			const color = this.transformarNumeroaColor(this.secuencia[i]);
			setTimeout(() => {
				this.iluminarColor(color);
			}, 1000 * i);
		}
	}

	iluminarColor(color) {
		this.colores[color].classList.add('light');
		setTimeout(() => this.apagarColor(color), 350);
	}

	apagarColor(color) {
		this.colores[color].classList.remove('light');
	}

	agregarEventosClick() {
		//bind: atar o enlazar, atar el metodo al this
		this.colores.yellow.addEventListener('click', this.elegirColor);
		this.colores.green.addEventListener('click', this.elegirColor);
		this.colores.red.addEventListener('click', this.elegirColor);
		this.colores.blue.addEventListener('click', this.elegirColor);
	}

	eliminarEventosClick() {
		this.colores.yellow.removeEventListener('click', this.elegirColor);
		this.colores.green.removeEventListener('click', this.elegirColor);
		this.colores.red.removeEventListener('click', this.elegirColor);
		this.colores.blue.removeEventListener('click', this.elegirColor);
	}

	elegirColor(ev) {
		//un evento es una operacion asincrona que delega el navegador
		/*por eso el this cambia de contexto y se refiere al elemento html 
		que lo activo*/
		const nombreColor = ev.target.dataset.color;
		const numeroColor = this.transformarColoraNumero(nombreColor);
		this.iluminarColor(nombreColor);

		if (numeroColor === this.secuencia[this.subnivel]) {
			this.subnivel++;
			if (this.subnivel === this.nivel) {
				this.nivel++;
				this.eliminarEventosClick();
				if (this.nivel === ULTIMO_NIVEL + 1) {
					this.ganoElJuego();
				} else {
					setTimeout(this.mostrarNivel.bind(this), 500);
					setTimeout(this.siguienteNivel, 1000);
				}
			}
		} else {
			this.perdioElJuego();
		}
	}

	ganoElJuego() {
		swal('✨🎉Felicidades🎉✨', 'Has ganado', 'success').then(
			this.mostrarNivel(0)
		);
	}

	perdioElJuego() {
		swal('😧😧😧😧', 'Has perdido', 'error').then(() => {
			this.eliminarEventosClick;
			this.mostrarNivel(0);
		});
	}

	mostrarNivel(nivel) {
		nivel = nivel != undefined ? nivel : this.nivel;
		btnEmpezar.textContent = nivel;
	}

	toggleEnabled() {
		if ((btnEmpezar.disabled = false)) {
			btnEmpezar.disabled = true;
		} else {
			btnEmpezar.disabled = false;
			btnEmpezar.textContent = 0;
		}
	}
}
