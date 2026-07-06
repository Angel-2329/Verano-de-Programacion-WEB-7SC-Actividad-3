export class componente_tipError 
{
    constructor(id_input, opciones = {}) 
    {
        this.input = document.querySelector(id_input);

        this.opciones = 
        {
            mensaje: opciones.mensaje || 'Este campo es obligatorio',
            posicion: opciones.posicion || 'bottom',
            regla: opciones.regla || null,
            minimo: opciones.minimo || null,
            maximo: opciones.maximo || null,
            distancia: opciones.distancia || 5,
            tema: opciones.tema || 'tema-degradado-azul',
            alMostrar: opciones.alMostrar || (() => {}),
            alOcultar: opciones.alOcultar || (() => {}),
            ...opciones
        };

        this.componente = null;

        if (this.input) 
        {
            this.init();
        } 
        else 
        {
            console.warn(`No se encontro el input: ${id_input}`);
        }
    } 

    init() 
    {
        if (window.getComputedStyle(this.input.parentElement).position === 'static') 
        {
            this.input.parentElement.style.position = 'relative';
        }

        this.input.addEventListener('blur', () => this.validar());
        this.input.addEventListener('input', () => this.limpiarError());

        window.addEventListener('resize', () => this.calcularPosicion());
    }

    validar() 
    {
        const valor = this.input.value.trim();
        let hayError = false;

        if (!valor) 
        {
            hayError = true;
        } 
        else if (this.opciones.minimo && valor.length < this.opciones.minimo) 
        {
            hayError = true;
        } 
        else if (this.opciones.maximo && valor.length > this.opciones.maximo) 
        {
            hayError = true;
        } 
        else if (this.opciones.regla && !this.opciones.regla.test(valor)) 
        {
            hayError = true;
        }

        if (hayError) 
        {
            this.mostrarError();
        }
    }

    mostrarError() 
    {
        if (this.componente) 
        {
            return;
        }

        this.componente = document.createElement('div');
        this.componente.classList.add('componente-js', this.opciones.tema);
        this.componente.innerText = this.opciones.mensaje;
        this.componente.style.position = 'absolute';

        this.input.insertAdjacentElement('afterend', this.componente);
        this.input.classList.add('input-error-active');

        this.calcularPosicion();
        this.opciones.alMostrar();
    }

    calcularPosicion() 
    {
        if (!this.componente) 
        {
            return;
        }

        const inputTop = this.input.offsetTop;
        const inputLeft = this.input.offsetLeft;
        const inputHeight = this.input.offsetHeight;
        const inputWidth = this.input.offsetWidth;
        const distancia = this.opciones.distancia;

        if (this.opciones.posicion === 'bottom') 
        {
            this.componente.style.top = `${inputTop + inputHeight + distancia}px`;
            this.componente.style.left = `${inputLeft}px`;
        } 
        else if (this.opciones.posicion === 'top') 
        {
            this.componente.style.bottom = `${inputTop - this.componente.offsetHeight - distancia}px`;
            this.componente.style.left = `${inputLeft}px`;
        } 
        else if (this.opciones.posicion === 'right') 
        {
            this.componente.style.top = `${inputTop + (inputHeight / 2) - (this.componente.offsetHeight / 2)}px`;
            this.componente.style.left = `${inputLeft + inputWidth + distancia}px`;
        }
        else if (this.opciones.posicion === 'left') 
        {
            this.componente.style.top = `${inputTop + (inputHeight / 2) - (this.componente.offsetHeight / 2)}px`;
            this.componente.style.left = `${inputLeft - this.componente.offsetWidth - distancia}px`;
        }
    }

    limpiarError() 
    {
        if (this.componente) 
        {
            this.componente.remove();
            this.componente = null;
            this.opciones.alOcultar();
        }

        this.input.classList.remove('input-error-active');
    }
}

export class componente_Contraseña 
{
    constructor(id_input, opciones = {}) 
    {
        this.input = document.querySelector(id_input);

        this.opciones = 
        {
            minimo: opciones.minimo || 8,
            mostrarTexto: opciones.mostrarTexto !== false,
            textos: opciones.textos || ['Muy débil', 'Débil', 'Regular', 'Segura', 'Muy segura'],
            ...opciones
        };

        this.contenedor = null;
        this.barra = null;
        this.etiqueta = null;

        if (this.input) 
            {
            this.init();
        } 
        else 
            {
            console.warn(`No se encontro el input: ${id_input}`);
        }
    }

    init() 
    {
        this.crearEstructura();

        this.input.addEventListener('input', () => this.evaluarSeguridad());
    }

    crearEstructura() 
    {
        this.contenedor = document.createElement('div');
        this.contenedor.classList.add('componente-contraseña-contenedor');

        this.barra = document.createElement('div');
        this.barra.classList.add('componente-contraseña-barra');
        this.contenedor.appendChild(this.barra);

        if (this.opciones.mostrarTexto) 
            {
            this.etiqueta = document.createElement('span');
            this.etiqueta.classList.add('componente-contraseña-texto');
            this.contenedor.appendChild(this.etiqueta);
        }

        this.input.insertAdjacentElement('afterend', this.contenedor);
    }

    evaluarSeguridad() 
    {
        const valor = this.input.value;
        let puntos = 0;

        if (valor.length === 0) 
            {
            this.actualizarVisual(0, '');
            return;
        }

        if (valor.length >= this.opciones.minimo) puntos++;
        if (/[A-Z]/.test(valor) && /[a-z]/.test(valor)) puntos++; 
        if (/[0-9]/.test(valor)) puntos++; 
        if (/[^A-Za-z0-9]/.test(valor)) puntos++; 

        this.actualizarVisual(puntos, valor);
    }

    actualizarVisual(puntos, valor) 
    {
        if (valor.length === 0) {
            this.contenedor.style.opacity = '0';
            this.barra.style.width = '0%';
            return;
        }

        this.contenedor.style.opacity = '1';
        
        let porcentaje = (puntos / 4) * 100;
        if (porcentaje === 0 && valor.length > 0) porcentaje = 15;

        this.barra.style.width = `${porcentaje}%`;

        this.barra.classList.remove('nivel-bajo', 'nivel-medio', 'nivel-alto');

        let textoActual = '';

        if (puntos <= 1) 
        {
            this.barra.classList.add('nivel-bajo');
            textoActual = this.opciones.textos[1]; 
        } 
        else if (puntos === 2) 
        {
            this.barra.classList.add('nivel-medio');
            textoActual = this.opciones.textos[2]; 
        } 
        else if (puntos >= 3) 
        {
            this.barra.classList.add('nivel-alto');
            textoActual = this.opciones.textos[3]; 
        }

        if (this.etiqueta) 
        {
            this.etiqueta.innerText = textoActual;
        }
    }
}